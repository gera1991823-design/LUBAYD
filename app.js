"use strict";

window.__APP_SCRIPT_LOADED__ = true;

const firebaseConfig = {
  apiKey: "AIzaSyAYJV6Ko8-anMATIOqL_EcaSppqlbIosqo",
  authDomain: "app-lubayd.firebaseapp.com",
  projectId: "app-lubayd",
  storageBucket: "app-lubayd.firebasestorage.app",
  messagingSenderId: "270098605772",
  appId: "1:270098605772:web:aa7762106280f1594f0469",
  measurementId: "G-RNN1LHVQVQ"
};

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => Array.from(document.querySelectorAll(selector));

const els = {
  bootView: $("#bootView"), authView: $("#authView"), appView: $("#appView"), authMessage: $("#authMessage"),
  loginTab: $("#loginTab"), registerTab: $("#registerTab"), loginForm: $("#loginForm"), registerForm: $("#registerForm"),
  loginEmail: $("#loginEmail"), loginPassword: $("#loginPassword"), loginButton: $("#loginButton"),
  registerName: $("#registerName"), registerEmail: $("#registerEmail"), registerPassword: $("#registerPassword"), registerPasswordConfirm: $("#registerPasswordConfirm"), registerButton: $("#registerButton"),
  offlineLoginPanel: $("#offlineLoginPanel"), offlineUserAvatar: $("#offlineUserAvatar"), offlineUserName: $("#offlineUserName"), offlineUserEmail: $("#offlineUserEmail"), offlinePinInput: $("#offlinePinInput"), offlineLoginButton: $("#offlineLoginButton"),
  sidebar: $("#sidebar"), menuButton: $("#menuButton"), pageTitle: $("#pageTitle"), userAvatar: $("#userAvatar"), userName: $("#userName"), userEmail: $("#userEmail"), userRoleBadge: $("#userRoleBadge"),
  connectionDot: $("#connectionDot"), connectionText: $("#connectionText"), syncText: $("#syncText"), pendingCount: $("#pendingCount"), syncButton: $("#syncButton"), lockButton: $("#lockButton"),
  topSyncButton: $("#topSyncButton"), topConnectionDot: $("#topConnectionDot"), topConnectionText: $("#topConnectionText"), topSyncText: $("#topSyncText"), topPendingCount: $("#topPendingCount"),
  liveDate: $("#liveDate"), liveClock: $("#liveClock"), dashboardClock: $("#dashboardClock"), dashboardAvatar: $("#dashboardAvatar"), dashboardGreeting: $("#dashboardGreeting"), dashboardRole: $("#dashboardRole"), dashboardConnection: $("#dashboardConnection"), offlineBanner: $("#offlineBanner"), dashboardCards: $("#dashboardCards"), recentActivity: $("#recentActivity"),
  breakBadge: $("#breakBadge"), breakTitle: $("#breakTitle"), breakTimer: $("#breakTimer"), breakDescription: $("#breakDescription"), startBreakButton: $("#startBreakButton"), endBreakButton: $("#endBreakButton"), breakRecentList: $("#breakRecentList"),
  partForm: $("#partForm"), partStatus: $("#partStatus"), establishmentInput: $("#establishmentInput"), machineInput: $("#machineInput"), partDateInput: $("#partDateInput"), horometerStages: $("#horometerStages"), trozoInput: $("#trozoInput"), pulpaInput: $("#pulpaInput"), savePartButton: $("#savePartButton"),
  servicePartSelect: $("#servicePartSelect"), serviceMachine: $("#serviceMachine"), serviceOperator: $("#serviceOperator"), serviceTimer: $("#serviceTimer"), serviceStatus: $("#serviceStatus"), serviceStartedAt: $("#serviceStartedAt"), serviceStartReason: $("#serviceStartReason"), serviceEndReason: $("#serviceEndReason"), serviceStartEvidence: $("#serviceStartEvidence"), serviceEndEvidence: $("#serviceEndEvidence"), startServiceButton: $("#startServiceButton"), endServiceButton: $("#endServiceButton"),
  tankPercent: $("#tankPercent"), tankProgress: $("#tankProgress"), tankCapacity: $("#tankCapacity"), tankCurrent: $("#tankCurrent"), tankUpdated: $("#tankUpdated"), editTankButton: $("#editTankButton"), fuelRecentList: $("#fuelRecentList"), fuelForm: $("#fuelForm"), fuelMachine: $("#fuelMachine"), fuelOperator: $("#fuelOperator"), fuelLiters: $("#fuelLiters"), fuelPhotoEvidence: $("#fuelPhotoEvidence"), captureFuelPhotoButton: $("#captureFuelPhotoButton"), saveFuelButton: $("#saveFuelButton"),
  activityList: $("#activityList"), usersList: $("#usersList"),
  captureModal: $("#captureModal"), captureTitle: $("#captureTitle"), captureSubtitle: $("#captureSubtitle"), capturePreview: $("#capturePreview"), captureFileInput: $("#captureFileInput"), captureGpsCard: $("#captureGpsCard"), captureGpsStatus: $("#captureGpsStatus"), captureGpsButton: $("#captureGpsButton"), captureMapLink: $("#captureMapLink"), confirmCaptureButton: $("#confirmCaptureButton"),
  pinModal: $("#pinModal"), pinInput: $("#pinInput"), pinConfirm: $("#pinConfirm"), pinError: $("#pinError"), savePinButton: $("#savePinButton"), skipPinButton: $("#skipPinButton"),
  tankModal: $("#tankModal"), tankCapacityInput: $("#tankCapacityInput"), tankCurrentInput: $("#tankCurrentInput"), saveTankButton: $("#saveTankButton"),
  processingOverlay: $("#processingOverlay"), processingTitle: $("#processingTitle"), processingMessage: $("#processingMessage"), toastRegion: $("#toastRegion")
};

const SECTION_TITLES = { dashboard: "Inicio", break: "Descanso", part: "Parte", service: "Servicio", fuel: "Combustible", activity: "Actividad", users: "Usuarios" };
const ROLE_LABELS = { operator: "Operador", mechanic: "Mecanico", admin: "Administrador" };
const ROLE_SECTIONS = {
  operator: ["dashboard", "break", "part", "activity"],
  mechanic: ["dashboard", "service", "fuel", "activity"],
  admin: ["dashboard", "break", "part", "service", "fuel", "activity", "users"]
};
const HOROMETER_CONFIG = [
  { key: "initial", label: "Horometro inicial", help: "Inicio de la jornada" },
  { key: "break", label: "Horometro descanso", help: "Lectura al iniciar el descanso" },
  { key: "postBreak", label: "Horometro post descanso", help: "Lectura al retomar la actividad" },
  { key: "final", label: "Horometro final", help: "Cierre de la jornada" }
];

let firebaseReady = false;
let auth = null;
let db = null;
let storage = null;
let sdk = {};
let currentUser = null;
let currentProfile = null;
let localSession = false;
let lastOfflineProfile = null;
let currentSection = "dashboard";
let currentBreak = null;
let breakRecords = [];
let currentPart = null;
let operatorParts = [];
let currentService = null;
let services = [];
let fuelLoads = [];
let tank = { id: "main", capacityLiters: 0, currentLiters: 0 };
let fuelPhoto = null;
let captureContext = null;
let captureBlob = null;
let captureLocation = null;
let captureObjectUrl = null;
let timerHandle = null;
let syncRunning = false;
let authResolved = false;
let firebaseInitPromise = null;
let authObserverUnsubscribe = null;
let reconnectRunning = false;
let lastSyncError = "";
let syncRetryHandle = null;

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);
}
function uuid() { return crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(16).slice(2)}`; }
function todayKey() { return new Date().toISOString().slice(0, 10); }
function localIso() { return new Date().toISOString(); }
function initials(name) { return String(name || "U").trim().split(/\s+/).slice(0, 2).map((item) => item[0]).join("").toUpperCase() || "U"; }
function roleLabel(role) { return ROLE_LABELS[role] || ROLE_LABELS.operator; }
function formatDate(value) { if (!value) return "-"; return new Date(value).toLocaleDateString("es-UY", { day: "2-digit", month: "short", year: "numeric" }); }
function formatTime(value) { if (!value) return "-"; return new Date(value).toLocaleTimeString("es-UY", { hour: "2-digit", minute: "2-digit" }); }
function formatDateTime(value) { return value ? `${formatDate(value)} ${formatTime(value)}` : "-"; }
function formatDuration(start, end = new Date().toISOString()) {
  if (!start) return "00:00:00";
  const seconds = Math.max(0, Math.floor((new Date(end).getTime() - new Date(start).getTime()) / 1000));
  const h = String(Math.floor(seconds / 3600)).padStart(2, "0");
  const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
  const s = String(seconds % 60).padStart(2, "0");
  return `${h}:${m}:${s}`;
}
function mapUrl(location) { return location ? `https://www.google.com/maps?q=${location.latitude},${location.longitude}` : "#"; }
function liters(value) { return `${new Intl.NumberFormat("es-UY", { maximumFractionDigits: 1 }).format(Number(value || 0))} L`; }
function showToast(title, message, type = "success") {
  const node = document.createElement("div");
  node.className = `toast ${type === "error" ? "error" : ""}`;
  node.innerHTML = `<strong>${escapeHtml(title)}</strong><span>${escapeHtml(message)}</span>`;
  els.toastRegion.appendChild(node);
  setTimeout(() => node.remove(), 4800);
}
function showAuthMessage(message) { els.authMessage.textContent = message; els.authMessage.classList.remove("hidden"); }
function clearAuthMessage() { els.authMessage.textContent = ""; els.authMessage.classList.add("hidden"); }
function setBusy(button, busy, text = "Procesando...") { if (!button) return; if (!button.dataset.label) button.dataset.label = button.textContent; button.disabled = busy; button.textContent = busy ? text : button.dataset.label; }
function showProcessing(title, message) { els.processingTitle.textContent = title; els.processingMessage.textContent = message; els.processingOverlay.classList.remove("hidden"); }
function hideProcessing() { els.processingOverlay.classList.add("hidden"); }

function reveal(view) {
  els.bootView.classList.add("hidden");
  els.authView.classList.toggle("hidden", view !== "auth");
  els.appView.classList.toggle("hidden", view !== "app");
  document.body.classList.remove("booting");
}

async function importFirebase() {
  if (firebaseReady && auth && db && storage) return true;
  if (firebaseInitPromise) return firebaseInitPromise;

  firebaseInitPromise = (async () => {
    const version = "10.14.1";
    const [appSdk, authSdk, firestoreSdk, storageSdk] = await Promise.all([
      import(`https://www.gstatic.com/firebasejs/${version}/firebase-app.js`),
      import(`https://www.gstatic.com/firebasejs/${version}/firebase-auth.js`),
      import(`https://www.gstatic.com/firebasejs/${version}/firebase-firestore.js`),
      import(`https://www.gstatic.com/firebasejs/${version}/firebase-storage.js`)
    ]);

    sdk = {
      ...authSdk,
      ...firestoreSdk,
      storageRef: storageSdk.ref,
      uploadBytes: storageSdk.uploadBytes,
      getDownloadURL: storageSdk.getDownloadURL
    };

    const app = appSdk.getApps().length ? appSdk.getApps()[0] : appSdk.initializeApp(firebaseConfig);
    auth = authSdk.getAuth(app);
    db = firestoreSdk.getFirestore(app);
    storage = storageSdk.getStorage(app);
    await authSdk.setPersistence(auth, authSdk.browserLocalPersistence).catch(() => {});

    try {
      await firestoreSdk.enableMultiTabIndexedDbPersistence(db);
    } catch (error) {
      if (!String(error?.code || "").includes("failed-precondition") && !String(error?.code || "").includes("unimplemented")) {
        console.warn("Persistencia Firestore", error);
      }
    }

    firebaseReady = true;
    attachAuthObserver();
    return true;
  })().catch((error) => {
    firebaseReady = false;
    firebaseInitPromise = null;
    throw error;
  });

  return firebaseInitPromise;
}

function attachAuthObserver() {
  if (!auth || authObserverUnsubscribe) return;
  authObserverUnsubscribe = sdk.onAuthStateChanged(auth, handleAuthState, (error) => {
    console.warn("Estado de autenticacion", error);
  });
}

async function waitForAuthUser(timeoutMs = 7000) {
  if (!auth) return null;
  if (auth.currentUser) return auth.currentUser;
  return new Promise((resolve) => {
    let settled = false;
    let timer = null;
    let unsubscribe = () => {};
    const finish = (user) => {
      if (settled) return;
      settled = true;
      if (timer) clearTimeout(timer);
      unsubscribe();
      resolve(user || null);
    };
    unsubscribe = sdk.onAuthStateChanged(auth, finish, () => finish(null));
    timer = setTimeout(() => finish(auth.currentUser), timeoutMs);
  });
}

async function initializeOfflineProfile() {
  if (!window.OfflineDB) return;
  await OfflineDB.open();
  OfflineDB.requestPersistentStorage().catch(() => {});
  lastOfflineProfile = await OfflineDB.getLastProfile();
  renderOfflineLoginPanel();
}

function renderOfflineLoginPanel() {
  const available = Boolean(lastOfflineProfile?.offlineAccessEnabled);
  els.offlineLoginPanel.classList.toggle("hidden", !available);
  if (!available) return;
  els.offlineUserName.textContent = lastOfflineProfile.name || "Usuario";
  els.offlineUserEmail.textContent = lastOfflineProfile.email || "";
  els.offlineUserAvatar.textContent = initials(lastOfflineProfile.name || lastOfflineProfile.email);
}

async function boot() {
  bindEvents();
  startClock();
  try { await initializeOfflineProfile(); } catch (error) { console.warn("Base offline", error); }

  if (!navigator.onLine) {
    authResolved = true;
    reveal("auth");
    renderOfflineLoginPanel();
    if (!lastOfflineProfile?.offlineAccessEnabled) {
      showAuthMessage("Este dispositivo todavia no tiene acceso offline configurado. Conectate una vez para iniciar sesion y crear el PIN.");
    }
    return;
  }

  try {
    await importFirebase();
    const user = await waitForAuthUser();
    if (!user && !authResolved && !localSession) {
      authResolved = true;
      reveal("auth");
      renderOfflineLoginPanel();
    }
  } catch (error) {
    console.warn("Firebase no disponible", error);
    authResolved = true;
    reveal("auth");
    if (!lastOfflineProfile?.offlineAccessEnabled) showAuthMessage("No se pudo cargar Firebase. Revisa la conexion y actualiza la pagina.");
  }
}

async function handleAuthState(user) {
  if (user) {
    try {
      const profile = await resolveProfile(user);
      if (profile?.locked && !localSession) {
        authResolved = true;
        reveal("auth");
        renderOfflineLoginPanel();
        return;
      }

      if (localSession && currentProfile?.uid === user.uid) {
        currentUser = user;
        currentProfile = profile;
        localSession = false;
        authResolved = true;
        applyProfile();
        applyRoleVisibility();
        updateConnection();
        await refreshServerData().catch((error) => console.warn("Datos remotos", error));
        await syncNow(false).catch((error) => console.warn("Sincronizacion al reconectar", error));
        showToast("Sesion validada", "La aplicacion volvio al modo en linea y sincronizara los pendientes.");
        return;
      }

      await enterApplication(user, profile, false);
    } catch (error) {
      console.error("Sesion", error);
      if (localSession && currentProfile) {
        updateConnection();
        return;
      }
      showAuthMessage("No se pudo cargar el perfil del usuario.");
      reveal("auth");
    }
  } else if (!localSession) {
    currentUser = null;
    currentProfile = null;
    authResolved = true;
    reveal("auth");
    renderOfflineLoginPanel();
  }
}

async function resolveProfile(user) {
  let cached = await OfflineDB.getProfile(user.uid).catch(() => null);
  let role = cached?.role || "operator";
  let name = user.displayName || cached?.name || "Usuario";
  if (navigator.onLine && db) {
    const ref = sdk.doc(db, "users", user.uid);
    const snap = await sdk.getDoc(ref);
    if (snap.exists()) {
      const data = snap.data();
      role = data.role || role;
      name = data.name || name;
    } else {
      await sdk.setDoc(ref, { uid: user.uid, name, email: user.email || "", role: "operator", active: true, createdAt: sdk.serverTimestamp(), createdAtClient: localIso() }, { merge: true });
      role = "operator";
    }
  }
  const profile = await OfflineDB.saveProfile({ ...(cached || {}), uid: user.uid, name, email: user.email || "", role, active: true, locked: false, lastLoginAt: Date.now() });
  lastOfflineProfile = profile;
  return profile;
}

async function enterApplication(user, profile, offline) {
  currentUser = user;
  currentProfile = profile;
  localSession = offline;
  authResolved = true;
  applyProfile();
  reveal("app");
  await loadAllLocalData();
  applyRoleVisibility();
  showSection("dashboard");
  renderAll();
  if (!offline && navigator.onLine && firebaseReady) {
    await refreshServerData().catch((error) => console.warn("Datos remotos", error));
    syncNow(false).catch((error) => console.warn("Sincronizacion inicial", error));
  }
  if (!profile.offlineAccessEnabled && !offline) els.pinModal.classList.remove("hidden");
}

function applyProfile() {
  const name = currentProfile?.name || currentUser?.displayName || "Usuario";
  const email = currentProfile?.email || currentUser?.email || "";
  const role = currentProfile?.role || "operator";
  document.body.dataset.role = role;
  [els.userAvatar, els.dashboardAvatar].forEach((el) => { if (el) el.textContent = initials(name); });
  els.userName.textContent = name;
  els.userEmail.textContent = email;
  els.userRoleBadge.textContent = roleLabel(role);
  const firstName = String(name || "Usuario").trim().split(/\s+/)[0];
  els.dashboardGreeting.textContent = `¡Hola, ${firstName}!`;
  els.dashboardRole.textContent = `Rol: ${roleLabel(role)}`;
}

function allowedSections() { return ROLE_SECTIONS[currentProfile?.role || "operator"] || ROLE_SECTIONS.operator; }
function applyRoleVisibility() {
  const allowed = allowedSections();
  $$('[data-roles]').forEach((element) => {
    const roles = element.dataset.roles.split(",");
    element.classList.toggle("hidden", !roles.includes(currentProfile?.role || "operator"));
  });
  if (!allowed.includes(currentSection)) showSection("dashboard");
  renderDashboardCards();
}

function showSection(section) {
  if (!allowedSections().includes(section)) section = "dashboard";
  currentSection = section;
  $$(".content-section").forEach((node) => node.classList.toggle("active", node.id === `${section}Section`));
  $$('[data-section]').forEach((node) => node.classList.toggle("active", node.dataset.section === section));
  els.pageTitle.textContent = SECTION_TITLES[section] || "Inicio";
  els.sidebar.classList.remove("open");
  if (section === "service") loadOperatorParts().catch(console.warn);
  if (section === "fuel") loadFuelSection().catch(console.warn);
  if (section === "users") loadUsers().catch(console.warn);
  if (section === "activity") renderActivity();
}

function startClock() {
  const update = () => {
    const now = new Date();
    els.liveDate.textContent = now.toLocaleDateString("es-UY", { weekday: "long", day: "2-digit", month: "long" });
    els.liveClock.textContent = now.toLocaleTimeString("es-UY", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
    els.dashboardClock.textContent = now.toLocaleTimeString("es-UY", { hour: "2-digit", minute: "2-digit" });
    renderTimers();
  };
  update();
  timerHandle = setInterval(update, 1000);
}

function bindEvents() {
  els.loginTab.addEventListener("click", () => switchAuth("login"));
  els.registerTab.addEventListener("click", () => switchAuth("register"));
  els.loginForm.addEventListener("submit", loginOnline);
  els.registerForm.addEventListener("submit", registerOnline);
  els.offlineLoginButton.addEventListener("click", loginOffline);
  els.menuButton.addEventListener("click", () => els.sidebar.classList.toggle("open"));
  els.syncButton.addEventListener("click", () => syncNow(true));
  els.topSyncButton?.addEventListener("click", () => syncNow(true));
  els.lockButton.addEventListener("click", lockApplication);
  $$('[data-section]').forEach((button) => button.addEventListener("click", () => showSection(button.dataset.section)));
  $$('[data-section-link]').forEach((button) => button.addEventListener("click", () => showSection(button.dataset.sectionLink)));
  els.startBreakButton.addEventListener("click", startBreak);
  els.endBreakButton.addEventListener("click", endBreak);
  els.partForm.addEventListener("submit", savePart);
  els.servicePartSelect.addEventListener("change", selectServicePart);
  els.startServiceButton.addEventListener("click", startService);
  els.endServiceButton.addEventListener("click", endService);
  els.captureFuelPhotoButton.addEventListener("click", captureFuelPhoto);
  els.fuelForm.addEventListener("submit", saveFuelLoad);
  els.editTankButton.addEventListener("click", openTankModal);
  els.saveTankButton.addEventListener("click", saveTank);
  $$('[data-close-tank]').forEach((button) => button.addEventListener("click", () => els.tankModal.classList.add("hidden")));
  $$('[data-close-modal]').forEach((button) => button.addEventListener("click", closeCapture));
  els.captureFileInput.addEventListener("change", handleCaptureFile);
  els.captureGpsButton.addEventListener("click", acquireGps);
  els.confirmCaptureButton.addEventListener("click", confirmCapture);
  els.savePinButton.addEventListener("click", saveOfflinePin);
  els.skipPinButton.addEventListener("click", () => els.pinModal.classList.add("hidden"));
  window.addEventListener("online", () => { updateConnection(); reconnectAndSync().catch(console.warn); });
  window.addEventListener("offline", () => { updateConnection(); scheduleSyncRetry(false); });
  navigator.serviceWorker?.addEventListener?.("message", (event) => {
    if (event.data?.type === "TRY_SYNC") reconnectAndSync().catch(console.warn);
  });
  document.addEventListener("click", (event) => {
    const partCapture = event.target.closest("[data-horometer-capture]");
    if (partCapture) captureHorometer(partCapture.dataset.horometerCapture);
    const roleSave = event.target.closest("[data-save-role]");
    if (roleSave) saveUserRole(roleSave.dataset.saveRole);
  });
}

function switchAuth(mode) {
  clearAuthMessage();
  const login = mode === "login";
  els.loginTab.classList.toggle("active", login);
  els.registerTab.classList.toggle("active", !login);
  els.loginForm.classList.toggle("active", login);
  els.registerForm.classList.toggle("active", !login);
}

async function loginOnline(event) {
  event.preventDefault();
  if (!navigator.onLine) { showAuthMessage("No hay conexion. Usa el ingreso por PIN offline."); return; }
  setBusy(els.loginButton, true, "Ingresando...");
  clearAuthMessage();
  try {
    await importFirebase();
    await sdk.signInWithEmailAndPassword(auth, els.loginEmail.value.trim(), els.loginPassword.value);
  }
  catch (error) { showAuthMessage(friendlyError(error)); }
  finally { setBusy(els.loginButton, false); }
}

async function registerOnline(event) {
  event.preventDefault();
  if (!navigator.onLine) { showAuthMessage("Crear usuarios requiere Internet."); return; }
  if (els.registerPassword.value !== els.registerPasswordConfirm.value) { showAuthMessage("Las contrasenas no coinciden."); return; }
  setBusy(els.registerButton, true, "Creando...");
  try {
    await importFirebase();
    const credential = await sdk.createUserWithEmailAndPassword(auth, els.registerEmail.value.trim(), els.registerPassword.value);
    await sdk.updateProfile(credential.user, { displayName: els.registerName.value.trim() });
    await sdk.setDoc(sdk.doc(db, "users", credential.user.uid), { uid: credential.user.uid, name: els.registerName.value.trim(), email: credential.user.email || "", role: "operator", active: true, createdAt: sdk.serverTimestamp(), createdAtClient: localIso() }, { merge: true });
    showToast("Usuario creado", "La cuenta fue creada como operador.");
  } catch (error) { showAuthMessage(friendlyError(error)); }
  finally { setBusy(els.registerButton, false); }
}

async function loginOffline() {
  if (!lastOfflineProfile) return;
  setBusy(els.offlineLoginButton, true, "Validando...");
  try {
    const valid = await OfflineDB.verifyPin(lastOfflineProfile, els.offlinePinInput.value);
    if (!valid) throw new Error("PIN incorrecto.");
    const profile = await OfflineDB.saveProfile({ ...lastOfflineProfile, locked: false, lastLoginAt: Date.now() });
    const user = { uid: profile.uid, email: profile.email, displayName: profile.name, isOfflineLocal: true };
    await enterApplication(user, profile, true);
  } catch (error) { showAuthMessage(error.message || "No se pudo validar el PIN."); }
  finally { setBusy(els.offlineLoginButton, false); }
}

async function lockApplication() {
  if (!currentProfile) return;
  await OfflineDB.setLocked(currentProfile.uid, true).catch(() => {});
  lastOfflineProfile = { ...currentProfile, locked: true };
  localSession = false;
  currentUser = null;
  currentProfile = null;
  if (auth?.currentUser) await sdk.signOut(auth).catch(() => {});
  renderOfflineLoginPanel();
  reveal("auth");
}

async function saveOfflinePin() {
  const pin = els.pinInput.value;
  if (pin !== els.pinConfirm.value || !/^\d{6}$/.test(pin)) {
    els.pinError.textContent = "El PIN debe tener 6 numeros y coincidir.";
    els.pinError.classList.remove("hidden");
    return;
  }
  try {
    currentProfile = await OfflineDB.configurePin(currentProfile.uid, pin);
    lastOfflineProfile = currentProfile;
    els.pinModal.classList.add("hidden");
    renderOfflineLoginPanel();
    showToast("PIN configurado", "Ya puedes ingresar sin Internet en este dispositivo.");
  } catch (error) {
    els.pinError.textContent = error.message;
    els.pinError.classList.remove("hidden");
  }
}

function friendlyError(error) {
  const code = error?.code || "";
  const messages = {
    "auth/invalid-credential": "Correo o contrasena incorrectos.",
    "auth/user-not-found": "El usuario no existe.",
    "auth/wrong-password": "Contrasena incorrecta.",
    "auth/email-already-in-use": "Ese correo ya esta registrado.",
    "auth/weak-password": "La contrasena debe tener al menos 6 caracteres.",
    "auth/network-request-failed": "No se pudo conectar con Firebase.",
    "permission-denied": "Firebase rechazo la operacion. Publica las reglas incluidas en esta version.",
    "storage/unauthorized": "Storage rechazo la foto. Publica las reglas de Storage incluidas.",
    "storage/retry-limit-exceeded": "La foto no pudo cargarse por un problema de red.",
    "unavailable": "Firebase no esta disponible temporalmente."
  };
  return messages[code] || error?.message || "Ocurrio un error inesperado.";
}

async function loadAllLocalData() {
  if (!currentUser) return;
  breakRecords = await OfflineDB.getBreaks(currentUser.uid).catch(() => []);
  currentBreak = breakRecords.find((record) => record.status === "active") || null;
  currentPart = await OfflineDB.getPart(currentUser.uid, todayKey()).catch(() => null);
  if (currentPart) currentPart = normalizePartRecord(currentPart);
  services = await OfflineDB.getServicesForMechanic(currentUser.uid).catch(() => []);
  fuelLoads = currentProfile?.role === "admin" ? await OfflineDB.getAllFuelLoads().catch(() => []) : await OfflineDB.getFuelLoads(currentUser.uid).catch(() => []);
  tank = await OfflineDB.getTank().catch(() => null) || tank;
  operatorParts = await OfflineDB.getOperatorParts(todayKey()).catch(() => []);
  await repairPendingPart().catch((error) => console.warn("Reparacion de parte pendiente", error));
  updateConnection();
  await updateSyncUi();
}

async function refreshServerData() {
  if (!firebaseReady || !navigator.onLine || !currentUser || localSession) return;
  const role = currentProfile?.role || "operator";
  const tasks = [];
  if (["operator", "admin"].includes(role)) tasks.push(loadBreaksFromServer(), loadPartFromServer());
  if (["mechanic", "admin"].includes(role)) tasks.push(loadOperatorParts(), loadServicesFromServer(), loadFuelSection());
  await Promise.all(tasks);
  renderAll();
}

async function loadBreaksFromServer() {
  const q = sdk.query(sdk.collection(db, "users", currentUser.uid, "breaks"), sdk.orderBy("startAtClient", "desc"), sdk.limit(30));
  const snap = await sdk.getDocs(q);
  for (const docSnap of snap.docs) {
    const record = { id: docSnap.id, ...docSnap.data(), uid: currentUser.uid, syncStatus: "synced" };
    await OfflineDB.putBreak(record);
  }
  breakRecords = await OfflineDB.getBreaks(currentUser.uid);
  currentBreak = breakRecords.find((record) => record.status === "active") || null;
}

async function loadPartFromServer() {
  if (!currentUser || currentProfile?.role === "mechanic") return;
  const id = `${currentUser.uid}_${todayKey()}`;
  const snap = await sdk.getDoc(sdk.doc(db, "operationalParts", id));
  if (snap.exists()) {
    const record = normalizePartRecord({ id, ...snap.data(), uid: currentUser.uid, operatorUid: snap.data().operatorUid || currentUser.uid, syncStatus: "synced" });
    await OfflineDB.putPart(record);
    await OfflineDB.putOperatorPart(record);
    currentPart = record;
  }
}

async function loadOperatorParts() {
  const date = todayKey();
  if (firebaseReady && navigator.onLine && !localSession) {
    const q = sdk.query(sdk.collection(db, "operationalParts"), sdk.where("dateKey", "==", date));
    const snap = await sdk.getDocs(q);
    for (const item of snap.docs) await OfflineDB.putOperatorPart({ id: item.id, ...item.data(), syncStatus: "synced" });
  }
  operatorParts = await OfflineDB.getOperatorParts(date);
  populateServiceParts();
  populateFuelOperators();
}

async function loadServicesFromServer() {
  if (!firebaseReady || !navigator.onLine || localSession || !["mechanic", "admin"].includes(currentProfile?.role)) return;
  let q;
  if (currentProfile.role === "admin") q = sdk.query(sdk.collection(db, "services"), sdk.orderBy("startAtClient", "desc"), sdk.limit(40));
  else q = sdk.query(sdk.collection(db, "services"), sdk.where("mechanicUid", "==", currentUser.uid));
  const snap = await sdk.getDocs(q);
  for (const item of snap.docs) await OfflineDB.putService({ id: item.id, ...item.data(), syncStatus: "synced" });
  services = currentProfile.role === "admin" ? await OfflineDB.getAllServices() : await OfflineDB.getServicesForMechanic(currentUser.uid);
}

function renderAll() {
  renderDashboardCards();
  renderBreak();
  renderPart();
  renderService();
  renderTank();
  renderFuelRecent();
  renderActivity();
  updateConnection();
}

function updateConnection() {
  const online = navigator.onLine;
  const validated = online && firebaseReady && !localSession && Boolean(auth?.currentUser);
  const connectionLabel = !online ? "Sin conexion" : validated ? "En linea" : "En linea · validando";
  const connectionDetail = !online ? "Modo offline" : validated ? "Sesion validada" : "Pendiente validar sesion";

  [els.connectionDot, els.topConnectionDot].filter(Boolean).forEach((dot) => {
    dot.classList.toggle("online", validated);
    dot.classList.toggle("offline", !online);
    dot.classList.toggle("waiting", online && !validated);
  });
  els.connectionText.textContent = connectionLabel;
  if (els.topConnectionText) els.topConnectionText.textContent = connectionLabel;
  els.dashboardConnection.textContent = connectionDetail;
  els.offlineBanner.classList.toggle("hidden", online);
}

async function updateSyncUi(state = null) {
  if (!currentUser) return;
  const count = await OfflineDB.countPending(currentUser.uid).catch(() => 0);
  const running = Boolean(state?.running);
  if (state?.lastError) lastSyncError = state.lastError;
  if (!count && !running) lastSyncError = "";

  const text = running
    ? `Sincronizando ${state.processed || 0}/${state.total || count}`
    : count
      ? lastSyncError ? `${count} pendiente${count === 1 ? "" : "s"} · revisar` : `${count} pendiente${count === 1 ? "" : "s"}`
      : "Todo sincronizado";

  els.pendingCount.textContent = String(count);
  els.pendingCount.classList.toggle("hidden", count === 0);
  els.syncText.textContent = text;
  els.syncText.title = lastSyncError || "";
  if (els.topPendingCount) {
    els.topPendingCount.textContent = String(count);
    els.topPendingCount.classList.toggle("hidden", count === 0);
  }
  if (els.topSyncText) {
    els.topSyncText.textContent = text;
    els.topSyncText.title = lastSyncError || "";
  }
}

function renderDashboardCards() {
  if (!currentProfile) return;
  const role = currentProfile.role;
  const cards = [];
  if (["operator", "admin"].includes(role)) {
    cards.push({ kind: "break", icon: "☕", title: "Descanso", text: currentBreak ? `En curso desde ${formatTime(currentBreak.startAtClient)}` : "Iniciar o finalizar descanso.", section: "break", action: currentBreak ? "Ver descanso" : "Abrir" });
    cards.push({ kind: "part", icon: "▣", title: "Parte", text: currentPart ? `${currentPart.machine || "Sin maquina"} · ${currentPart.syncStatus === "pending" ? "Pendiente" : "Guardado"}` : "Horometros y produccion del dia.", section: "part", action: "Abrir" });
  }
  if (["mechanic", "admin"].includes(role)) {
    const active = services.find((item) => item.status === "active");
    cards.push({ kind: "service", icon: "🔧", title: "Parte de servicio", text: active ? `${active.machine} · ${formatDuration(active.startAtClient)}` : "Registrar inicio y fin de reparacion.", section: "service", action: "Abrir" });
    cards.push({ kind: "fuel", icon: "⛽", title: "Carga de combustible", text: `${liters(tank.currentLiters)} disponibles en el tanque principal.`, section: "fuel", action: "Registrar" });
  }
  cards.push({ kind: "activity", icon: "+", title: role === "operator" ? "Nueva actividad" : "Actividad", text: "Consulta los ultimos movimientos disponibles para tu rol.", section: "activity", action: "Ver actividad" });
  els.dashboardCards.innerHTML = cards.map((card) => `<article class="quick-card quick-card-${card.kind}"><span class="quick-icon">${card.icon}</span><h3>${escapeHtml(card.title)}</h3><p>${escapeHtml(card.text)}</p><button class="primary-button" type="button" data-section-link="${card.section}">${escapeHtml(card.action)}</button></article>`).join("");
  els.dashboardCards.querySelectorAll("[data-section-link]").forEach((button) => button.addEventListener("click", () => showSection(button.dataset.sectionLink)));
  renderRecentActivity();
}

function renderRecentActivity() {
  const records = buildActivityRecords().slice(0, 5);
  els.recentActivity.innerHTML = records.length ? records.map(activityTemplate).join("") : '<div class="empty-state">Sin actividad reciente.</div>';
}

function buildActivityRecords() {
  const role = currentProfile?.role;
  const items = [];
  if (["operator", "admin"].includes(role)) {
    breakRecords.forEach((record) => items.push({ icon: "◷", title: record.status === "active" ? "Inicio de descanso" : "Descanso completado", detail: record.status === "active" ? "Descanso en curso" : `Duracion ${formatDuration(record.startAtClient, record.endAtClient)}`, date: record.startAtClient, status: record.syncStatus }));
    if (currentPart) items.push({ icon: "▣", title: "Parte diario", detail: `${currentPart.machine || "Sin maquina"} - Trozo ${currentPart.production?.trozo || 0} / Pulpa ${currentPart.production?.pulpa || 0}`, date: currentPart.updatedAtClient || currentPart.createdAtClient, status: currentPart.syncStatus });
  }
  if (["mechanic", "admin"].includes(role)) {
    services.forEach((record) => items.push({ icon: "⚒", title: record.status === "active" ? "Servicio iniciado" : "Servicio finalizado", detail: `${record.operatorName || "Operador"} - ${record.machine || "Maquina"}`, date: record.startAtClient, status: record.syncStatus }));
    fuelLoads.forEach((record) => items.push({ icon: "⛽", title: "Carga de combustible", detail: `${record.machine} - ${liters(record.liters)} - ${record.shift === "night" ? "Nocturna" : "Diurna"}`, date: record.createdAtClient, status: record.syncStatus }));
  }
  return items.sort((a, b) => String(b.date || "").localeCompare(String(a.date || "")));
}

function activityTemplate(item) {
  return `<div class="activity-item"><span class="activity-icon">${item.icon}</span><div class="activity-copy"><strong>${escapeHtml(item.title)}</strong><span>${escapeHtml(item.detail)}</span></div><div class="activity-meta"><span>${formatDate(item.date)}</span><strong>${formatTime(item.date)}</strong>${item.status === "pending" ? "<small>Pendiente</small>" : ""}</div></div>`;
}

function renderActivity() {
  const records = buildActivityRecords();
  els.activityList.innerHTML = records.length ? records.map(activityTemplate).join("") : '<div class="empty-state">Sin actividad para mostrar.</div>';
}

function renderBreak() {
  const active = Boolean(currentBreak?.status === "active");
  els.breakBadge.textContent = active ? "Activo" : "Disponible";
  els.breakBadge.className = `badge ${active ? "active" : "neutral"}`;
  els.breakTitle.textContent = active ? "Descanso en curso" : "Sin descanso activo";
  els.breakDescription.textContent = active ? `Iniciado ${formatDateTime(currentBreak.startAtClient)}` : "Puedes iniciar tu descanso.";
  els.startBreakButton.disabled = active;
  els.endBreakButton.disabled = !active;
  els.breakRecentList.innerHTML = breakRecords.slice(0, 5).map((record) => activityTemplate({ icon: "◷", title: record.status === "active" ? "Descanso activo" : "Descanso completado", detail: record.status === "active" ? "En curso" : formatDuration(record.startAtClient, record.endAtClient), date: record.startAtClient, status: record.syncStatus })).join("") || '<div class="empty-state">Sin descansos registrados.</div>';
}

function renderTimers() {
  els.breakTimer.textContent = currentBreak?.status === "active" ? formatDuration(currentBreak.startAtClient) : "00:00:00";
  els.serviceTimer.textContent = currentService?.status === "active" ? formatDuration(currentService.startAtClient) : currentService?.status === "completed" ? formatDuration(currentService.startAtClient, currentService.endAtClient) : "00:00:00";
}

async function requestBackgroundSync() {
  try {
    if (!("serviceWorker" in navigator)) return;
    const registration = await navigator.serviceWorker.ready;
    if (registration.sync?.register) await registration.sync.register("lubayd-sync");
  } catch (error) {
    console.debug("Background Sync no disponible", error);
  }
}

async function queueForSync(item) {
  await OfflineDB.enqueue(item);
  requestBackgroundSync().catch(() => {});
  scheduleSyncRetry(true);
}

function scheduleSyncRetry(enabled = true) {
  if (syncRetryHandle) clearTimeout(syncRetryHandle);
  syncRetryHandle = null;
  if (!enabled || !navigator.onLine || !currentUser) return;
  syncRetryHandle = setTimeout(() => reconnectAndSync().catch(console.warn), 5000);
}

async function reconnectAndSync() {
  if (!navigator.onLine || reconnectRunning || !currentProfile) return;
  reconnectRunning = true;
  try {
    await importFirebase();
    const onlineUser = await waitForAuthUser();
    if (!onlineUser) {
      updateConnection();
      showToast("Conexion recuperada", "Para enviar los pendientes, ingresa una vez con correo y contrasena.", "error");
      return;
    }
    if (onlineUser.uid !== currentProfile.uid) {
      showToast("Usuario diferente", "La sesion de Firebase no coincide con el usuario offline. Bloquea la app e ingresa con la cuenta correcta.", "error");
      return;
    }
    currentUser = onlineUser;
    currentProfile = await resolveProfile(onlineUser);
    localSession = false;
    applyProfile();
    applyRoleVisibility();
    updateConnection();
    await syncNow(false);
  } catch (error) {
    lastSyncError = friendlyError(error);
    await updateSyncUi({ lastError: lastSyncError });
    console.warn("Reconexion", error);
  } finally {
    reconnectRunning = false;
  }
}

async function startBreak() {
  if (currentBreak) return;
  openCapture({ title: "Iniciar descanso", subtitle: "La foto y la ubicacion son obligatorias.", requireGps: true, onConfirm: async (evidence) => {
    const record = { id: uuid(), uid: currentUser.uid, userName: currentProfile.name, status: "active", startAtClient: localIso(), startEvidence: evidence, syncStatus: "pending" };
    currentBreak = record;
    breakRecords.unshift(record);
    await OfflineDB.putBreak(record);
    await queueForSync({ id: `break:${record.id}`, uid: currentUser.uid, type: "break-upsert", payload: record });
    renderAll();
    await updateSyncUi();
    syncNow(false).catch(console.warn);
  }});
}

async function endBreak() {
  if (!currentBreak) return;
  openCapture({ title: "Finalizar descanso", subtitle: "Registra la evidencia final.", requireGps: true, onConfirm: async (evidence) => {
    currentBreak = { ...currentBreak, status: "completed", endAtClient: localIso(), endEvidence: evidence, syncStatus: "pending" };
    breakRecords = breakRecords.map((item) => item.id === currentBreak.id ? currentBreak : item);
    await OfflineDB.putBreak(currentBreak);
    await queueForSync({ id: `break:${currentBreak.id}`, uid: currentUser.uid, type: "break-upsert", payload: currentBreak });
    currentBreak = null;
    renderAll();
    await updateSyncUi();
    syncNow(false).catch(console.warn);
  }});
}

function normalizePartRecord(source = {}) {
  const operatorUid = String(source.operatorUid || source.uid || currentUser?.uid || "").trim();
  if (!operatorUid) throw new Error("El parte no tiene un usuario asociado. Vuelve a iniciar sesion y reintenta.");

  const dateKey = String(source.dateKey || els.partDateInput?.value || todayKey());
  const sourceId = String(source.id || "");
  const id = (!sourceId || sourceId.includes("undefined") || sourceId.includes("null"))
    ? `${operatorUid}_${dateKey}`
    : sourceId;

  return {
    ...source,
    id,
    uid: operatorUid,
    operatorUid,
    operatorName: source.operatorName || currentProfile?.name || currentUser?.email || "Operador",
    dateKey,
    establishment: source.establishment || "LAS CANIAS",
    machine: source.machine || "",
    status: source.status || "active",
    horometers: source.horometers && typeof source.horometers === "object" ? source.horometers : {},
    production: {
      trozo: Number(source.production?.trozo || 0),
      pulpa: Number(source.production?.pulpa || 0)
    },
    createdAtClient: source.createdAtClient || localIso(),
    updatedAtClient: source.updatedAtClient || localIso(),
    syncStatus: source.syncStatus === "synced" ? "synced" : "pending"
  };
}

async function repairPendingPart() {
  if (!currentPart || currentPart.syncStatus === "synced" || !currentUser) return;
  const repaired = normalizePartRecord(currentPart);
  currentPart = repaired;
  await OfflineDB.putPart(repaired);
  await OfflineDB.putOperatorPart(repaired);
  await queueForSync({
    id: `part:${repaired.id}`,
    uid: repaired.operatorUid,
    type: "part-upsert",
    payload: repaired
  });
}

function ensurePart() {
  if (currentPart) {
    currentPart = normalizePartRecord(currentPart);
    return currentPart;
  }
  currentPart = normalizePartRecord({
    id: `${currentUser.uid}_${els.partDateInput.value || todayKey()}`,
    uid: currentUser.uid,
    operatorUid: currentUser.uid,
    operatorName: currentProfile.name,
    dateKey: els.partDateInput.value || todayKey(),
    establishment: "LAS CANIAS",
    machine: "",
    status: "active",
    horometers: {},
    production: { trozo: 0, pulpa: 0 },
    createdAtClient: localIso(),
    updatedAtClient: localIso(),
    syncStatus: "pending"
  });
  return currentPart;
}

function renderPart() {
  els.partDateInput.value = currentPart?.dateKey || todayKey();
  els.establishmentInput.value = currentPart?.establishment || "LAS CANIAS";
  els.machineInput.value = currentPart?.machine || "";
  els.trozoInput.value = currentPart?.production?.trozo ?? "";
  els.pulpaInput.value = currentPart?.production?.pulpa ?? "";
  els.partStatus.textContent = currentPart ? (currentPart.syncStatus === "pending" ? "Pendiente" : "Guardado") : "Borrador";
  els.horometerStages.innerHTML = HOROMETER_CONFIG.map((config, index) => {
    const stage = currentPart?.horometers?.[config.key] || {};
    const evidence = stage.evidence;
    return `<article class="stage-card"><div class="stage-title"><strong>${index + 1}. ${escapeHtml(config.label)}</strong><small>${escapeHtml(config.help)}</small></div><label class="field"><span>Valor</span><input type="number" inputmode="decimal" step="0.1" min="0" data-horometer-value="${config.key}" value="${escapeHtml(stage.value ?? "")}" placeholder="0"></label><div class="stage-actions"><button class="secondary-button" type="button" data-horometer-capture="${config.key}">${evidence ? "Repetir foto" : "Foto y GPS"}</button><span class="stage-status ${evidence ? "ready" : ""}">${evidence ? "Completo" : "Pendiente"}</span></div>${evidence ? `<div class="stage-evidence">${evidence.photoUrl || evidence.photoBlob ? `<img src="${evidence.photoUrl || URL.createObjectURL(evidence.photoBlob)}" alt="${escapeHtml(config.label)}">` : ""}<a href="${mapUrl(evidence.location)}" target="_blank" rel="noopener">Ver ubicacion en mapa</a></div>` : ""}</article>`;
  }).join("");
}

function captureHorometer(key) {
  const part = ensurePart();
  const input = document.querySelector(`[data-horometer-value="${key}"]`);
  const value = input?.value;
  if (!value) { showToast("Falta el horometro", "Ingresa el valor antes de tomar la evidencia.", "error"); return; }
  const config = HOROMETER_CONFIG.find((item) => item.key === key);
  openCapture({ title: config.label, subtitle: "Fotografia y ubicacion obligatorias.", requireGps: true, onConfirm: async (evidence) => {
    part.horometers[key] = { value: Number(value), evidence };
    part.updatedAtClient = localIso();
    part.syncStatus = "pending";
    currentPart = part;
    await OfflineDB.putPart(part);
    renderPart();
  }});
}

async function savePart(event) {
  event.preventDefault();
  const part = ensurePart();
  if (!els.machineInput.value) { showToast("Selecciona la maquina", "La maquina es obligatoria.", "error"); return; }
  document.querySelectorAll("[data-horometer-value]").forEach((input) => {
    if (input.value) {
      const key = input.dataset.horometerValue;
      part.horometers[key] = { ...(part.horometers[key] || {}), value: Number(input.value) };
    }
  });
  part.dateKey = els.partDateInput.value || todayKey();
  part.id = `${currentUser.uid}_${part.dateKey}`;
  part.establishment = els.establishmentInput.value;
  part.machine = els.machineInput.value;
  part.production = { trozo: Number(els.trozoInput.value || 0), pulpa: Number(els.pulpaInput.value || 0) };
  part.updatedAtClient = localIso();
  part.syncStatus = "pending";
  currentPart = normalizePartRecord(part);
  await OfflineDB.putPart(currentPart);
  await OfflineDB.putOperatorPart(currentPart);
  await queueForSync({ id: `part:${currentPart.id}`, uid: currentPart.operatorUid, type: "part-upsert", payload: currentPart });
  showToast("Parte guardado", navigator.onLine ? "Se enviara a Firebase." : "Quedo pendiente de sincronizacion.");
  renderAll();
  await updateSyncUi();
  syncNow(false).catch(console.warn);
}

function populateServiceParts() {
  const selected = els.servicePartSelect.value;
  els.servicePartSelect.innerHTML = '<option value="">Seleccionar parte activo</option>' + operatorParts.map((part) => `<option value="${part.id}">${escapeHtml(part.operatorName || "Operador")} - ${escapeHtml(part.machine || "Sin maquina")}</option>`).join("");
  if (operatorParts.some((part) => part.id === selected)) els.servicePartSelect.value = selected;
}

function populateFuelOperators() {
  const unique = new Map(operatorParts.map((part) => [part.operatorUid, part.operatorName]));
  els.fuelOperator.innerHTML = '<option value="">Sin operador seleccionado</option>' + Array.from(unique.entries()).map(([uid, name]) => `<option value="${uid}">${escapeHtml(name || uid)}</option>`).join("");
}

async function selectServicePart() {
  const partId = els.servicePartSelect.value;
  const part = operatorParts.find((item) => item.id === partId);
  els.serviceMachine.textContent = part?.machine || "-";
  els.serviceOperator.textContent = part?.operatorName || "-";
  if (!part) { currentService = null; renderService(); return; }
  const local = await OfflineDB.getServicesForPart(partId);
  currentService = local.find((item) => item.status === "active") || local[0] || null;
  if (firebaseReady && navigator.onLine && !localSession) {
    const q = sdk.query(sdk.collection(db, "services"), sdk.where("partId", "==", partId));
    const snap = await sdk.getDocs(q);
    for (const item of snap.docs) await OfflineDB.putService({ id: item.id, ...item.data(), syncStatus: "synced" });
    const records = await OfflineDB.getServicesForPart(partId);
    currentService = records.find((item) => item.status === "active") || records[0] || currentService;
  }
  renderService();
}

function evidenceBox(element, evidence, emptyText) {
  if (!evidence) { element.className = "evidence-box empty"; element.textContent = emptyText; return; }
  const source = evidence.photoUrl || (evidence.photoBlob ? URL.createObjectURL(evidence.photoBlob) : "");
  element.className = "evidence-box ready";
  element.innerHTML = `${source ? `<img src="${source}" alt="Evidencia">` : ""}<div><strong>Evidencia registrada</strong><br><a href="${mapUrl(evidence.location)}" target="_blank" rel="noopener">Ver ubicacion</a><br><small>${formatDateTime(evidence.capturedAtClient)}</small></div>`;
}

function renderService() {
  const part = operatorParts.find((item) => item.id === els.servicePartSelect.value);
  if (part) { els.serviceMachine.textContent = part.machine || "-"; els.serviceOperator.textContent = part.operatorName || "-"; }
  const active = currentService?.status === "active";
  els.serviceStatus.textContent = active ? "Servicio en curso" : currentService?.status === "completed" ? "Servicio finalizado" : "Sin servicio activo";
  els.serviceStartedAt.textContent = currentService?.startAtClient ? `Iniciado ${formatDateTime(currentService.startAtClient)}` : "Selecciona un parte para comenzar.";
  els.serviceStartReason.value = currentService?.startReason || "";
  els.serviceEndReason.value = currentService?.endReason || "";
  evidenceBox(els.serviceStartEvidence, currentService?.startEvidence, "Foto y ubicacion pendientes");
  evidenceBox(els.serviceEndEvidence, currentService?.endEvidence, "Foto y ubicacion pendientes");
  els.startServiceButton.disabled = !part || active;
  els.endServiceButton.disabled = !active;
}

async function startService() {
  const part = operatorParts.find((item) => item.id === els.servicePartSelect.value);
  if (!part) { showToast("Selecciona un parte", "Debes elegir el operador y la maquina.", "error"); return; }
  if (!els.serviceStartReason.value.trim()) { showToast("Falta el motivo", "Describe la falla o reparacion.", "error"); return; }
  openCapture({ title: "Inicio de reparacion", subtitle: "Foto y ubicacion obligatorias.", requireGps: true, onConfirm: async (evidence) => {
    const record = { id: uuid(), partId: part.id, operatorUid: part.operatorUid, operatorName: part.operatorName, machine: part.machine, mechanicUid: currentUser.uid, mechanicName: currentProfile.name, status: "active", startReason: els.serviceStartReason.value.trim(), startAtClient: localIso(), startEvidence: evidence, syncStatus: "pending" };
    currentService = record;
    services.unshift(record);
    await OfflineDB.putService(record);
    await queueForSync({ id: `service:${record.id}`, uid: currentUser.uid, type: "service-upsert", payload: record });
    renderAll();
    await updateSyncUi();
    syncNow(false).catch(console.warn);
  }});
}

async function endService() {
  if (!currentService || currentService.status !== "active") return;
  if (!els.serviceEndReason.value.trim()) { showToast("Falta el detalle", "Describe el trabajo realizado.", "error"); return; }
  openCapture({ title: "Finalizacion de reparacion", subtitle: "Foto y ubicacion obligatorias.", requireGps: true, onConfirm: async (evidence) => {
    currentService = { ...currentService, status: "completed", endReason: els.serviceEndReason.value.trim(), endAtClient: localIso(), endEvidence: evidence, syncStatus: "pending" };
    services = services.map((item) => item.id === currentService.id ? currentService : item);
    await OfflineDB.putService(currentService);
    await queueForSync({ id: `service:${currentService.id}`, uid: currentUser.uid, type: "service-upsert", payload: currentService });
    renderAll();
    await updateSyncUi();
    syncNow(false).catch(console.warn);
  }});
}

async function loadFuelSection() {
  if (firebaseReady && navigator.onLine && !localSession && ["mechanic", "admin"].includes(currentProfile?.role)) {
    const tankSnap = await sdk.getDoc(sdk.doc(db, "tanks", "main"));
    if (tankSnap.exists()) { tank = { id: "main", ...tankSnap.data() }; await OfflineDB.putTank(tank); }
    let q;
    if (currentProfile.role === "admin") q = sdk.query(sdk.collection(db, "fuelLoads"), sdk.orderBy("createdAtClient", "desc"), sdk.limit(30));
    else q = sdk.query(sdk.collection(db, "fuelLoads"), sdk.where("uid", "==", currentUser.uid));
    const snap = await sdk.getDocs(q);
    for (const item of snap.docs) await OfflineDB.putFuelLoad({ id: item.id, ...item.data(), syncStatus: "synced" });
    fuelLoads = currentProfile.role === "admin" ? await OfflineDB.getAllFuelLoads() : await OfflineDB.getFuelLoads(currentUser.uid);
  }
  renderTank();
  renderFuelRecent();
}

function renderTank() {
  const capacity = Number(tank?.capacityLiters || 0);
  const current = Number(tank?.currentLiters || 0);
  const percent = capacity > 0 ? Math.max(0, Math.min(100, current / capacity * 100)) : 0;
  els.tankPercent.textContent = `${percent.toFixed(1).replace(".", ",")}%`;
  els.tankProgress.style.width = `${percent}%`;
  els.tankCapacity.textContent = liters(capacity);
  els.tankCurrent.textContent = liters(current);
  els.tankUpdated.textContent = tank?.updatedAtClient ? `Ultima actualizacion: ${formatDateTime(tank.updatedAtClient)}` : "Sin datos del tanque.";
}

function renderFuelRecent() {
  const rows = fuelLoads.slice(0, 8).map((record) => `
    <tr>
      <td>${formatDate(record.createdAtClient)}<br><small>${formatTime(record.createdAtClient)}</small></td>
      <td>${escapeHtml(record.machine || "-")}</td>
      <td><strong>${liters(record.liters)}</strong></td>
      <td>${record.shift === "night" ? "Nocturna" : "Diurna"}</td>
      <td>${escapeHtml(record.operatorName || record.userName || "-")}</td>
    </tr>`).join("");
  els.fuelRecentList.innerHTML = `
    <div class="fuel-table-wrap">
      <table class="fuel-table">
        <thead><tr><th>Fecha</th><th>Maquina</th><th>Litros</th><th>Turno</th><th>Operador</th></tr></thead>
        <tbody>${rows || '<tr><td class="empty-cell" colspan="5">Sin cargas registradas.</td></tr>'}</tbody>
      </table>
    </div>`;
}

function captureFuelPhoto() {
  openCapture({ title: "Foto de la carga", subtitle: "La fotografia es obligatoria. No se requiere GPS.", requireGps: false, onConfirm: async (evidence) => { fuelPhoto = evidence; evidenceBox(els.fuelPhotoEvidence, evidence, "Foto obligatoria pendiente"); }});
}

async function saveFuelLoad(event) {
  event.preventDefault();
  if (!fuelPhoto) { showToast("Falta la foto", "Debes tomar una foto de la carga.", "error"); return; }
  const litersValue = Number(els.fuelLiters.value || 0);
  if (!els.fuelMachine.value || litersValue <= 0) { showToast("Datos incompletos", "Selecciona la maquina e ingresa los litros.", "error"); return; }
  if (Number(tank.currentLiters || 0) > 0 && litersValue > Number(tank.currentLiters || 0)) { showToast("Stock insuficiente", "Los litros superan el disponible del tanque principal.", "error"); return; }
  const operatorOption = els.fuelOperator.selectedOptions[0];
  const record = { id: uuid(), uid: currentUser.uid, userName: currentProfile.name, machine: els.fuelMachine.value, operatorUid: els.fuelOperator.value || "", operatorName: els.fuelOperator.value ? operatorOption.textContent : "", liters: litersValue, shift: document.querySelector('input[name="fuelShift"]:checked')?.value || "day", photoEvidence: fuelPhoto, createdAtClient: localIso(), syncStatus: "pending" };
  fuelLoads.unshift(record);
  await OfflineDB.putFuelLoad(record);
  tank = { ...tank, currentLiters: Math.max(0, Number(tank.currentLiters || 0) - litersValue), updatedAtClient: localIso(), localEstimate: true };
  await OfflineDB.putTank(tank);
  await queueForSync({ id: `fuel:${record.id}`, uid: currentUser.uid, type: "fuel-load", payload: record });
  fuelPhoto = null;
  els.fuelForm.reset();
  evidenceBox(els.fuelPhotoEvidence, null, "Foto obligatoria pendiente");
  renderAll();
  await updateSyncUi();
  showToast("Carga guardada", navigator.onLine ? "Se enviara a Firebase." : "Quedo pendiente de sincronizacion.");
  syncNow(false).catch(console.warn);
}

function openTankModal() {
  els.tankCapacityInput.value = Number(tank.capacityLiters || 0) || "";
  els.tankCurrentInput.value = Number(tank.currentLiters || 0) || "";
  els.tankModal.classList.remove("hidden");
}

async function saveTank() {
  const capacity = Number(els.tankCapacityInput.value || 0);
  const current = Number(els.tankCurrentInput.value || 0);
  if (capacity <= 0 || current < 0 || current > capacity) { showToast("Valores invalidos", "El disponible debe estar entre 0 y la capacidad total.", "error"); return; }
  tank = { id: "main", capacityLiters: capacity, currentLiters: current, updatedAtClient: localIso(), updatedBy: currentUser.uid, syncStatus: "pending" };
  await OfflineDB.putTank(tank);
  await queueForSync({ id: "tank:main", uid: currentUser.uid, type: "tank-update", payload: tank });
  els.tankModal.classList.add("hidden");
  renderTank();
  await updateSyncUi();
  syncNow(false).catch(console.warn);
}

async function loadUsers() {
  if (currentProfile?.role !== "admin") return;
  if (!firebaseReady || !navigator.onLine || localSession) { els.usersList.innerHTML = '<div class="empty-state">La administracion de usuarios requiere Internet.</div>'; return; }
  const snap = await sdk.getDocs(sdk.collection(db, "users"));
  els.usersList.innerHTML = snap.docs.map((item) => {
    const data = item.data();
    return `<div class="user-row"><div><strong>${escapeHtml(data.name || "Usuario")}</strong><span>${escapeHtml(data.email || "")}</span></div><select id="role-${item.id}"><option value="operator" ${data.role === "operator" ? "selected" : ""}>Operador</option><option value="mechanic" ${data.role === "mechanic" ? "selected" : ""}>Mecanico</option><option value="admin" ${data.role === "admin" ? "selected" : ""}>Administrador</option></select><button class="primary-button" type="button" data-save-role="${item.id}">Guardar</button></div>`;
  }).join("") || '<div class="empty-state">Sin usuarios.</div>';
}

async function saveUserRole(uid) {
  if (currentProfile?.role !== "admin") return;
  const select = document.getElementById(`role-${uid}`);
  try { await sdk.updateDoc(sdk.doc(db, "users", uid), { role: select.value, updatedAt: sdk.serverTimestamp(), updatedAtClient: localIso() }); showToast("Rol actualizado", "El usuario recibira el nuevo permiso en su proximo ingreso."); }
  catch (error) { showToast("No se pudo guardar", friendlyError(error), "error"); }
}

function openCapture({ title, subtitle, requireGps, onConfirm }) {
  captureContext = { requireGps, onConfirm };
  captureBlob = null;
  captureLocation = null;
  if (captureObjectUrl) URL.revokeObjectURL(captureObjectUrl);
  captureObjectUrl = null;
  els.captureTitle.textContent = title;
  els.captureSubtitle.textContent = subtitle;
  els.capturePreview.innerHTML = "<span>Sin foto</span>";
  els.captureFileInput.value = "";
  els.captureGpsCard.classList.toggle("hidden", !requireGps);
  els.captureGpsStatus.textContent = requireGps ? "Ubicacion pendiente" : "No requerida";
  els.captureMapLink.classList.add("hidden");
  els.confirmCaptureButton.disabled = true;
  els.captureModal.classList.remove("hidden");
  if (requireGps) acquireGps();
}

function closeCapture() {
  els.captureModal.classList.add("hidden");
  if (captureObjectUrl) URL.revokeObjectURL(captureObjectUrl);
  captureObjectUrl = null;
  captureContext = null;
  captureBlob = null;
  captureLocation = null;
}

async function compressImage(file, maxDimension = 1600, quality = 0.82) {
  if (!file || !file.type.startsWith("image/")) return file;
  try {
    const bitmap = await createImageBitmap(file);
    const scale = Math.min(1, maxDimension / Math.max(bitmap.width, bitmap.height));
    const width = Math.max(1, Math.round(bitmap.width * scale));
    const height = Math.max(1, Math.round(bitmap.height * scale));
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext("2d", { alpha: false });
    context.drawImage(bitmap, 0, 0, width, height);
    bitmap.close?.();
    const blob = await new Promise((resolve) => canvas.toBlob(resolve, "image/jpeg", quality));
    return blob || file;
  } catch (error) {
    console.warn("Compresion de imagen", error);
    return file;
  }
}

async function handleCaptureFile(event) {
  const file = event.target.files?.[0];
  if (!file) return;
  if (!file.type.startsWith("image/")) { showToast("Archivo invalido", "Selecciona una imagen.", "error"); return; }
  els.confirmCaptureButton.disabled = true;
  els.capturePreview.innerHTML = "<span>Preparando foto...</span>";
  captureBlob = await compressImage(file);
  if (captureObjectUrl) URL.revokeObjectURL(captureObjectUrl);
  captureObjectUrl = URL.createObjectURL(captureBlob);
  els.capturePreview.innerHTML = `<img src="${captureObjectUrl}" alt="Vista previa">`;
  updateCaptureConfirm();
}

function acquireGps() {
  if (!navigator.geolocation) { els.captureGpsStatus.textContent = "GPS no disponible"; return; }
  els.captureGpsButton.disabled = true;
  els.captureGpsStatus.textContent = "Buscando ubicacion...";
  navigator.geolocation.getCurrentPosition((position) => {
    captureLocation = { latitude: position.coords.latitude, longitude: position.coords.longitude, accuracy: position.coords.accuracy, capturedAtClient: localIso() };
    els.captureGpsStatus.textContent = `Ubicacion obtenida. Precision aproximada: ${Math.round(position.coords.accuracy)} m`;
    els.captureMapLink.href = mapUrl(captureLocation);
    els.captureMapLink.classList.remove("hidden");
    els.captureGpsButton.disabled = false;
    updateCaptureConfirm();
  }, (error) => {
    els.captureGpsStatus.textContent = error.code === 1 ? "Permiso de ubicacion rechazado." : "No se pudo obtener la ubicacion.";
    els.captureGpsButton.disabled = false;
    updateCaptureConfirm();
  }, { enableHighAccuracy: true, timeout: 20000, maximumAge: 0 });
}

function updateCaptureConfirm() { els.confirmCaptureButton.disabled = !captureBlob || (captureContext?.requireGps && !captureLocation); }
async function confirmCapture() {
  if (!captureContext || !captureBlob || (captureContext.requireGps && !captureLocation)) return;
  const context = captureContext;
  const evidence = { photoBlob: captureBlob, location: captureLocation, capturedAtClient: localIso() };
  closeCapture();
  await context.onConfirm(evidence);
}

async function syncNow(manual) {
  if (syncRunning || !currentUser) return;
  if (!navigator.onLine) {
    if (manual) showToast("Sin conexion", "Los registros permanecen guardados en el dispositivo.", "error");
    return;
  }

  try {
    await importFirebase();
    if (!auth?.currentUser || auth.currentUser.uid !== currentUser.uid || localSession) {
      const restored = await waitForAuthUser();
      if (restored?.uid === currentUser.uid) {
        currentUser = restored;
        localSession = false;
        currentProfile = await resolveProfile(restored);
        applyProfile();
        applyRoleVisibility();
      }
    }

    if (!auth?.currentUser || auth.currentUser.uid !== currentUser.uid || localSession) {
      updateConnection();
      if (manual) showToast("Falta validar la sesion", "Bloquea la aplicacion e ingresa con correo y contrasena. Los datos no se perderan.", "error");
      return;
    }

    await sdk.getIdToken(auth.currentUser, true).catch(() => {});
    const pending = await OfflineDB.countPending(currentUser.uid);
    if (!pending) {
      lastSyncError = "";
      await updateSyncUi();
      if (manual) showToast("Todo sincronizado", "No hay registros pendientes.");
      return;
    }

    syncRunning = true;
    lastSyncError = "";
    const result = await LubaydSyncQueue.process({ uid: currentUser.uid, adapter: processSyncItem, onChange: updateSyncUi });
    if (result.processed) showToast("Sincronizacion completada", `${result.processed} registro${result.processed === 1 ? "" : "s"} enviado${result.processed === 1 ? "" : "s"}.`);
    if (result.failed) {
      lastSyncError = result.errors?.[0]?.message || "No se pudieron enviar algunos registros.";
      showToast("Quedaron pendientes", lastSyncError, "error");
      scheduleSyncRetry(true);
    } else {
      await refreshServerData();
    }
  } catch (error) {
    lastSyncError = friendlyError(error);
    showToast("Error de sincronizacion", lastSyncError, "error");
    scheduleSyncRetry(true);
  } finally {
    syncRunning = false;
    updateConnection();
    await updateSyncUi({ lastError: lastSyncError });
  }
}

async function uploadEvidence(evidence, path) {
  if (!evidence) return null;
  let photoUrl = evidence.photoUrl || "";
  if (!photoUrl && evidence.photoBlob) {
    const ref = sdk.storageRef(storage, path);
    const snap = await sdk.uploadBytes(ref, evidence.photoBlob, { contentType: evidence.photoBlob.type || "image/jpeg" });
    photoUrl = await sdk.getDownloadURL(snap.ref);
  }
  return { photoUrl, location: evidence.location || null, capturedAtClient: evidence.capturedAtClient || localIso() };
}

function cleanRecord(value) {
  if (value instanceof Blob) return undefined;
  if (Array.isArray(value)) return value.map(cleanRecord).filter((item) => item !== undefined);
  if (value && typeof value === "object") {
    const result = {};
    Object.entries(value).forEach(([key, item]) => { const cleaned = cleanRecord(item); if (cleaned !== undefined) result[key] = cleaned; });
    return result;
  }
  return value;
}

async function processSyncItem(item) {
  if (item.type === "break-upsert") {
    const record = { ...item.payload };
    record.startEvidence = await uploadEvidence(record.startEvidence, `breaks/${record.uid}/${record.id}/start.jpg`);
    record.endEvidence = await uploadEvidence(record.endEvidence, `breaks/${record.uid}/${record.id}/end.jpg`);
    const remote = { ...cleanRecord(record), syncStatus: "synced", syncedAt: sdk.serverTimestamp() };
    await sdk.setDoc(sdk.doc(db, "users", record.uid, "breaks", record.id), remote, { merge: true });
    await OfflineDB.putBreak({ ...record, syncStatus: "synced" });
    return;
  }
  if (item.type === "part-upsert") {
    let record = typeof structuredClone === "function" ? structuredClone(item.payload) : { ...item.payload };
    record = normalizePartRecord(record);

    if (record.operatorUid !== currentUser?.uid && currentProfile?.role !== "admin") {
      throw new Error("El parte pertenece a otro usuario y no puede sincronizarse desde esta sesion.");
    }

    for (const config of HOROMETER_CONFIG) {
      const stage = record.horometers?.[config.key];
      if (stage?.evidence) {
        stage.evidence = await uploadEvidence(
          stage.evidence,
          `parts/${record.operatorUid}/${record.id}/${config.key}.jpg`
        );
        item.payload = record;
        await OfflineDB.updateQueue(item);
      }
    }

    const remote = { ...cleanRecord(record), syncStatus: "synced", syncedAt: sdk.serverTimestamp() };
    const batch = sdk.writeBatch(db);
    batch.set(sdk.doc(db, "operationalParts", record.id), remote, { merge: true });
    batch.set(sdk.doc(db, "users", record.operatorUid, "parts", record.id), remote, { merge: true });
    await batch.commit();

    const syncedRecord = { ...record, syncStatus: "synced" };
    await OfflineDB.putPart(syncedRecord);
    await OfflineDB.putOperatorPart(syncedRecord);
    if (currentPart?.id === syncedRecord.id) currentPart = syncedRecord;
    operatorParts = operatorParts.filter((part) => part.id !== syncedRecord.id).concat(syncedRecord);
    renderPart();
    renderDashboard();
    renderActivity();
    return;
  }
  if (item.type === "service-upsert") {
    const record = { ...item.payload };
    record.startEvidence = await uploadEvidence(record.startEvidence, `services/${record.mechanicUid}/${record.id}/start.jpg`);
    record.endEvidence = await uploadEvidence(record.endEvidence, `services/${record.mechanicUid}/${record.id}/end.jpg`);
    const remote = { ...cleanRecord(record), syncStatus: "synced", syncedAt: sdk.serverTimestamp() };
    await sdk.setDoc(sdk.doc(db, "services", record.id), remote, { merge: true });
    await sdk.setDoc(sdk.doc(db, "operationalParts", record.partId, "services", record.id), remote, { merge: true });
    await OfflineDB.putService({ ...record, syncStatus: "synced" });
    return;
  }
  if (item.type === "fuel-load") {
    const record = { ...item.payload };
    record.photoEvidence = await uploadEvidence(record.photoEvidence, `fuel/${record.uid}/${record.id}/load.jpg`);
    const loadRef = sdk.doc(db, "fuelLoads", record.id);
    const tankRef = sdk.doc(db, "tanks", "main");
    await sdk.runTransaction(db, async (transaction) => {
      const existing = await transaction.get(loadRef);
      if (existing.exists()) return;
      const tankSnap = await transaction.get(tankRef);
      if (!tankSnap.exists()) throw new Error("El administrador debe configurar el tanque principal antes de sincronizar cargas.");
      const currentTank = tankSnap.data();
      const available = Number(currentTank.currentLiters || 0);
      const requested = Number(record.liters || 0);
      if (requested > available) throw new Error("La carga supera los litros disponibles en el tanque principal.");
      const nextLiters = available - requested;
      transaction.set(loadRef, { ...cleanRecord(record), syncStatus: "synced", syncedAt: sdk.serverTimestamp() });
      transaction.set(tankRef, { ...currentTank, currentLiters: nextLiters, updatedAtClient: localIso(), updatedBy: record.uid, updatedAt: sdk.serverTimestamp() }, { merge: true });
    });
    await OfflineDB.putFuelLoad({ ...record, syncStatus: "synced" });
    return;
  }
  if (item.type === "tank-update") {
    const record = item.payload;
    await sdk.setDoc(sdk.doc(db, "tanks", "main"), { ...cleanRecord(record), syncStatus: "synced", updatedAt: sdk.serverTimestamp() }, { merge: true });
    await OfflineDB.putTank({ ...record, syncStatus: "synced" });
  }
}

boot().catch((error) => {
  console.error("Inicio", error);
  reveal("auth");
  showAuthMessage("No se pudo iniciar la aplicacion. Actualiza la pagina.");
});
