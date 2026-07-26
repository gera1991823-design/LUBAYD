"use strict";

// Almacenamiento local para APP LUBAYD.
// Guarda perfiles habilitados para PIN, registros, fotos (Blob) y la cola de sincronización.
(() => {
  const DB_NAME = "lubayd-operativa-offline";
  const DB_VERSION = 1;
  const STORES = {
    profiles: "profiles",
    settings: "settings",
    breaks: "breaks",
    parts: "parts",
    queue: "queue"
  };

  let dbPromise = null;

  function requestToPromise(request) {
    return new Promise((resolve, reject) => {
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error || new Error("Error de IndexedDB"));
    });
  }

  function transactionDone(transaction) {
    return new Promise((resolve, reject) => {
      transaction.oncomplete = () => resolve();
      transaction.onerror = () => reject(transaction.error || new Error("Error de transacción local"));
      transaction.onabort = () => reject(transaction.error || new Error("Transacción local cancelada"));
    });
  }

  function open() {
    if (dbPromise) return dbPromise;
    dbPromise = new Promise((resolve, reject) => {
      if (!("indexedDB" in window)) {
        reject(new Error("Este navegador no admite almacenamiento offline."));
        return;
      }

      const request = indexedDB.open(DB_NAME, DB_VERSION);
      request.onupgradeneeded = () => {
        const db = request.result;

        if (!db.objectStoreNames.contains(STORES.profiles)) {
          const store = db.createObjectStore(STORES.profiles, { keyPath: "uid" });
          store.createIndex("email", "email", { unique: false });
          store.createIndex("lastLoginAt", "lastLoginAt", { unique: false });
        }

        if (!db.objectStoreNames.contains(STORES.settings)) {
          db.createObjectStore(STORES.settings, { keyPath: "key" });
        }

        if (!db.objectStoreNames.contains(STORES.breaks)) {
          const store = db.createObjectStore(STORES.breaks, { keyPath: "id" });
          store.createIndex("uid", "uid", { unique: false });
          store.createIndex("uidStatus", ["uid", "status"], { unique: false });
          store.createIndex("startAtClient", "startAtClient", { unique: false });
        }

        if (!db.objectStoreNames.contains(STORES.parts)) {
          const store = db.createObjectStore(STORES.parts, { keyPath: "id" });
          store.createIndex("uid", "uid", { unique: false });
          store.createIndex("uidDate", ["uid", "dateKey"], { unique: true });
        }

        if (!db.objectStoreNames.contains(STORES.queue)) {
          const store = db.createObjectStore(STORES.queue, { keyPath: "id" });
          store.createIndex("uid", "uid", { unique: false });
          store.createIndex("uidStatus", ["uid", "status"], { unique: false });
          store.createIndex("createdAt", "createdAt", { unique: false });
        }
      };
      request.onsuccess = () => {
        const db = request.result;
        db.onversionchange = () => db.close();
        resolve(db);
      };
      request.onerror = () => reject(request.error || new Error("No se pudo abrir la base local."));
      request.onblocked = () => reject(new Error("La base local está bloqueada por otra pestaña."));
    });
    return dbPromise;
  }

  async function withStore(storeName, mode, action) {
    const db = await open();
    const transaction = db.transaction(storeName, mode);
    const store = transaction.objectStore(storeName);
    const result = await action(store, transaction);
    if (mode === "readwrite") await transactionDone(transaction);
    return result;
  }

  async function put(storeName, value) {
    return withStore(storeName, "readwrite", async (store) => {
      await requestToPromise(store.put(value));
      return value;
    });
  }

  async function get(storeName, key) {
    return withStore(storeName, "readonly", (store) => requestToPromise(store.get(key)));
  }

  async function remove(storeName, key) {
    return withStore(storeName, "readwrite", async (store) => {
      await requestToPromise(store.delete(key));
    });
  }

  async function getAll(storeName) {
    return withStore(storeName, "readonly", (store) => requestToPromise(store.getAll()));
  }

  async function getAllByIndex(storeName, indexName, key) {
    return withStore(storeName, "readonly", (store) => requestToPromise(store.index(indexName).getAll(key)));
  }

  async function setSetting(key, value) {
    return put(STORES.settings, { key, value, updatedAt: Date.now() });
  }

  async function getSetting(key) {
    const item = await get(STORES.settings, key);
    return item?.value;
  }

  function normalizeEmail(email) {
    return String(email || "").trim().toLowerCase();
  }

  async function saveProfile(profile) {
    if (!profile?.uid) throw new Error("El perfil local no tiene UID.");
    const previous = await get(STORES.profiles, profile.uid);
    const merged = {
      ...(previous || {}),
      ...profile,
      email: normalizeEmail(profile.email || previous?.email),
      updatedAtLocal: Date.now()
    };
    await put(STORES.profiles, merged);
    await setSetting("lastProfileUid", profile.uid);
    return merged;
  }

  async function getProfile(uid) {
    if (!uid) return null;
    return (await get(STORES.profiles, uid)) || null;
  }

  async function getProfileByEmail(email) {
    const normalized = normalizeEmail(email);
    if (!normalized) return null;
    return withStore(STORES.profiles, "readonly", (store) => requestToPromise(store.index("email").get(normalized)));
  }

  async function getLastProfile() {
    const uid = await getSetting("lastProfileUid");
    if (uid) {
      const profile = await getProfile(uid);
      if (profile) return profile;
    }
    const profiles = await getAll(STORES.profiles);
    profiles.sort((a, b) => Number(b.lastLoginAt || 0) - Number(a.lastLoginAt || 0));
    return profiles[0] || null;
  }

  async function setLocked(uid, locked) {
    const profile = await getProfile(uid);
    if (!profile) return null;
    return saveProfile({ ...profile, locked: Boolean(locked) });
  }

  function bytesToBase64(bytes) {
    let binary = "";
    bytes.forEach((byte) => { binary += String.fromCharCode(byte); });
    return btoa(binary);
  }

  function base64ToBytes(value) {
    const binary = atob(value);
    return Uint8Array.from(binary, (char) => char.charCodeAt(0));
  }

  async function derivePin(pin, saltBase64, iterations = 160000) {
    if (!window.crypto?.subtle) throw new Error("Este navegador no admite el cifrado necesario para el PIN offline.");
    const encoder = new TextEncoder();
    const keyMaterial = await crypto.subtle.importKey(
      "raw",
      encoder.encode(String(pin)),
      { name: "PBKDF2" },
      false,
      ["deriveBits"]
    );
    const bits = await crypto.subtle.deriveBits({
      name: "PBKDF2",
      salt: base64ToBytes(saltBase64),
      iterations,
      hash: "SHA-256"
    }, keyMaterial, 256);
    return bytesToBase64(new Uint8Array(bits));
  }

  async function configurePin(uid, pin) {
    if (!/^\d{6}$/.test(String(pin))) throw new Error("El PIN debe tener exactamente 6 números.");
    const profile = await getProfile(uid);
    if (!profile) throw new Error("Primero debes iniciar sesión con Internet.");
    const salt = crypto.getRandomValues(new Uint8Array(16));
    const pinSalt = bytesToBase64(salt);
    const pinIterations = 160000;
    const pinHash = await derivePin(pin, pinSalt, pinIterations);
    return saveProfile({
      ...profile,
      pinSalt,
      pinHash,
      pinIterations,
      offlineAccessEnabled: true,
      locked: false,
      pinUpdatedAt: Date.now()
    });
  }

  async function verifyPin(profile, pin) {
    if (!profile?.offlineAccessEnabled || !profile.pinHash || !profile.pinSalt) return false;
    if (!/^\d{6}$/.test(String(pin))) return false;
    const calculated = await derivePin(pin, profile.pinSalt, profile.pinIterations || 160000);
    if (calculated.length !== profile.pinHash.length) return false;
    let mismatch = 0;
    for (let index = 0; index < calculated.length; index += 1) {
      mismatch |= calculated.charCodeAt(index) ^ profile.pinHash.charCodeAt(index);
    }
    return mismatch === 0;
  }

  async function putBreak(record) {
    if (!record?.id || !record?.uid) throw new Error("Registro de descanso local incompleto.");
    return put(STORES.breaks, { ...record, updatedAtLocal: Date.now() });
  }

  async function getBreak(id) {
    return (await get(STORES.breaks, id)) || null;
  }

  async function getBreaks(uid) {
    const records = await getAllByIndex(STORES.breaks, "uid", uid);
    return records.sort((a, b) => String(b.startAtClient || "").localeCompare(String(a.startAtClient || "")));
  }

  async function getActiveBreak(uid) {
    const records = await getAllByIndex(STORES.breaks, "uidStatus", [uid, "active"]);
    records.sort((a, b) => String(b.startAtClient || "").localeCompare(String(a.startAtClient || "")));
    return records[0] || null;
  }

  async function putPart(record) {
    if (!record?.uid || !record?.dateKey) throw new Error("Parte local incompleto.");
    const id = record.id || `${record.uid}:${record.dateKey}`;
    return put(STORES.parts, { ...record, id, updatedAtLocal: Date.now() });
  }

  async function getPart(uid, dateKey) {
    return withStore(STORES.parts, "readonly", (store) => requestToPromise(store.index("uidDate").get([uid, dateKey])));
  }

  async function enqueue(item) {
    if (!item?.id || !item?.uid || !item?.type) throw new Error("Elemento de sincronización incompleto.");
    const previous = await get(STORES.queue, item.id);
    const value = {
      ...(previous || {}),
      ...item,
      status: "pending",
      attempts: Number(previous?.attempts || 0),
      createdAt: previous?.createdAt || item.createdAt || Date.now(),
      updatedAt: Date.now(),
      lastError: ""
    };
    return put(STORES.queue, value);
  }

  async function getQueueItem(id) {
    return (await get(STORES.queue, id)) || null;
  }

  async function getPendingQueue(uid) {
    const records = await getAllByIndex(STORES.queue, "uid", uid);
    return records
      .filter((record) => record.status !== "done")
      .sort((a, b) => Number(a.createdAt || 0) - Number(b.createdAt || 0));
  }

  async function updateQueue(item) {
    return put(STORES.queue, { ...item, updatedAt: Date.now() });
  }

  async function deleteQueue(id) {
    return remove(STORES.queue, id);
  }

  async function countPending(uid) {
    const records = await getPendingQueue(uid);
    return records.length;
  }

  async function requestPersistentStorage() {
    try {
      if (navigator.storage?.persist) return await navigator.storage.persist();
    } catch (error) {
      console.warn("Persistencia del almacenamiento:", error);
    }
    return false;
  }

  window.OfflineDB = {
    open,
    saveProfile,
    getProfile,
    getProfileByEmail,
    getLastProfile,
    setLocked,
    configurePin,
    verifyPin,
    putBreak,
    getBreak,
    getBreaks,
    getActiveBreak,
    putPart,
    getPart,
    enqueue,
    getQueueItem,
    getPendingQueue,
    updateQueue,
    deleteQueue,
    countPending,
    requestPersistentStorage
  };
})();
