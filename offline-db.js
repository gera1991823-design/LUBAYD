"use strict";

(() => {
  const DB_NAME = "lubayd-operativa-offline";
  const DB_VERSION = 4;
  const STORES = {
    profiles: "profiles",
    settings: "settings",
    breaks: "breaks",
    parts: "parts",
    services: "services",
    fuelLoads: "fuelLoads",
    operatorParts: "operatorParts",
    tank: "tank",
    queue: "queue",
    chatMessages: "chatMessages"
  };

  let dbPromise = null;

  function req(request) {
    return new Promise((resolve, reject) => {
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error || new Error("Error de IndexedDB"));
    });
  }

  function done(transaction) {
    return new Promise((resolve, reject) => {
      transaction.oncomplete = () => resolve();
      transaction.onerror = () => reject(transaction.error || new Error("Error de transaccion local"));
      transaction.onabort = () => reject(transaction.error || new Error("Transaccion local cancelada"));
    });
  }

  function createStore(db, name, options, indexes = []) {
    if (db.objectStoreNames.contains(name)) return;
    const store = db.createObjectStore(name, options);
    indexes.forEach(([indexName, keyPath, opts]) => store.createIndex(indexName, keyPath, opts || {}));
  }

  function open() {
    if (dbPromise) return dbPromise;
    dbPromise = new Promise((resolve, reject) => {
      if (!("indexedDB" in window)) {
        reject(new Error("Este navegador no admite almacenamiento offline."));
        return;
      }
      const request = indexedDB.open(DB_NAME, DB_VERSION);
      request.onupgradeneeded = (event) => {
        const db = request.result;
        createStore(db, STORES.profiles, { keyPath: "uid" }, [["email", "email"], ["lastLoginAt", "lastLoginAt"]]);
        createStore(db, STORES.settings, { keyPath: "key" });
        createStore(db, STORES.breaks, { keyPath: "id" }, [["uid", "uid"], ["uidStatus", ["uid", "status"]], ["startAtClient", "startAtClient"]]);
        createStore(db, STORES.parts, { keyPath: "id" }, [["uid", "uid"], ["uidDate", ["uid", "dateKey"]], ["dateKey", "dateKey"], ["uidDateMachine", ["uid", "dateKey", "machineKey"], { unique: true }]]);
        createStore(db, STORES.services, { keyPath: "id" }, [["mechanicUid", "mechanicUid"], ["operatorUid", "operatorUid"], ["partId", "partId"], ["status", "status"]]);
        createStore(db, STORES.fuelLoads, { keyPath: "id" }, [["uid", "uid"], ["createdAtClient", "createdAtClient"]]);
        createStore(db, STORES.operatorParts, { keyPath: "id" }, [["operatorUid", "operatorUid"], ["dateKey", "dateKey"], ["status", "status"]]);
        createStore(db, STORES.tank, { keyPath: "id" });
        createStore(db, STORES.queue, { keyPath: "id" }, [["uid", "uid"], ["status", "status"], ["createdAt", "createdAt"]]);
        createStore(db, STORES.chatMessages, { keyPath: "id" }, [["senderUid", "senderUid"], ["createdAtClient", "createdAtClient"]]);

        if (event.oldVersion > 0 && event.oldVersion < 3 && db.objectStoreNames.contains(STORES.parts)) {
          const store = request.transaction.objectStore(STORES.parts);
          if (store.indexNames.contains("uidDate")) store.deleteIndex("uidDate");
          store.createIndex("uidDate", ["uid", "dateKey"], { unique: false });
          if (!store.indexNames.contains("uidDateMachine")) {
            store.createIndex("uidDateMachine", ["uid", "dateKey", "machineKey"], { unique: true });
          }
        }
      };
      request.onsuccess = () => {
        const db = request.result;
        db.onversionchange = () => db.close();
        resolve(db);
      };
      request.onerror = () => reject(request.error || new Error("No se pudo abrir la base local."));
      request.onblocked = () => reject(new Error("La base local esta bloqueada por otra pestana."));
    });
    return dbPromise;
  }

  async function storeAction(storeName, mode, action) {
    const db = await open();
    const tx = db.transaction(storeName, mode);
    const store = tx.objectStore(storeName);
    const result = await action(store, tx);
    if (mode === "readwrite") await done(tx);
    return result;
  }

  async function put(storeName, value) {
    return storeAction(storeName, "readwrite", async (store) => {
      await req(store.put(value));
      return value;
    });
  }

  async function get(storeName, key) {
    return storeAction(storeName, "readonly", (store) => req(store.get(key)));
  }

  async function remove(storeName, key) {
    return storeAction(storeName, "readwrite", (store) => req(store.delete(key)));
  }

  async function all(storeName) {
    return storeAction(storeName, "readonly", (store) => req(store.getAll()));
  }

  async function byIndex(storeName, indexName, key) {
    return storeAction(storeName, "readonly", (store) => req(store.index(indexName).getAll(key)));
  }

  async function setSetting(key, value) {
    return put(STORES.settings, { key, value, updatedAt: Date.now() });
  }

  async function getSetting(key) {
    const record = await get(STORES.settings, key);
    return record?.value;
  }

  function normalizeEmail(email) {
    return String(email || "").trim().toLowerCase();
  }

  async function saveProfile(profile) {
    if (!profile?.uid) throw new Error("Perfil local sin UID.");
    const old = await get(STORES.profiles, profile.uid);
    const merged = {
      ...(old || {}),
      ...profile,
      email: normalizeEmail(profile.email || old?.email),
      updatedAtLocal: Date.now()
    };
    await put(STORES.profiles, merged);
    await setSetting("lastProfileUid", merged.uid);
    return merged;
  }

  async function getProfile(uid) { return uid ? (await get(STORES.profiles, uid)) || null : null; }
  async function getProfileByEmail(email) {
    const normalized = normalizeEmail(email);
    if (!normalized) return null;
    return storeAction(STORES.profiles, "readonly", (store) => req(store.index("email").get(normalized)));
  }
  async function getLastProfile() {
    const uid = await getSetting("lastProfileUid");
    if (uid) {
      const profile = await getProfile(uid);
      if (profile) return profile;
    }
    const profiles = await all(STORES.profiles);
    return profiles.sort((a, b) => Number(b.lastLoginAt || 0) - Number(a.lastLoginAt || 0))[0] || null;
  }
  async function setLocked(uid, locked) {
    const profile = await getProfile(uid);
    return profile ? saveProfile({ ...profile, locked: Boolean(locked) }) : null;
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
    if (!crypto?.subtle) throw new Error("El navegador no admite cifrado para el PIN offline.");
    const material = await crypto.subtle.importKey("raw", new TextEncoder().encode(String(pin)), { name: "PBKDF2" }, false, ["deriveBits"]);
    const bits = await crypto.subtle.deriveBits({ name: "PBKDF2", salt: base64ToBytes(saltBase64), iterations, hash: "SHA-256" }, material, 256);
    return bytesToBase64(new Uint8Array(bits));
  }
  async function configurePin(uid, pin) {
    if (!/^\d{6}$/.test(String(pin))) throw new Error("El PIN debe tener 6 numeros.");
    const profile = await getProfile(uid);
    if (!profile) throw new Error("Primero debes iniciar sesion con Internet.");
    const salt = crypto.getRandomValues(new Uint8Array(16));
    const pinSalt = bytesToBase64(salt);
    const pinIterations = 160000;
    const pinHash = await derivePin(pin, pinSalt, pinIterations);
    return saveProfile({ ...profile, pinSalt, pinIterations, pinHash, offlineAccessEnabled: true, locked: false, pinUpdatedAt: Date.now() });
  }
  async function verifyPin(profile, pin) {
    if (!profile?.offlineAccessEnabled || !/^\d{6}$/.test(String(pin))) return false;
    const result = await derivePin(pin, profile.pinSalt, profile.pinIterations || 160000);
    if (result.length !== profile.pinHash.length) return false;
    let mismatch = 0;
    for (let index = 0; index < result.length; index += 1) mismatch |= result.charCodeAt(index) ^ profile.pinHash.charCodeAt(index);
    return mismatch === 0;
  }

  async function putBreak(record) { return put(STORES.breaks, { ...record, updatedAtLocal: Date.now() }); }
  async function getBreaks(uid) { return (await byIndex(STORES.breaks, "uid", uid)).sort((a, b) => String(b.startAtClient || "").localeCompare(String(a.startAtClient || ""))); }
  async function getAllBreaks() { return (await all(STORES.breaks)).sort((a, b) => String(b.startAtClient || "").localeCompare(String(a.startAtClient || ""))); }
  async function getActiveBreak(uid) { return (await byIndex(STORES.breaks, "uidStatus", [uid, "active"])).sort((a, b) => String(b.startAtClient || "").localeCompare(String(a.startAtClient || "")))[0] || null; }

  async function putPart(record) { return put(STORES.parts, { ...record, updatedAtLocal: Date.now() }); }
  async function getPart(uid, dateKey, machineKey = "") {
    if (machineKey) {
      return storeAction(STORES.parts, "readonly", (store) => req(store.index("uidDateMachine").get([uid, dateKey, machineKey])));
    }
    const records = await byIndex(STORES.parts, "uidDate", [uid, dateKey]);
    return records.sort((a, b) => String(b.updatedAtClient || "").localeCompare(String(a.updatedAtClient || "")))[0] || null;
  }
  async function getParts(uid) { return (await byIndex(STORES.parts, "uid", uid)).sort((a, b) => String(b.dateKey || "").localeCompare(String(a.dateKey || ""))); }

  async function putOperatorPart(record) { return put(STORES.operatorParts, { ...record, updatedAtLocal: Date.now() }); }
  async function getOperatorParts(dateKey) {
    const records = dateKey ? await byIndex(STORES.operatorParts, "dateKey", dateKey) : await all(STORES.operatorParts);
    return records.sort((a, b) => String(a.operatorName || "").localeCompare(String(b.operatorName || "")));
  }

  async function replaceOperatorParts(records = []) {
    const db = await open();
    const tx = db.transaction(STORES.operatorParts, "readwrite");
    const store = tx.objectStore(STORES.operatorParts);
    await req(store.clear());
    for (const record of records) {
      if (record?.id) await req(store.put({ ...record, updatedAtLocal: Date.now() }));
    }
    await done(tx);
    return records;
  }

  async function putService(record) { return put(STORES.services, { ...record, updatedAtLocal: Date.now() }); }
  async function getService(id) { return (await get(STORES.services, id)) || null; }
  async function getServicesForMechanic(uid) { return (await byIndex(STORES.services, "mechanicUid", uid)).sort((a, b) => String(b.startAtClient || "").localeCompare(String(a.startAtClient || ""))); }
  async function getAllServices() { return (await all(STORES.services)).sort((a, b) => String(b.startAtClient || "").localeCompare(String(a.startAtClient || ""))); }
  async function getServicesForPart(partId) { return (await byIndex(STORES.services, "partId", partId)).sort((a, b) => String(b.startAtClient || "").localeCompare(String(a.startAtClient || ""))); }

  async function putFuelLoad(record) { return put(STORES.fuelLoads, { ...record, updatedAtLocal: Date.now() }); }
  async function getFuelLoads(uid) { return (await byIndex(STORES.fuelLoads, "uid", uid)).sort((a, b) => String(b.createdAtClient || "").localeCompare(String(a.createdAtClient || ""))); }
  async function getAllFuelLoads() { return (await all(STORES.fuelLoads)).sort((a, b) => String(b.createdAtClient || "").localeCompare(String(a.createdAtClient || ""))); }

  async function putTank(record) { return put(STORES.tank, { ...record, id: record.id || "main", updatedAtLocal: Date.now() }); }
  async function getTank() { return (await get(STORES.tank, "main")) || null; }


  async function putChatMessage(record) { return put(STORES.chatMessages, { ...record, updatedAtLocal: Date.now() }); }
  async function getChatMessages(limit = 150) {
    const records = await all(STORES.chatMessages);
    return records
      .sort((a, b) => String(a.createdAtClient || "").localeCompare(String(b.createdAtClient || "")))
      .slice(-Math.max(1, Number(limit || 150)));
  }

  async function enqueue(item) {
    if (!item?.id || !item?.uid || !item?.type) throw new Error("Elemento de sincronizacion incompleto.");
    const old = await get(STORES.queue, item.id);
    const record = { ...(old || {}), ...item, status: "pending", attempts: Number(old?.attempts || 0), createdAt: old?.createdAt || item.createdAt || Date.now(), updatedAt: Date.now(), lastError: "" };
    return put(STORES.queue, record);
  }
  async function getPendingQueue(uid) {
    const records = await byIndex(STORES.queue, "uid", uid);
    return records.filter((item) => item.status !== "done").sort((a, b) => Number(a.createdAt || 0) - Number(b.createdAt || 0));
  }
  async function updateQueue(item) { return put(STORES.queue, { ...item, updatedAt: Date.now() }); }
  async function deleteQueue(id) { return remove(STORES.queue, id); }
  async function countPending(uid) { return (await getPendingQueue(uid)).length; }

  async function clearStore(storeName) {
    return storeAction(storeName, "readwrite", (store) => req(store.clear()));
  }

  async function clearOperationalData(scopes = ["parts", "services", "fuel"]) {
    const selected = new Set(scopes);
    const stores = [];
    if (selected.has("parts")) stores.push(STORES.parts, STORES.operatorParts);
    if (selected.has("services")) stores.push(STORES.services);
    if (selected.has("fuel")) stores.push(STORES.fuelLoads);
    if (selected.has("tank")) stores.push(STORES.tank);
    for (const storeName of stores) await clearStore(storeName);

    const queueTypes = new Set();
    if (selected.has("parts")) queueTypes.add("part-upsert");
    if (selected.has("services")) queueTypes.add("service-upsert");
    if (selected.has("fuel")) queueTypes.add("fuel-load");
    if (selected.has("tank")) queueTypes.add("tank-update");
    if (queueTypes.size) {
      await storeAction(STORES.queue, "readwrite", async (store) => {
        const records = await req(store.getAll());
        for (const item of records) {
          if (queueTypes.has(item.type)) await req(store.delete(item.id));
        }
      });
    }
    return true;
  }

  async function requestPersistentStorage() {
    try { return navigator.storage?.persist ? await navigator.storage.persist() : false; }
    catch (error) { console.warn("Persistencia local", error); return false; }
  }

  window.OfflineDB = {
    open, saveProfile, getProfile, getProfileByEmail, getLastProfile, setLocked, configurePin, verifyPin,
    putBreak, getBreaks, getAllBreaks, getActiveBreak,
    putPart, getPart, getParts, putOperatorPart, getOperatorParts, replaceOperatorParts,
    putService, getService, getServicesForMechanic, getAllServices, getServicesForPart,
    putFuelLoad, getFuelLoads, getAllFuelLoads,
    putTank, getTank,
    putChatMessage, getChatMessages,
    enqueue, getPendingQueue, updateQueue, deleteQueue, countPending, clearOperationalData, requestPersistentStorage,
    setSetting, getSetting
  };
})();
