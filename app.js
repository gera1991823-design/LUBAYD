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
  offlineLoginPanel: $("#offlineLoginPanel"), offlineUserAvatar: $("#offlineUserAvatar"), offlineUserName: $("#offlineUserName"), offlineUserEmail: $("#offlineUserEmail"), offlineLoginHint: $("#offlineLoginHint"), offlinePinInput: $("#offlinePinInput"), offlineLoginButton: $("#offlineLoginButton"),
  sidebar: $("#sidebar"), menuButton: $("#menuButton"), pageTitle: $("#pageTitle"), userAvatar: $("#userAvatar"), userName: $("#userName"), userEmail: $("#userEmail"), userRoleBadge: $("#userRoleBadge"),
  sidebarProfileButton: $("#sidebarProfileButton"), sidebarProfileImage: $("#sidebarProfileImage"), topbarProfileButton: $("#topbarProfileButton"), topbarProfileImage: $("#topbarProfileImage"), topbarProfileFallback: $("#topbarProfileFallback"), dashboardProfileButton: $("#dashboardProfileButton"), dashboardProfileImage: $("#dashboardProfileImage"), mobileProfileButton: $("#mobileProfileButton"), mobileProfileImage: $("#mobileProfileImage"), mobileProfileFallback: $("#mobileProfileFallback"), profilePhotoInput: $("#profilePhotoInput"), topLogoutButton: $("#topLogoutButton"), mobileLogoutButton: $("#mobileLogoutButton"),
  connectionDot: $("#connectionDot"), connectionText: $("#connectionText"), syncText: $("#syncText"), pendingCount: $("#pendingCount"), syncButton: $("#syncButton"), lockButton: $("#lockButton"),
  topSyncButton: $("#topSyncButton"), topConnectionDot: $("#topConnectionDot"), topConnectionText: $("#topConnectionText"), topSyncText: $("#topSyncText"), topPendingCount: $("#topPendingCount"),
  liveDate: $("#liveDate"), liveClock: $("#liveClock"), dashboardClock: $("#dashboardClock"), dashboardAvatar: $("#dashboardAvatar"), dashboardGreeting: $("#dashboardGreeting"), dashboardRole: $("#dashboardRole"), dashboardConnection: $("#dashboardConnection"), offlineBanner: $("#offlineBanner"), dashboardCards: $("#dashboardCards"), recentActivity: $("#recentActivity"), upcomingBreaks: $("#upcomingBreaks"), topbarRoleName: $("#topbarRoleName"), mobileGreeting: $("#mobileGreeting"), mobileDate: $("#mobileDate"), mobileSyncButton: $("#mobileSyncButton"), mobilePendingCount: $("#mobilePendingCount"), mobileMoreButton: $("#mobileMoreButton"), metricJourneys: $("#metricJourneys"), metricServices: $("#metricServices"), metricFuel: $("#metricFuel"), metricHours: $("#metricHours"), dashboardTankGauge: $("#dashboardTankGauge"), dashboardTankPercent: $("#dashboardTankPercent"), dashboardTankRatio: $("#dashboardTankRatio"), dashboardTankCapacity: $("#dashboardTankCapacity"), dashboardTankVolume: $("#dashboardTankVolume"), dashboardTankProgress: $("#dashboardTankProgress"), dashboardFuelChart: $("#dashboardFuelChart"), dashboardFleetChart: $("#dashboardFleetChart"), metricFuelTrend: $("#metricFuelTrend"), metricHoursTrend: $("#metricHoursTrend"), flowTankStart: $("#flowTankStart"), flowLoadedToday: $("#flowLoadedToday"), flowTankBalance: $("#flowTankBalance"),
  breakBadge: $("#breakBadge"), breakTitle: $("#breakTitle"), breakTimer: $("#breakTimer"), breakDescription: $("#breakDescription"), startBreakButton: $("#startBreakButton"), endBreakButton: $("#endBreakButton"), breakRecentList: $("#breakRecentList"),
  partForm: $("#partForm"), partStatus: $("#partStatus"), newPartButton: $("#newPartButton"), partSessionSelect: $("#partSessionSelect"), partSessionInfo: $("#partSessionInfo"), establishmentInput: $("#establishmentInput"), machineInput: $("#machineInput"), partDateInput: $("#partDateInput"), horometerStages: $("#horometerStages"), trozoInput: $("#trozoInput"), pulpaInput: $("#pulpaInput"), savePartButton: $("#savePartButton"),
  adminPartsPanel: $("#adminPartsPanel"), adminPartsList: $("#adminPartsList"), adminPartsCount: $("#adminPartsCount"), adminPartsStatus: $("#adminPartsStatus"), refreshAdminPartsButton: $("#refreshAdminPartsButton"), adminPartsSearch: $("#adminPartsSearch"), adminPartsDateFilter: $("#adminPartsDateFilter"), adminPartsOperatorFilter: $("#adminPartsOperatorFilter"),
  adminBreaksPanel: $("#adminBreaksPanel"), adminBreaksList: $("#adminBreaksList"), adminBreaksCount: $("#adminBreaksCount"), adminBreaksStatus: $("#adminBreaksStatus"), refreshAdminBreaksButton: $("#refreshAdminBreaksButton"), adminBreaksSearch: $("#adminBreaksSearch"), adminBreaksDateFilter: $("#adminBreaksDateFilter"), adminBreaksOperatorFilter: $("#adminBreaksOperatorFilter"), adminBreaksStatusFilter: $("#adminBreaksStatusFilter"),
  adminServicesPanel: $("#adminServicesPanel"), adminServicesList: $("#adminServicesList"), adminServicesCount: $("#adminServicesCount"), adminServicesStatus: $("#adminServicesStatus"), refreshAdminServicesButton: $("#refreshAdminServicesButton"), adminServicesSearch: $("#adminServicesSearch"), adminServicesDateFilter: $("#adminServicesDateFilter"), adminServicesOperatorFilter: $("#adminServicesOperatorFilter"), adminServicesMechanicFilter: $("#adminServicesMechanicFilter"), adminServicesMachineFilter: $("#adminServicesMachineFilter"), adminServicesStatusFilter: $("#adminServicesStatusFilter"),
  servicePartSelect: $("#servicePartSelect"), serviceMachine: $("#serviceMachine"), serviceOperator: $("#serviceOperator"), serviceTimer: $("#serviceTimer"), serviceStatus: $("#serviceStatus"), serviceStartedAt: $("#serviceStartedAt"), serviceStartReason: $("#serviceStartReason"), serviceEndReason: $("#serviceEndReason"), serviceStartEvidence: $("#serviceStartEvidence"), serviceEndEvidence: $("#serviceEndEvidence"), newServiceButton: $("#newServiceButton"), serviceSessionCount: $("#serviceSessionCount"), serviceSessionList: $("#serviceSessionList"), startServiceButton: $("#startServiceButton"), endServiceButton: $("#endServiceButton"),
  tankPercent: $("#tankPercent"), tankProgress: $("#tankProgress"), tankCapacity: $("#tankCapacity"), tankCurrent: $("#tankCurrent"), tankUpdated: $("#tankUpdated"), editTankButton: $("#editTankButton"), fuelRecentList: $("#fuelRecentList"), fuelForm: $("#fuelForm"), fuelMachine: $("#fuelMachine"), fuelOperator: $("#fuelOperator"), fuelLiters: $("#fuelLiters"), fuelPhotoEvidence: $("#fuelPhotoEvidence"), captureFuelPhotoButton: $("#captureFuelPhotoButton"), saveFuelButton: $("#saveFuelButton"),
  activityList: $("#activityList"), operatorActivityTabs: $("#operatorActivityTabs"), operatorPartsActivity: $("#operatorPartsActivity"), operatorBreaksActivity: $("#operatorBreaksActivity"), generalActivityList: $("#generalActivityList"), activityDateFilter: $("#activityDateFilter"), usersList: $("#usersList"),
  adminActivityControls: $("#adminActivityControls"), adminActivityType: $("#adminActivityType"), adminActivityPerson: $("#adminActivityPerson"), adminActivityDate: $("#adminActivityDate"), adminActivitySearch: $("#adminActivitySearch"), adminActivityRefresh: $("#adminActivityRefresh"), adminActivityTotal: $("#adminActivityTotal"), adminActivityParts: $("#adminActivityParts"), adminActivityBreaks: $("#adminActivityBreaks"), adminActivityServices: $("#adminActivityServices"), adminActivityFuel: $("#adminActivityFuel"),
  cleanupParts: $("#cleanupParts"), cleanupServices: $("#cleanupServices"), cleanupFuel: $("#cleanupFuel"), cleanupTank: $("#cleanupTank"), cleanupConfirmInput: $("#cleanupConfirmInput"), cleanupDataButton: $("#cleanupDataButton"),
  chatMessages: $("#chatMessages"), chatForm: $("#chatForm"), chatInput: $("#chatInput"), chatSendButton: $("#chatSendButton"), chatStatusText: $("#chatStatusText"), chatConnectionBadge: $("#chatConnectionBadge"), directChatShell: $("#directChatShell"), chatUserSearch: $("#chatUserSearch"), chatContactList: $("#chatContactList"), chatDirectoryStatus: $("#chatDirectoryStatus"), chatUnreadTotal: $("#chatUnreadTotal"), chatBackButton: $("#chatBackButton"), chatRecipientAvatar: $("#chatRecipientAvatar"), chatRecipientName: $("#chatRecipientName"), chatRecipientMeta: $("#chatRecipientMeta"),
  reportsConnectionBadge: $("#reportsConnectionBadge"), refreshReportsButton: $("#refreshReportsButton"), reportDateFrom: $("#reportDateFrom"), reportDateTo: $("#reportDateTo"), reportOperator: $("#reportOperator"), reportMachine: $("#reportMachine"), reportShift: $("#reportShift"), applyReportsButton: $("#applyReportsButton"), clearReportsButton: $("#clearReportsButton"), reportsLastUpdated: $("#reportsLastUpdated"),
  reportFuelTotal: $("#reportFuelTotal"), reportFuelDetail: $("#reportFuelDetail"), reportServiceHours: $("#reportServiceHours"), reportServiceDetail: $("#reportServiceDetail"), reportMachineCount: $("#reportMachineCount"), reportDominantShift: $("#reportDominantShift"), fuelByShiftChart: $("#fuelByShiftChart"), reportSummaryChart: $("#reportSummaryChart"), breaksByDayChart: $("#breaksByDayChart"), breaksByOperatorChart: $("#breaksByOperatorChart"), fuelByDayChart: $("#fuelByDayChart"), fuelByOperatorChart: $("#fuelByOperatorChart"), fuelByMachineChart: $("#fuelByMachineChart"), serviceByMachineChart: $("#serviceByMachineChart"), reportServiceTable: $("#reportServiceTable"), reportServiceTableCount: $("#reportServiceTableCount"),
  captureModal: $("#captureModal"), captureTitle: $("#captureTitle"), captureSubtitle: $("#captureSubtitle"), capturePreview: $("#capturePreview"), captureFileInput: $("#captureFileInput"), captureGpsCard: $("#captureGpsCard"), captureGpsStatus: $("#captureGpsStatus"), captureGpsButton: $("#captureGpsButton"), captureMapLink: $("#captureMapLink"), confirmCaptureButton: $("#confirmCaptureButton"),
  pinModal: $("#pinModal"), pinInput: $("#pinInput"), pinConfirm: $("#pinConfirm"), pinError: $("#pinError"), savePinButton: $("#savePinButton"), skipPinButton: $("#skipPinButton"),
  tankModal: $("#tankModal"), tankCapacityInput: $("#tankCapacityInput"), tankCurrentInput: $("#tankCurrentInput"), saveTankButton: $("#saveTankButton"),
  processingOverlay: $("#processingOverlay"), processingTitle: $("#processingTitle"), processingMessage: $("#processingMessage"), toastRegion: $("#toastRegion")
};

const SECTION_TITLES = { dashboard: "Inicio", break: "Descansos", part: "Partes", service: "Servicios", fuel: "Combustible", activity: "Actividad", chat: "Chat", reports: "Reportes", users: "Usuarios" };
const ROLE_LABELS = { operator: "Operador", mechanic: "Mecanico", admin: "Administrador" };
const ROLE_SECTIONS = {
  operator: ["dashboard", "break", "part", "activity", "chat"],
  mechanic: ["dashboard", "service", "fuel", "activity", "chat"],
  admin: ["dashboard", "part", "service", "break", "reports", "users", "chat"]
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
let userParts = [];
let partDraftDate = todayKey();
let operatorParts = [];
let currentService = null;
let services = [];
let selectedPartServices = [];
let serviceDraftMode = false;
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
let chatMessages = [];
let chatUsers = [];
let selectedChatUserUid = "";
let chatDirectoryLoading = false;
let chatUnsubscribe = null;
let partsUnsubscribe = null;
let legacyAdminParts = [];
let adminPartsLoading = false;
let chatInitialLoadDone = false;
let reportUsers = [];
let reportParts = [];
let reportBreaks = [];
let reportFuelLoads = [];
let reportServices = [];
let reportLoadedAt = null;
let reportLoading = false;
let adminRecordUnsubscribers = [];
let adminProfiles = new Map();
let operatorActivityTab = "parts";
const REPORT_CACHE_KEY = "lubayd-admin-reports-v1";
const CHAT_DIRECTORY_KEY = "lubayd-direct-chat-directory-v1";
const CHAT_SELECTED_KEY_PREFIX = "lubayd-direct-chat-selected-v1";
const DATA_RESET_SETTING_KEY = "lastAppliedOperationalResetAt";
let profilePhotoTargetUid = "";

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);
}

function iconSvg(name, className = "ui-icon") {
  return `<svg class="${className}" aria-hidden="true"><use href="#icon-${name}"></use></svg>`;
}
function uuid() { return crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(16).slice(2)}`; }
function todayKey() { return new Date().toISOString().slice(0, 10); }
function machineKey(value) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
function makePartId(uid, dateKey, machine) {
  const key = machineKey(machine);
  if (!uid || !dateKey || !key) return "";
  return `${uid}_${dateKey}_${key}`;
}
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
  els.offlineLoginPanel.classList.remove("hidden");
  els.offlineLoginPanel.classList.toggle("unavailable", !available);
  els.offlinePinInput.disabled = !available;
  els.offlineLoginButton.disabled = !available;
  els.offlineLoginHint.textContent = available
    ? "Usa el PIN configurado en este dispositivo."
    : "Primero ingresa una vez con Internet y configura tu PIN de 6 numeros.";
  els.offlineUserName.textContent = available ? (lastOfflineProfile.name || "Usuario") : "Dispositivo no configurado";
  els.offlineUserEmail.textContent = available ? (lastOfflineProfile.email || "") : "El acceso offline se habilita luego del primer ingreso";
  els.offlineUserAvatar.textContent = available ? initials(lastOfflineProfile.name || lastOfflineProfile.email) : "—";
  if (!available) els.offlinePinInput.value = "";
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
  let photoURL = cached?.photoURL || user.photoURL || "";
  let active = cached?.active !== false;
  if (navigator.onLine && db) {
    const ref = sdk.doc(db, "users", user.uid);
    const snap = await sdk.getDoc(ref);
    if (snap.exists()) {
      const data = snap.data();
      role = data.role || role;
      name = data.name || name;
      photoURL = data.photoURL || photoURL;
      active = data.active !== false;
    } else {
      await sdk.setDoc(ref, { uid: user.uid, name, email: user.email || "", role: "operator", active: true, photoURL: "", createdAt: sdk.serverTimestamp(), createdAtClient: localIso() }, { merge: true });
      role = "operator";
    }
  }
  const profile = await OfflineDB.saveProfile({ ...(cached || {}), uid: user.uid, name, email: user.email || "", role, active, photoURL, locked: false, lastLoginAt: Date.now() });
  lastOfflineProfile = profile;
  return profile;
}

async function enterApplication(user, profile, offline) {
  stopChatSubscription();
  chatUsers = [];
  selectedChatUserUid = "";
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

function setProfilePhoto(imageElement, fallbackElement, photoURL, name) {
  if (!imageElement || !fallbackElement) return;
  fallbackElement.textContent = initials(name);
  if (photoURL) {
    imageElement.src = photoURL;
    imageElement.classList.remove("hidden");
    fallbackElement.classList.add("hidden");
  } else {
    imageElement.removeAttribute("src");
    imageElement.classList.add("hidden");
    fallbackElement.classList.remove("hidden");
  }
}

function applyProfile() {
  const name = currentProfile?.name || currentUser?.displayName || "Usuario";
  const email = currentProfile?.email || currentUser?.email || "";
  const role = currentProfile?.role || "operator";
  const photoURL = currentProfile?.photoURL || currentUser?.photoURL || "";
  document.body.dataset.role = role;
  els.userAvatar.textContent = initials(name);
  els.userName.textContent = name;
  els.userEmail.textContent = email;
  els.userRoleBadge.textContent = roleLabel(role);
  setProfilePhoto(els.sidebarProfileImage, els.userAvatar, photoURL, name);
  setProfilePhoto(els.topbarProfileImage, els.topbarProfileFallback, photoURL, name);
  setProfilePhoto(els.dashboardProfileImage, els.dashboardAvatar, photoURL, name);
  setProfilePhoto(els.mobileProfileImage, els.mobileProfileFallback, photoURL, name);
  const firstName = String(name || "Usuario").trim().split(/\s+/)[0];
  els.dashboardGreeting.textContent = `¡Hola, ${firstName}!`;
  els.dashboardRole.textContent = roleLabel(role);
  if (els.topbarRoleName) els.topbarRoleName.textContent = roleLabel(role);
  if (els.mobileGreeting) els.mobileGreeting.textContent = `Hola, ${firstName}`;
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
  $$(".content-section").forEach((node) => {
    const isActive = node.id === `${section}Section`;
    node.classList.toggle("active", isActive);
    if (isActive) {
      node.classList.remove("section-enter");
      void node.offsetWidth;
      node.classList.add("section-enter");
    }
  });
  $$('[data-section]').forEach((node) => node.classList.toggle("active", node.dataset.section === section));
  els.pageTitle.textContent = SECTION_TITLES[section] || "Inicio";
  els.sidebar.classList.remove("open");
  if (section === "part") {
    if (currentProfile?.role === "admin") {
      renderAdminParts();
      loadOperatorParts(true).catch((error) => {
        setAdminPartsStatus(`No se pudieron actualizar los Partes: ${friendlyError(error)}`, true);
        showToast("Error al cargar Partes", friendlyError(error), "error");
      });
    } else renderPart();
  }
  if (section === "break") {
    if (currentProfile?.role === "admin") {
      renderAdminBreaks();
      loadBreaksFromServer().then(renderAdminBreaks).catch((error) => setAdminBreaksStatus(`No se pudieron actualizar los descansos: ${friendlyError(error)}`, true));
    } else renderBreak();
  }
  if (section === "service") {
    if (currentProfile?.role === "admin") {
      renderAdminServices();
      loadServicesFromServer().then(renderAdminServices).catch((error) => setAdminServicesStatus(`No se pudieron actualizar los servicios: ${friendlyError(error)}`, true));
    } else loadOperatorParts().catch(console.warn);
  }
  if (section === "fuel") loadFuelSection().catch(console.warn);
  if (section === "users") loadUsers().catch(console.warn);
  if (section === "activity") renderActivity();
  if (section === "chat") {
    renderChat();
    loadChatDirectory(false).catch((error) => {
      console.warn("Directorio de chat", error);
      if (els.chatDirectoryStatus) els.chatDirectoryStatus.textContent = "No se pudo actualizar el directorio";
    });
    subscribeToChat().catch(console.warn);
  }
  if (section === "reports") loadAdminReports(false).catch((error) => { console.warn("Reportes", error); showToast("No se pudieron cargar los reportes", friendlyError(error), "error"); });
}

function startClock() {
  const update = () => {
    const now = new Date();
    els.liveDate.textContent = now.toLocaleDateString("es-UY", { weekday: "long", day: "2-digit", month: "long" });
    els.liveClock.textContent = now.toLocaleTimeString("es-UY", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
    els.dashboardClock.textContent = now.toLocaleTimeString("es-UY", { hour: "2-digit", minute: "2-digit" });
    if (els.mobileDate) els.mobileDate.textContent = now.toLocaleDateString("es-UY", { day: "2-digit", month: "short", year: "numeric" });
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
  els.chatForm?.addEventListener("submit", sendChatMessage);
  els.chatInput?.addEventListener("input", autoResizeChatInput);
  els.chatUserSearch?.addEventListener("input", () => renderChatContacts());
  els.chatBackButton?.addEventListener("click", clearChatSelection);
  els.refreshReportsButton?.addEventListener("click", () => loadAdminReports(true));
  els.applyReportsButton?.addEventListener("click", renderAdminReports);
  els.clearReportsButton?.addEventListener("click", resetReportFilters);
  [els.adminActivityType, els.adminActivityPerson, els.adminActivityDate].filter(Boolean).forEach((element) => element.addEventListener("change", renderActivity));
  els.adminActivitySearch?.addEventListener("input", renderActivity);
  els.adminActivityRefresh?.addEventListener("click", async () => {
    setBusy(els.adminActivityRefresh, true, "Actualizando...");
    try { await refreshServerData(); showToast("Registros actualizados", "Se consultaron todos los registros operativos."); }
    catch (error) { showToast("No se pudo actualizar", friendlyError(error), "error"); }
    finally { setBusy(els.adminActivityRefresh, false); }
  });
  els.refreshAdminPartsButton?.addEventListener("click", () => loadOperatorParts(true).catch((error) => showToast("No se pudieron actualizar los Partes", friendlyError(error), "error")));
  els.adminPartsSearch?.addEventListener("input", renderAdminParts);
  els.adminPartsDateFilter?.addEventListener("change", renderAdminParts);
  els.adminPartsOperatorFilter?.addEventListener("change", renderAdminParts);
  els.refreshAdminBreaksButton?.addEventListener("click", async () => {
    setBusy(els.refreshAdminBreaksButton, true, "Actualizando...");
    try { await loadBreaksFromServer(); renderAdminBreaks(); }
    catch (error) { setAdminBreaksStatus(`No se pudieron actualizar los descansos: ${friendlyError(error)}`, true); }
    finally { setBusy(els.refreshAdminBreaksButton, false); }
  });
  [els.adminBreaksSearch, els.adminBreaksDateFilter, els.adminBreaksOperatorFilter, els.adminBreaksStatusFilter].filter(Boolean).forEach((element) => element.addEventListener(element.tagName === "INPUT" && element.type === "search" ? "input" : "change", renderAdminBreaks));
  els.refreshAdminServicesButton?.addEventListener("click", async () => {
    setBusy(els.refreshAdminServicesButton, true, "Actualizando...");
    try { await loadServicesFromServer(); renderAdminServices(); }
    catch (error) { setAdminServicesStatus(`No se pudieron actualizar los servicios: ${friendlyError(error)}`, true); }
    finally { setBusy(els.refreshAdminServicesButton, false); }
  });
  [els.adminServicesSearch, els.adminServicesDateFilter, els.adminServicesOperatorFilter, els.adminServicesMechanicFilter, els.adminServicesMachineFilter, els.adminServicesStatusFilter].filter(Boolean).forEach((element) => element.addEventListener(element.tagName === "INPUT" && element.type === "search" ? "input" : "change", renderAdminServices));
  els.operatorActivityTabs?.querySelectorAll("[data-activity-tab]").forEach((button) => button.addEventListener("click", () => { operatorActivityTab = button.dataset.activityTab || "parts"; renderActivity(); }));
  els.activityDateFilter?.addEventListener("change", renderActivity);
  els.offlineLoginButton.addEventListener("click", loginOffline);
  els.menuButton.addEventListener("click", () => els.sidebar.classList.toggle("open"));
  els.mobileMoreButton?.addEventListener("click", () => els.sidebar.classList.toggle("open"));
  els.mobileSyncButton?.addEventListener("click", () => syncNow(true));
  els.syncButton.addEventListener("click", () => syncNow(true));
  els.topSyncButton?.addEventListener("click", () => syncNow(true));
  els.lockButton.addEventListener("click", lockApplication);
  els.topLogoutButton?.addEventListener("click", lockApplication);
  els.mobileLogoutButton?.addEventListener("click", lockApplication);
  [els.sidebarProfileButton, els.topbarProfileButton, els.dashboardProfileButton, els.mobileProfileButton].filter(Boolean).forEach((button) => button.addEventListener("click", () => openProfilePhotoPicker(currentUser?.uid || "")));
  els.profilePhotoInput?.addEventListener("change", handleProfilePhotoSelection);
  els.cleanupConfirmInput?.addEventListener("input", updateCleanupButtonState);
  [els.cleanupParts, els.cleanupServices, els.cleanupFuel, els.cleanupTank].filter(Boolean).forEach((input) => input.addEventListener("change", updateCleanupButtonState));
  els.cleanupDataButton?.addEventListener("click", cleanupOperationalData);
  $$('[data-section]').forEach((button) => button.addEventListener("click", () => showSection(button.dataset.section)));
  $$('[data-section-link]').forEach((button) => button.addEventListener("click", () => showSection(button.dataset.sectionLink)));
  els.startBreakButton.addEventListener("click", startBreak);
  els.endBreakButton.addEventListener("click", endBreak);
  els.partForm.addEventListener("submit", savePart);
  els.newPartButton.addEventListener("click", startNewPart);
  els.partSessionSelect.addEventListener("change", selectPartSession);
  els.partDateInput.addEventListener("change", handlePartDateChange);
  els.servicePartSelect.addEventListener("change", selectServicePart);
  els.newServiceButton.addEventListener("click", beginNewServiceSession);
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
    const photoUpload = event.target.closest("[data-upload-user-photo]");
    if (photoUpload) openProfilePhotoPicker(photoUpload.dataset.uploadUserPhoto);
  });
}

function switchAuth(mode) {
  clearAuthMessage();
  const login = mode === "login";
  els.loginTab.classList.toggle("active", login);
  els.registerTab.classList.toggle("active", !login);
  els.loginForm.classList.toggle("active", login);
  els.registerForm.classList.toggle("active", !login);
  els.offlineLoginPanel.classList.toggle("hidden", !login);
  if (login) renderOfflineLoginPanel();
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
  if (els.registerPassword.value !== els.registerPasswordConfirm.value) { showAuthMessage("Las contraseñas no coinciden."); return; }
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
  if (!lastOfflineProfile?.offlineAccessEnabled) { showAuthMessage("Primero debes ingresar una vez con Internet y configurar el PIN offline."); return; }
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
  stopChatSubscription();
  stopPartsSubscription();
  stopAdminRecordSubscriptions();
  await OfflineDB.setLocked(currentProfile.uid, true).catch(() => {});
  lastOfflineProfile = { ...currentProfile, locked: true };
  localSession = false;
  chatUsers = [];
  chatMessages = [];
  selectedChatUserUid = "";
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
    "auth/invalid-credential": "Correo o contraseña incorrectos.",
    "auth/user-not-found": "El usuario no existe.",
    "auth/wrong-password": "Contraseña incorrecta.",
    "auth/email-already-in-use": "Ese correo ya esta registrado.",
    "auth/weak-password": "La contraseña debe tener al menos 6 caracteres.",
    "auth/network-request-failed": "No se pudo conectar con Firebase.",
    "permission-denied": "Firestore rechazó la operación por permisos. Publicá firestore.rules de la versión 5.5 en el proyecto APP LUBAYD.",
    "storage/unauthorized": "Storage rechazo la foto. Publica las reglas de Storage incluidas.",
    "storage/retry-limit-exceeded": "La foto no pudo cargarse por un problema de red.",
    "unavailable": "Firebase no esta disponible temporalmente."
  };
  return messages[code] || error?.message || "Ocurrio un error inesperado.";
}

async function loadAllLocalData() {
  if (!currentUser) return;
  const isAdmin = currentProfile?.role === "admin";
  breakRecords = isAdmin && OfflineDB.getAllBreaks
    ? await OfflineDB.getAllBreaks().catch(() => [])
    : await OfflineDB.getBreaks(currentUser.uid).catch(() => []);
  currentBreak = breakRecords.find((record) => record.uid === currentUser.uid && record.status === "active") || null;
  userParts = (await OfflineDB.getParts(currentUser.uid).catch(() => [])).map(normalizePartRecord);
  const todayParts = partsForDate(todayKey());
  currentPart = todayParts[0] || null;
  partDraftDate = currentPart?.dateKey || todayKey();
  services = isAdmin
    ? await OfflineDB.getAllServices().catch(() => [])
    : await OfflineDB.getServicesForMechanic(currentUser.uid).catch(() => []);
  fuelLoads = isAdmin
    ? await OfflineDB.getAllFuelLoads().catch(() => [])
    : await OfflineDB.getFuelLoads(currentUser.uid).catch(() => []);
  tank = await OfflineDB.getTank().catch(() => null) || tank;
  operatorParts = await OfflineDB.getOperatorParts(isAdmin ? undefined : todayKey()).catch(() => []);
  chatMessages = await OfflineDB.getChatMessages(150).catch(() => []);
  await repairPendingParts().catch((error) => console.warn("Reparacion de partes pendientes", error));
  updateConnection();
  await updateSyncUi();
}

async function refreshServerData() {
  if (!firebaseReady || !navigator.onLine || !currentUser || localSession) return;
  await applyGlobalOperationalReset();
  const role = currentProfile?.role || "operator";
  const tasks = [];
  if (role === "operator") tasks.push(loadBreaksFromServer(), loadPartFromServer());
  if (role === "mechanic") tasks.push(loadOperatorParts(), loadServicesFromServer(), loadFuelSection());
  if (role === "admin") tasks.push(loadBreaksFromServer(), loadOperatorParts(true), loadServicesFromServer(), loadFuelSection());
  await Promise.all(tasks);
  if (role === "admin") await subscribeToAdminRecords().catch((error) => console.warn("Registros administrativos", error));
  await loadChatDirectory(false).catch((error) => console.warn("Directorio de chat", error));
  await subscribeToChat().catch((error) => console.warn("Chat", error));
  renderAll();
}

async function loadBreaksFromServer() {
  const isAdmin = currentProfile?.role === "admin";
  if (!isAdmin) {
    const q = sdk.query(sdk.collection(db, "users", currentUser.uid, "breaks"), sdk.orderBy("startAtClient", "desc"), sdk.limit(100));
    const snap = await sdk.getDocs(q);
    for (const docSnap of snap.docs) {
      const record = { id: docSnap.id, ...docSnap.data(), uid: currentUser.uid, operatorUid: currentUser.uid, userName: currentProfile?.name || "Operador", syncStatus: "synced" };
      await OfflineDB.putBreak(record);
    }
    breakRecords = await OfflineDB.getBreaks(currentUser.uid);
    currentBreak = breakRecords.find((record) => record.uid === currentUser.uid && record.status === "active") || null;
    return;
  }

  const usersSnapshot = await sdk.getDocs(sdk.collection(db, "users"));
  adminProfiles = new Map(usersSnapshot.docs.map((docSnap) => [docSnap.id, { uid: docSnap.id, ...docSnap.data() }]));
  const merged = new Map();

  try {
    const canonicalSnapshot = await sdk.getDocs(sdk.collection(db, "operationalBreaks"));
    canonicalSnapshot.docs.forEach((docSnap) => {
      const data = docSnap.data() || {};
      merged.set(docSnap.id, { id: docSnap.id, ...data, uid: data.uid || data.operatorUid || "", operatorUid: data.operatorUid || data.uid || "", syncStatus: "synced", _source: "canonical" });
    });
  } catch (error) {
    console.warn("No se pudo leer operationalBreaks; se revisaran las subcolecciones heredadas.", error);
  }

  for (const userDoc of usersSnapshot.docs) {
    const profile = userDoc.data() || {};
    try {
      const breaksSnapshot = await sdk.getDocs(sdk.collection(db, "users", userDoc.id, "breaks"));
      for (const breakDoc of breaksSnapshot.docs) {
        const data = breakDoc.data() || {};
        const record = {
          id: breakDoc.id,
          ...data,
          uid: userDoc.id,
          operatorUid: userDoc.id,
          userName: data.userName || profile.name || profile.email || "Operador",
          userRole: profile.role || "operator",
          syncStatus: "synced"
        };
        const current = merged.get(record.id);
        if (!current || String(record.endAtClient || record.startAtClient || "") >= String(current.endAtClient || current.startAtClient || "")) merged.set(record.id, record);
        if (!current || current._source !== "canonical") {
          try {
            await sdk.setDoc(sdk.doc(db, "operationalBreaks", record.id), { ...cleanRecord(record), syncedAt: sdk.serverTimestamp() }, { merge: true });
          } catch (migrationError) {
            console.warn(`No se pudo migrar el descanso ${record.id}`, migrationError);
          }
        }
      }
    } catch (error) {
      console.warn(`No se pudieron leer los descansos de ${userDoc.id}`, error);
    }
  }

  for (const record of merged.values()) await OfflineDB.putBreak(record);
  breakRecords = Array.from(merged.values()).sort((a, b) => String(b.startAtClient || "").localeCompare(String(a.startAtClient || "")));
  currentBreak = breakRecords.find((record) => record.uid === currentUser.uid && record.status === "active") || null;
}

async function loadPartFromServer() {
  if (!currentUser || currentProfile?.role === "mechanic") return;
  if (currentProfile?.role === "admin") { await loadOperatorParts(true); return; }
  const selectedId = currentPart?.id || "";
  const q = sdk.query(
    sdk.collection(db, "operationalParts"),
    sdk.where("operatorUid", "==", currentUser.uid)
  );
  const snap = await sdk.getDocs(q);
  const localPendingIds = new Set(userParts.filter((part) => part.syncStatus === "pending").map((part) => part.id));
  for (const item of snap.docs) {
    if (localPendingIds.has(item.id)) continue;
    const data = item.data();
    const record = normalizePartRecord({ id: item.id, ...data, uid: currentUser.uid, operatorUid: data.operatorUid || currentUser.uid, syncStatus: "synced" });
    await OfflineDB.putPart(record);
    await OfflineDB.putOperatorPart(record);
  }
  userParts = (await OfflineDB.getParts(currentUser.uid)).map(normalizePartRecord);
  currentPart = userParts.find((part) => part.id === selectedId) || partsForDate(partDraftDate)[0] || null;
} 

async function loadLegacyPartsForAdmin() {
  if (!firebaseReady || !navigator.onLine || localSession || currentProfile?.role !== "admin") return [];
  const records = [];
  const usersSnapshot = await sdk.getDocs(sdk.collection(db, "users"));
  for (const userDoc of usersSnapshot.docs) {
    const profile = userDoc.data() || {};
    try {
      const legacySnapshot = await sdk.getDocs(sdk.collection(db, "users", userDoc.id, "parts"));
      for (const partDoc of legacySnapshot.docs) {
        const data = partDoc.data() || {};
        const record = normalizePartRecord({
          id: data.id || partDoc.id,
          ...data,
          uid: userDoc.id,
          operatorUid: data.operatorUid || userDoc.id,
          operatorName: data.operatorName || profile.name || profile.email || "Operador",
          syncStatus: "synced",
          _source: "legacy"
        });
        records.push(record);
      }
    } catch (error) {
      console.warn(`No se pudieron leer los Partes heredados de ${userDoc.id}`, error);
    }
  }
  return records;
}

function mergePartCollections(...collections) {
  const map = new Map();
  collections.flat().filter(Boolean).forEach((part) => {
    const current = map.get(part.id);
    const candidateDate = String(part.updatedAtClient || part.createdAtClient || "");
    const currentDate = String(current?.updatedAtClient || current?.createdAtClient || "");
    if (!current || candidateDate >= currentDate || part._source === "canonical") map.set(part.id, part);
  });
  return Array.from(map.values()).sort((a, b) => String(b.updatedAtClient || b.createdAtClient || "").localeCompare(String(a.updatedAtClient || a.createdAtClient || "")));
}

async function migrateLegacyPartsToCanonical(records, canonicalIds) {
  if (currentProfile?.role !== "admin" || !navigator.onLine || localSession) return;
  for (const record of records) {
    if (canonicalIds.has(record.id)) continue;
    try {
      const remote = { ...cleanRecord(record), _source: "canonical", syncStatus: "synced", migratedAtClient: localIso(), syncedAt: sdk.serverTimestamp() };
      delete remote.updatedAtLocal;
      await sdk.setDoc(sdk.doc(db, "operationalParts", record.id), remote, { merge: true });
      record._source = "canonical";
      canonicalIds.add(record.id);
    } catch (error) {
      console.warn(`No se pudo migrar el Parte heredado ${record.id}`, error);
    }
  }
}

function setAdminPartsStatus(message, isError = false) {
  if (!els.adminPartsStatus) return;
  els.adminPartsStatus.textContent = message;
  els.adminPartsStatus.classList.toggle("error", Boolean(isError));
}

async function loadOperatorParts(force = false) {
  const date = todayKey();
  const isAdmin = currentProfile?.role === "admin";
  if (adminPartsLoading && !force) return;
  if (isAdmin) {
    adminPartsLoading = true;
    if (els.refreshAdminPartsButton) els.refreshAdminPartsButton.disabled = true;
    setAdminPartsStatus(navigator.onLine ? "Consultando Partes en Firebase..." : "Sin conexión: mostrando la última copia guardada en este dispositivo.");
  }
  try {
    if (firebaseReady && navigator.onLine && !localSession) {
      const source = isAdmin
        ? sdk.collection(db, "operationalParts")
        : sdk.query(sdk.collection(db, "operationalParts"), sdk.where("dateKey", "==", date));
      const snap = await sdk.getDocs(source);
      const canonical = snap.docs.map((item) => normalizePartRecord({ id: item.id, ...item.data(), syncStatus: "synced", _source: "canonical" }));

      if (isAdmin) {
        const canonicalIds = new Set(canonical.map((part) => part.id));
        legacyAdminParts = await loadLegacyPartsForAdmin();
        await migrateLegacyPartsToCanonical(legacyAdminParts, canonicalIds);
        const merged = mergePartCollections(canonical, legacyAdminParts);
        if (OfflineDB.replaceOperatorParts) await OfflineDB.replaceOperatorParts(merged);
        else for (const record of merged) await OfflineDB.putOperatorPart(record);
        operatorParts = merged;
        reportParts = merged;
        setAdminPartsStatus(`${canonical.length} Parte${canonical.length === 1 ? "" : "s"} en operationalParts${legacyAdminParts.length ? ` · ${legacyAdminParts.length} registro${legacyAdminParts.length === 1 ? "" : "s"} heredado${legacyAdminParts.length === 1 ? "" : "s"} revisado${legacyAdminParts.length === 1 ? "" : "s"}` : ""}.`);
      } else {
        for (const record of canonical) await OfflineDB.putOperatorPart(record);
        operatorParts = await OfflineDB.getOperatorParts(date);
      }
    } else {
      operatorParts = await OfflineDB.getOperatorParts(isAdmin ? undefined : date);
    }
    populateServiceParts();
    populateFuelOperators();
    renderAdminParts();
    renderDashboardCards();
    await subscribeToOperationalParts().catch((error) => console.warn("Partes en tiempo real", error));
  } finally {
    adminPartsLoading = false;
    if (els.refreshAdminPartsButton) els.refreshAdminPartsButton.disabled = false;
  }
}

function stopPartsSubscription() {
  if (typeof partsUnsubscribe === "function") partsUnsubscribe();
  partsUnsubscribe = null;
}

async function subscribeToOperationalParts() {
  if (!currentUser || !["mechanic", "admin"].includes(currentProfile?.role)) return;
  if (!navigator.onLine || localSession) return;
  if (partsUnsubscribe) return;
  await importFirebase();
  const isAdmin = currentProfile.role === "admin";
  const date = todayKey();
  const source = isAdmin
    ? sdk.collection(db, "operationalParts")
    : sdk.query(sdk.collection(db, "operationalParts"), sdk.where("dateKey", "==", date));

  partsUnsubscribe = sdk.onSnapshot(source, async (snapshot) => {
    const canonical = snapshot.docs.map((item) => normalizePartRecord({ id: item.id, ...item.data(), syncStatus: "synced", _source: "canonical" }));
    if (isAdmin) {
      const merged = mergePartCollections(canonical, legacyAdminParts);
      if (OfflineDB.replaceOperatorParts) await OfflineDB.replaceOperatorParts(merged);
      else for (const record of merged) await OfflineDB.putOperatorPart(record);
      operatorParts = merged;
      reportParts = merged;
      setAdminPartsStatus(`${canonical.length} Parte${canonical.length === 1 ? "" : "s"} sincronizado${canonical.length === 1 ? "" : "s"} en tiempo real.`);
    } else {
      for (const record of canonical) await OfflineDB.putOperatorPart(record);
      operatorParts = await OfflineDB.getOperatorParts(date);
    }
    populateServiceParts();
    populateFuelOperators();
    renderAdminParts();
    renderDashboardCards();
    if (currentSection === "activity") renderActivity();
    if (currentSection === "service") renderService();
  }, (error) => {
    console.warn("Suscripcion de Partes", error);
    if (isAdmin) setAdminPartsStatus(`Firebase rechazó la lectura en tiempo real: ${friendlyError(error)}`, true);
    stopPartsSubscription();
  });
}

async function loadServicesFromServer() {
  if (!firebaseReady || !navigator.onLine || localSession || !["mechanic", "admin"].includes(currentProfile?.role)) return;
  let q;
  if (currentProfile.role === "admin") q = sdk.collection(db, "services");
  else q = sdk.query(sdk.collection(db, "services"), sdk.where("mechanicUid", "==", currentUser.uid));
  const snap = await sdk.getDocs(q);
  for (const item of snap.docs) await OfflineDB.putService({ id: item.id, ...item.data(), syncStatus: "synced" });
  services = currentProfile.role === "admin" ? await OfflineDB.getAllServices() : await OfflineDB.getServicesForMechanic(currentUser.uid);
}


function stopAdminRecordSubscriptions() {
  adminRecordUnsubscribers.forEach((unsubscribe) => { try { unsubscribe?.(); } catch (_) {} });
  adminRecordUnsubscribers = [];
}

async function subscribeToAdminRecords() {
  if (currentProfile?.role !== "admin" || !navigator.onLine || localSession || adminRecordUnsubscribers.length) return;
  await importFirebase();

  const subscribe = (reference, handler, label) => {
    const unsubscribe = sdk.onSnapshot(reference, handler, (error) => {
      console.warn(`Suscripcion ${label}`, error);
      showToast("Actualizacion en tiempo real", `No se pudo actualizar ${label}: ${friendlyError(error)}`, "error");
    });
    adminRecordUnsubscribers.push(unsubscribe);
  };

  subscribe(sdk.collection(db, "operationalBreaks"), async (snapshot) => {
    const records = snapshot.docs.map((docSnap) => ({ id: docSnap.id, ...docSnap.data(), syncStatus: "synced" }));
    for (const record of records) await OfflineDB.putBreak(record);
    breakRecords = records.sort((a, b) => String(b.startAtClient || "").localeCompare(String(a.startAtClient || "")));
    reportBreaks = breakRecords;
    currentBreak = breakRecords.find((record) => record.uid === currentUser.uid && record.status === "active") || null;
    renderDashboardCards();
    renderAdminBreaks();
    if (currentSection === "activity") renderActivity();
    if (currentSection === "reports") renderAdminReports();
  }, "descansos");

  subscribe(sdk.collection(db, "services"), async (snapshot) => {
    const records = snapshot.docs.map((docSnap) => ({ id: docSnap.id, ...docSnap.data(), syncStatus: "synced" }));
    for (const record of records) await OfflineDB.putService(record);
    services = records.sort((a, b) => String(b.startAtClient || "").localeCompare(String(a.startAtClient || "")));
    reportServices = services;
    renderDashboardCards();
    renderAdminServices();
    if (currentSection === "activity") renderActivity();
    if (currentSection === "reports") renderAdminReports();
  }, "servicios");

  subscribe(sdk.collection(db, "fuelLoads"), async (snapshot) => {
    const records = snapshot.docs.map((docSnap) => ({ id: docSnap.id, ...docSnap.data(), syncStatus: "synced" }));
    for (const record of records) await OfflineDB.putFuelLoad(record);
    fuelLoads = records.sort((a, b) => String(b.createdAtClient || "").localeCompare(String(a.createdAtClient || "")));
    reportFuelLoads = fuelLoads;
    renderDashboardCards();
    renderFuelRecent();
    if (currentSection === "activity") renderActivity();
    if (currentSection === "reports") renderAdminReports();
  }, "cargas de combustible");
}


function chatSort(records) {
  return [...records].sort((a, b) => String(a.createdAtClient || "").localeCompare(String(b.createdAtClient || "")));
}

function directConversationId(uidA, uidB) {
  return [String(uidA || ""), String(uidB || "")].sort().join("__");
}

function selectedChatUser() {
  return chatUsers.find((profile) => profile.uid === selectedChatUserUid) || null;
}

function chatConversationMessages(uid = selectedChatUserUid) {
  if (!currentUser?.uid || !uid) return [];
  const conversationId = directConversationId(currentUser.uid, uid);
  return chatSort(chatMessages.filter((message) => message.conversationId === conversationId));
}

function chatAvatarMarkup(profile, className = "") {
  const name = profile?.name || profile?.email || "Usuario";
  if (profile?.photoURL) {
    return `<img class="${escapeHtml(className)}" src="${escapeHtml(profile.photoURL)}" alt="Foto de ${escapeHtml(name)}">`;
  }
  return `<span class="${escapeHtml(className)}">${escapeHtml(initials(name))}</span>`;
}

function cachedChatDirectory() {
  try {
    const parsed = JSON.parse(localStorage.getItem(CHAT_DIRECTORY_KEY) || "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch (_) {
    return [];
  }
}

function saveChatDirectory() {
  try {
    const safe = chatUsers.map(({ uid, name, email, role, active, photoURL }) => ({ uid, name, email, role, active, photoURL }));
    localStorage.setItem(CHAT_DIRECTORY_KEY, JSON.stringify(safe));
  } catch (_) {}
}

function selectedChatStorageKey() {
  return `${CHAT_SELECTED_KEY_PREFIX}:${currentUser?.uid || "anonymous"}`;
}

async function loadChatDirectory(force = false) {
  if (!currentUser) return;
  if (!chatUsers.length) {
    chatUsers = cachedChatDirectory().filter((profile) => profile.uid && profile.uid !== currentUser.uid && profile.active !== false);
    const stored = localStorage.getItem(selectedChatStorageKey()) || "";
    if (stored && chatUsers.some((profile) => profile.uid === stored)) selectedChatUserUid = stored;
    renderChat();
  }
  if (!navigator.onLine || localSession) {
    if (els.chatDirectoryStatus) els.chatDirectoryStatus.textContent = chatUsers.length ? "Directorio guardado en el dispositivo" : "Conectate para cargar usuarios";
    return;
  }
  if (chatDirectoryLoading && !force) return;
  chatDirectoryLoading = true;
  if (els.chatDirectoryStatus) els.chatDirectoryStatus.textContent = "Actualizando usuarios...";
  try {
    await importFirebase();
    const snapshot = await sdk.getDocs(sdk.collection(db, "users"));
    chatUsers = snapshot.docs
      .map((item) => ({ uid: item.id, ...item.data() }))
      .filter((profile) => profile.uid !== currentUser.uid && profile.active !== false)
      .sort((a, b) => String(a.name || a.email || "").localeCompare(String(b.name || b.email || ""), "es"));
    saveChatDirectory();
    if (selectedChatUserUid && !chatUsers.some((profile) => profile.uid === selectedChatUserUid)) selectedChatUserUid = "";
    const stored = localStorage.getItem(selectedChatStorageKey()) || "";
    if (!selectedChatUserUid && stored && chatUsers.some((profile) => profile.uid === stored)) selectedChatUserUid = stored;
    if (els.chatDirectoryStatus) els.chatDirectoryStatus.textContent = `${chatUsers.length} usuario${chatUsers.length === 1 ? "" : "s"} disponible${chatUsers.length === 1 ? "" : "s"}`;
    renderChat();
  } finally {
    chatDirectoryLoading = false;
  }
}

function mergeChatMessages(incoming) {
  const map = new Map(chatMessages.map((message) => [message.id, message]));
  incoming.forEach((message) => {
    const current = map.get(message.id);
    if (current?.syncStatus === "pending" && message.syncStatus === "synced") {
      map.set(message.id, { ...current, ...message, syncStatus: "synced" });
    } else if (!current || current.syncStatus !== "pending") {
      map.set(message.id, { ...(current || {}), ...message });
    }
  });
  chatMessages = chatSort(Array.from(map.values())).slice(-600);
}

function chatMessageTemplate(message) {
  const mine = message.senderUid === currentUser?.uid;
  const pending = message.syncStatus === "pending";
  const read = Array.isArray(message.readBy) && message.recipientUid && message.readBy.includes(message.recipientUid);
  return `<article class="chat-message ${mine ? "mine" : "other"} ${pending ? "pending" : ""}" data-message-id="${escapeHtml(message.id)}">
    <div class="chat-bubble">
      <p>${escapeHtml(message.text || "").replace(/\n/g, "<br>")}</p>
      <footer><time>${escapeHtml(formatTime(message.createdAtClient))}</time><span>${pending ? "Pendiente" : (mine && read ? "Leído" : "Enviado")}</span></footer>
    </div>
  </article>`;
}

function chatContactLastMessage(uid) {
  const messages = chatConversationMessages(uid);
  return messages.length ? messages[messages.length - 1] : null;
}

function chatUnreadCount(uid) {
  return chatConversationMessages(uid).filter((message) => message.recipientUid === currentUser?.uid && !(message.readBy || []).includes(currentUser.uid)).length;
}

function renderChatContacts() {
  if (!els.chatContactList) return;
  const query = String(els.chatUserSearch?.value || "").trim().toLowerCase();
  const filtered = chatUsers
    .filter((profile) => {
      const haystack = `${profile.name || ""} ${profile.email || ""} ${roleLabel(profile.role || "operator")}`.toLowerCase();
      return !query || haystack.includes(query);
    })
    .map((profile) => ({ profile, last: chatContactLastMessage(profile.uid), unread: chatUnreadCount(profile.uid) }))
    .sort((a, b) => {
      const byMessage = String(b.last?.createdAtClient || "").localeCompare(String(a.last?.createdAtClient || ""));
      return byMessage || String(a.profile.name || a.profile.email || "").localeCompare(String(b.profile.name || b.profile.email || ""), "es");
    });

  if (!filtered.length) {
    els.chatContactList.innerHTML = `<div class="empty-state compact">${chatUsers.length ? "No hay usuarios que coincidan con la búsqueda." : "No hay otros usuarios disponibles."}</div>`;
  } else {
    els.chatContactList.innerHTML = filtered.map(({ profile, last, unread }) => {
      const selected = profile.uid === selectedChatUserUid;
      const preview = last ? `${last.senderUid === currentUser?.uid ? "Vos: " : ""}${last.text || ""}` : roleLabel(profile.role || "operator");
      return `<button class="chat-contact ${selected ? "active" : ""}" type="button" data-chat-user="${escapeHtml(profile.uid)}">
        <span class="chat-contact-avatar">${chatAvatarMarkup(profile)}</span>
        <span class="chat-contact-copy"><strong>${escapeHtml(profile.name || profile.email || "Usuario")}</strong><small>${escapeHtml(preview.slice(0, 74))}</small></span>
        <span class="chat-contact-side">${last ? `<time>${escapeHtml(formatTime(last.createdAtClient))}</time>` : ""}${unread ? `<b>${unread > 99 ? "99+" : unread}</b>` : ""}</span>
      </button>`;
    }).join("");
    els.chatContactList.querySelectorAll("[data-chat-user]").forEach((button) => button.addEventListener("click", () => selectChatUser(button.dataset.chatUser)));
  }

  const totalUnread = chatUsers.reduce((sum, profile) => sum + chatUnreadCount(profile.uid), 0);
  if (els.chatUnreadTotal) {
    els.chatUnreadTotal.textContent = totalUnread > 99 ? "99+" : String(totalUnread);
    els.chatUnreadTotal.classList.toggle("hidden", totalUnread === 0);
  }
}

function selectChatUser(uid) {
  if (!chatUsers.some((profile) => profile.uid === uid)) return;
  selectedChatUserUid = uid;
  try { localStorage.setItem(selectedChatStorageKey(), uid); } catch (_) {}
  renderChat(true);
  markCurrentConversationRead().catch((error) => console.warn("Lectura de mensajes", error));
}

function clearChatSelection() {
  selectedChatUserUid = "";
  try { localStorage.removeItem(selectedChatStorageKey()); } catch (_) {}
  renderChat(false);
}

async function markCurrentConversationRead() {
  if (!selectedChatUserUid || !currentUser?.uid) return;
  const unread = chatConversationMessages().filter((message) => message.recipientUid === currentUser.uid && !(message.readBy || []).includes(currentUser.uid));
  if (!unread.length) return;
  unread.forEach((message) => {
    message.readBy = Array.from(new Set([...(message.readBy || []), currentUser.uid]));
    OfflineDB.putChatMessage(message).catch(() => {});
  });
  renderChatContacts();
  if (!navigator.onLine || localSession || !auth?.currentUser) return;
  await Promise.all(unread.map((message) => sdk.updateDoc(sdk.doc(db, "directMessages", message.id), { readBy: sdk.arrayUnion(currentUser.uid) }).catch((error) => console.warn("Marcar mensaje leído", error))));
}

function renderChat(scrollToEnd = false) {
  if (!els.chatMessages) return;
  renderChatContacts();
  const recipient = selectedChatUser();
  const onlineChat = navigator.onLine && firebaseReady && !localSession && Boolean(auth?.currentUser);

  if (els.chatConnectionBadge) {
    els.chatConnectionBadge.textContent = onlineChat ? "En línea" : "Sin conexión";
    els.chatConnectionBadge.classList.toggle("offline", !onlineChat);
  }
  els.directChatShell?.classList.toggle("has-active-chat", Boolean(recipient));

  if (!recipient) {
    if (els.chatRecipientAvatar) els.chatRecipientAvatar.innerHTML = "—";
    if (els.chatRecipientName) els.chatRecipientName.textContent = "Seleccioná un usuario";
    if (els.chatRecipientMeta) els.chatRecipientMeta.textContent = "Elegí un contacto para comenzar";
    if (els.chatStatusText) els.chatStatusText.textContent = "Sin conversación";
    els.chatMessages.innerHTML = '<div class="chat-welcome-state"><span class="chat-welcome-icon"><svg class="ui-icon"><use href="#icon-chat"></use></svg></span><strong>Conversaciones privadas</strong><p>Seleccioná un usuario de la lista para enviarle un mensaje.</p></div>';
    if (els.chatInput) { els.chatInput.disabled = true; els.chatInput.placeholder = "Seleccioná un usuario para escribir..."; }
    if (els.chatSendButton) els.chatSendButton.disabled = true;
    return;
  }

  if (els.chatRecipientAvatar) els.chatRecipientAvatar.innerHTML = chatAvatarMarkup(recipient);
  if (els.chatRecipientName) els.chatRecipientName.textContent = recipient.name || recipient.email || "Usuario";
  if (els.chatRecipientMeta) els.chatRecipientMeta.textContent = `${roleLabel(recipient.role || "operator")} · ${recipient.email || "Usuario activo"}`;
  if (els.chatStatusText) els.chatStatusText.textContent = onlineChat ? "Mensajes en tiempo real" : "Mensajes guardados sin conexión";
  if (els.chatInput) { els.chatInput.disabled = false; els.chatInput.placeholder = `Mensaje para ${(recipient.name || "usuario").split(/\s+/)[0]}...`; }
  if (els.chatSendButton) els.chatSendButton.disabled = false;

  const ordered = chatConversationMessages();
  els.chatMessages.innerHTML = ordered.length
    ? ordered.map(chatMessageTemplate).join("")
    : `<div class="chat-welcome-state compact"><span class="chat-welcome-icon"><svg class="ui-icon"><use href="#icon-chat"></use></svg></span><strong>Iniciá la conversación</strong><p>Todavía no hay mensajes con ${escapeHtml(recipient.name || recipient.email || "este usuario")}.</p></div>`;

  if (scrollToEnd || currentSection === "chat") {
    requestAnimationFrame(() => { els.chatMessages.scrollTop = els.chatMessages.scrollHeight; });
  }
}

function stopChatSubscription() {
  if (typeof chatUnsubscribe === "function") chatUnsubscribe();
  chatUnsubscribe = null;
  chatInitialLoadDone = false;
}

async function subscribeToChat() {
  if (!currentUser || !navigator.onLine || localSession) {
    renderChat();
    return;
  }
  await importFirebase();
  if (!auth?.currentUser || auth.currentUser.uid !== currentUser.uid) {
    renderChat();
    return;
  }
  if (chatUnsubscribe) return;

  const q = sdk.query(
    sdk.collection(db, "directMessages"),
    sdk.where("participantUids", "array-contains", currentUser.uid)
  );

  chatUnsubscribe = sdk.onSnapshot(q, async (snapshot) => {
    const remote = snapshot.docs.map((item) => ({ id: item.id, ...item.data(), syncStatus: "synced" }));
    mergeChatMessages(remote);
    await Promise.all(remote.map((message) => OfflineDB.putChatMessage(message).catch(() => {})));
    chatInitialLoadDone = true;
    renderChat(true);
    if (selectedChatUserUid) markCurrentConversationRead().catch(() => {});
  }, (error) => {
    console.warn("Chat en tiempo real", error);
    if (els.chatStatusText) els.chatStatusText.textContent = "No se pudieron actualizar los mensajes";
  });
}

function autoResizeChatInput() {
  if (!els.chatInput) return;
  els.chatInput.style.height = "auto";
  els.chatInput.style.height = `${Math.min(120, Math.max(44, els.chatInput.scrollHeight))}px`;
}

async function sendChatMessage(event) {
  event.preventDefault();
  if (!currentUser || !currentProfile) return;
  const recipient = selectedChatUser();
  if (!recipient) {
    showToast("Seleccioná un usuario", "Elegí un contacto antes de enviar el mensaje.", "error");
    return;
  }
  const text = String(els.chatInput?.value || "").trim();
  if (!text) return;
  if (text.length > 1000) {
    showToast("Mensaje demasiado largo", "El mensaje puede tener hasta 1000 caracteres.", "error");
    return;
  }

  const participantUids = [currentUser.uid, recipient.uid].sort();
  const message = {
    id: uuid(),
    conversationId: directConversationId(currentUser.uid, recipient.uid),
    participantUids,
    senderUid: currentUser.uid,
    senderName: currentProfile.name || currentUser.displayName || "Usuario",
    senderRole: currentProfile.role || "operator",
    recipientUid: recipient.uid,
    recipientName: recipient.name || recipient.email || "Usuario",
    text,
    readBy: [currentUser.uid],
    createdAtClient: localIso(),
    syncStatus: "pending"
  };

  if (els.chatSendButton) {
    els.chatSendButton.disabled = true;
    els.chatSendButton.classList.add("is-sending");
    els.chatSendButton.setAttribute("aria-busy", "true");
  }
  try {
    await OfflineDB.putChatMessage(message);
    mergeChatMessages([message]);
    await queueForSync({ id: `direct-chat-${message.id}`, uid: currentUser.uid, type: "direct-chat-message", payload: message, createdAt: Date.now() });
    els.chatInput.value = "";
    autoResizeChatInput();
    renderChat(true);
    if (navigator.onLine) await syncNow(false);
  } catch (error) {
    showToast("No se pudo guardar el mensaje", friendlyError(error), "error");
  } finally {
    if (els.chatSendButton) {
      els.chatSendButton.disabled = !selectedChatUserUid;
      els.chatSendButton.classList.remove("is-sending");
      els.chatSendButton.removeAttribute("aria-busy");
    }
  }
}

function renderAll() {
  renderDashboardCards();
  renderDashboardOverview();
  if (currentProfile?.role === "admin") {
    renderAdminBreaks();
    renderAdminParts();
    renderAdminServices();
  } else {
    renderBreak();
    renderPart();
    renderService();
    renderActivity();
  }
  renderChat();
  renderTank();
  renderFuelRecent();
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
  renderChat();
  if (online && currentUser && !localSession) subscribeToChat().catch(console.warn);
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
  if (els.mobilePendingCount) {
    els.mobilePendingCount.textContent = String(count);
    els.mobilePendingCount.classList.toggle("hidden", count === 0);
  }
  if (els.topSyncText) {
    els.topSyncText.textContent = text;
    els.topSyncText.title = lastSyncError || "";
  }
}

function recordIsToday(value) {
  if (!value) return false;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value).slice(0, 10) === todayKey();
  const localKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
  return localKey === todayKey();
}

function partOperatingHours(part) {
  const initial = Number(part?.horometers?.initial?.value);
  const final = Number(part?.horometers?.final?.value);
  if (!Number.isFinite(initial) || !Number.isFinite(final) || final < initial) return 0;
  return final - initial;
}

function formatHours(value) {
  const number = Number(value || 0);
  return `${number.toLocaleString("es-UY", { minimumFractionDigits: number % 1 ? 1 : 0, maximumFractionDigits: 1 })} h`;
}
function localDateKey(value) { const date=new Date(value); if(Number.isNaN(date.getTime())) return String(value||"").slice(0,10); return `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,"0")}-${String(date.getDate()).padStart(2,"0")}`; }
function yesterdayKey(){ const d=new Date(); d.setDate(d.getDate()-1); return localDateKey(d); }
function renderDashboardFuelChart(records){
  if(!els.dashboardFuelChart) return; const h=Array.from({length:24},()=>0); records.forEach(r=>{const d=new Date(r.createdAtClient||Date.now()); if(!Number.isNaN(d.getTime())) h[d.getHours()]+=Number(r.liters||0);}); let sum=0; const data=h.map((v,i)=>({hour:i,value:sum+=v})); const W=720,H=270,m={l:52,r:20,t:24,b:38},pw=W-m.l-m.r,ph=H-m.t-m.b,max=Math.max(500,Math.ceil(Math.max(...data.map(x=>x.value),1)/500)*500); const X=i=>m.l+i/23*pw,Y=v=>m.t+ph-v/max*ph; const pts=data.map(d=>`${X(d.hour).toFixed(1)},${Y(d.value).toFixed(1)}`).join(' '); const area=`M ${X(0)} ${m.t+ph} L ${pts.replaceAll(' ',' L ')} L ${X(23)} ${m.t+ph} Z`; const peak=data.reduce((p,c)=>c.value>=p.value?c:p,data[0]); const grid=[0,.25,.5,.75,1].map(f=>{const y=m.t+ph-f*ph;return `<line x1="${m.l}" y1="${y}" x2="${W-m.r}" y2="${y}" class="dashboard-chart-grid"/><text x="${m.l-10}" y="${y+4}" text-anchor="end" class="dashboard-chart-axis">${Math.round(max*f).toLocaleString('es-UY')}</text>`}).join(''); const labels=[0,4,8,12,16,20,23].map(v=>`<text x="${X(v)}" y="${H-12}" text-anchor="middle" class="dashboard-chart-axis">${String(v).padStart(2,'0')}:00</text>`).join(''); const px=X(peak.hour),py=Y(peak.value); els.dashboardFuelChart.innerHTML=`<svg class="dashboard-chart-svg" viewBox="0 0 ${W} ${H}"><defs><linearGradient id="fuelArea" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#15984f" stop-opacity=".35"/><stop offset="1" stop-color="#15984f" stop-opacity=".02"/></linearGradient></defs>${grid}${labels}<path d="${area}" fill="url(#fuelArea)"/><polyline points="${pts}" class="dashboard-chart-line"/><circle cx="${px}" cy="${py}" r="6" class="dashboard-chart-peak"/><g class="dashboard-chart-tooltip" transform="translate(${Math.min(W-116,Math.max(55,px-52))} ${Math.max(8,py-68)})"><rect width="104" height="52" rx="10"/><text x="52" y="19" text-anchor="middle">${String(peak.hour).padStart(2,'0')}:00</text><text x="52" y="40" text-anchor="middle" class="value">${Math.round(peak.value).toLocaleString('es-UY')} L</text></g></svg>`;
}
function renderDashboardFleetChart(parts,serviceRows,fuelRows){
  if(!els.dashboardFleetChart) return; const all=new Set(); [...parts,...serviceRows,...fuelRows].forEach(x=>x?.machine&&all.add(x.machine)); const service=new Set(serviceRows.filter(x=>x.status==='active').map(x=>x.machine).filter(Boolean)); const active=new Set([...parts.map(x=>x.machine),...fuelRows.map(x=>x.machine)].filter(Boolean)); service.forEach(x=>active.delete(x)); const resting=new Set(currentBreak&&currentPart?.machine?[currentPart.machine]:[]); resting.forEach(x=>active.delete(x)); const total=all.size, rows=[['Operativas',active.size,'#0b9c4b'],['En servicio',service.size,'#68bc67'],['En descanso',resting.size,'#efbd35'],['Sin actividad',Math.max(0,total-active.size-service.size-resting.size),'#cbd4ce']]; const den=Math.max(total,1),r=46,c=2*Math.PI*r; let o=0; const seg=rows.map(x=>{const l=c*x[1]/den,n=`<circle cx="64" cy="64" r="${r}" fill="none" stroke="${x[2]}" stroke-width="18" stroke-dasharray="${l} ${c-l}" stroke-dashoffset="${-o}" transform="rotate(-90 64 64)"/>`;o+=l;return n}).join(''); const legend=rows.map(x=>`<div class="fleet-legend-row"><i style="--fleet-color:${x[2]}"></i><span>${x[0]}</span><strong>${x[1]}</strong><small>${Math.round(x[1]/den*100)}%</small></div>`).join(''); els.dashboardFleetChart.innerHTML=`<svg viewBox="0 0 128 128" class="fleet-donut-svg"><circle cx="64" cy="64" r="46" fill="none" stroke="#eef2ef" stroke-width="18"/>${seg}<circle cx="64" cy="64" r="34" fill="#fff"/><text x="64" y="60" text-anchor="middle" class="fleet-total">${total}</text><text x="64" y="78" text-anchor="middle" class="fleet-caption">Unidades</text></svg><div class="fleet-legend">${legend}</div>`;
}

function renderDashboardOverview() {
  if (!currentProfile) return;
  const visibleParts = currentProfile.role === "admin" ? operatorParts : userParts;
  const todayParts = visibleParts.filter((part) => part.dateKey === todayKey());
  const todayServices = services.filter((record) => recordIsToday(record.endAtClient || record.startAtClient));
  const completedServices = todayServices.filter((record) => record.status !== "active");
  const todayFuel = fuelLoads.filter((record) => recordIsToday(record.createdAtClient));
  const fuelTotal = todayFuel.reduce((sum, record) => sum + Number(record.liters || 0), 0);
  const hours = todayParts.reduce((sum, part) => sum + partOperatingHours(part), 0);

  if (els.metricJourneys) els.metricJourneys.textContent = String(todayParts.length);
  if (els.metricServices) els.metricServices.textContent = String(completedServices.length);
  if (els.metricFuel) els.metricFuel.textContent = liters(fuelTotal);
  if (els.metricHours) els.metricHours.textContent = formatHours(hours);
  const yKey=yesterdayKey(); const yFuel=fuelLoads.filter(r=>localDateKey(r.createdAtClient)===yKey).reduce((x,r)=>x+Number(r.liters||0),0); const yHours=visibleParts.filter(p=>p.dateKey===yKey).reduce((x,p)=>x+partOperatingHours(p),0);
  if(els.metricFuelTrend){const d=fuelTotal-yFuel;els.metricFuelTrend.textContent=`${d>=0?"+":""}${Math.round(d).toLocaleString("es-UY")} L vs. ayer`;els.metricFuelTrend.classList.toggle("negative",d<0);}
  if(els.metricHoursTrend){const d=hours-yHours;els.metricHoursTrend.textContent=`${d>=0?"+":""}${d.toLocaleString("es-UY",{maximumFractionDigits:1})} h vs. ayer`;els.metricHoursTrend.classList.toggle("negative",d<0);}
  const capacity = Number(tank?.capacityLiters || 0);
  const current = Number(tank?.currentLiters || 0);
  const percent = capacity > 0 ? Math.max(0, Math.min(100, current / capacity * 100)) : 0;
  if (els.dashboardTankGauge) els.dashboardTankGauge.style.setProperty("--tank-level", `${percent * 1.8}deg`);
  if (els.dashboardTankPercent) els.dashboardTankPercent.textContent = `${Math.round(percent)}%`;
  if (els.dashboardTankRatio) els.dashboardTankRatio.textContent = `${liters(current)} / ${liters(capacity)}`;
  if (els.dashboardTankCapacity) els.dashboardTankCapacity.textContent = liters(capacity);
  if (els.dashboardTankVolume) els.dashboardTankVolume.textContent = liters(current);
  if (els.dashboardTankProgress) els.dashboardTankProgress.style.width = `${percent}%`;
  if (els.flowTankStart) els.flowTankStart.textContent = liters(current + fuelTotal);
  if (els.flowLoadedToday) els.flowLoadedToday.textContent = liters(fuelTotal);
  if (els.flowTankBalance) els.flowTankBalance.textContent = liters(current);
  renderDashboardFuelChart(todayFuel); renderDashboardFleetChart(todayParts,todayServices,todayFuel); renderUpcomingBreaks(todayParts);
}

function renderUpcomingBreaks(todayParts = []) {
  if (!els.upcomingBreaks) return;
  if (currentBreak) {
    els.upcomingBreaks.innerHTML = `<div class="upcoming-item"><span class="upcoming-icon">${iconSvg("bed")}</span><div><strong>Descanso en curso</strong><span>Iniciado a las ${formatTime(currentBreak.startAtClient)}</span></div><b>Activo</b></div>`;
    return;
  }
  const machines = todayParts.map((part) => part.machine).filter(Boolean).slice(0, 3);
  if (!machines.length) {
    els.upcomingBreaks.innerHTML = '<div class="empty-state compact">Sin descansos programados para hoy.</div>';
    return;
  }
  els.upcomingBreaks.innerHTML = machines.map((machine) => `<div class="upcoming-item"><span class="upcoming-icon">${iconSvg("bed")}</span><div><strong>${escapeHtml(machine)}</strong><span>Sin descanso activo</span></div><b>--:--</b></div>`).join("");
}

function renderDashboardCards() {
  if (!currentProfile || !els.dashboardCards) return;
  const role = currentProfile.role;
  const cards = [];
  if (role === "operator") {
    cards.push({ kind: "break", icon: "bed", title: "Descanso", section: "break" });
    cards.push({ kind: "part", icon: "clipboard", title: "Nuevo Parte", section: "part", newPart: true });
    cards.push({ kind: "activity", icon: "activity", title: "Actividad", section: "activity" });
    cards.push({ kind: "chat", icon: "chat", title: "Mensajes", section: "chat" });
  } else if (role === "mechanic") {
    cards.push({ kind: "service", icon: "wrench", title: "Servicio", section: "service" });
    cards.push({ kind: "fuel", icon: "fuel", title: "Combustible", section: "fuel" });
    cards.push({ kind: "chat", icon: "chat", title: "Chat", section: "chat" });
    cards.push({ kind: "activity", icon: "activity", title: "Actividad", section: "activity" });
  } else if (role === "admin") {
    cards.push({ kind: "part", icon: "clipboard", title: `Partes (${operatorParts.length})`, section: "part" });
    cards.push({ kind: "service", icon: "wrench", title: `Servicios (${services.length})`, section: "service" });
    cards.push({ kind: "break", icon: "bed", title: `Descansos (${breakRecords.length})`, section: "break" });
    cards.push({ kind: "reports", icon: "chart", title: "Reportes y gráficos", section: "reports" });
    cards.push({ kind: "chat", icon: "chat", title: "Mensajes", section: "chat" });
  }
  els.dashboardCards.innerHTML = cards.map((card) => `<button class="quick-access-card quick-card-${card.kind}" type="button" data-section-link="${card.section}" ${card.newPart ? 'data-new-part="true"' : ""}><span class="quick-access-icon">${iconSvg(card.icon)}</span><strong>${escapeHtml(card.title)}</strong></button>`).join("");
  els.dashboardCards.querySelectorAll("[data-section-link]").forEach((button) => button.addEventListener("click", () => {
    if (button.dataset.newPart === "true") startNewPart();
    else showSection(button.dataset.sectionLink);
  }));
  renderRecentActivity();
  renderDashboardOverview();
}

function renderRecentActivity() {
  const records = buildActivityRecords().slice(0, 5);
  els.recentActivity.innerHTML = records.length ? records.map(activityTemplate).join("") : '<div class="empty-state">Sin actividad reciente.</div>';
}

function buildActivityRecords() {
  const role = currentProfile?.role;
  const items = [];
  if (role === "operator") {
    breakRecords.forEach((record) => items.push({ type: "break", personUid: record.uid, personName: record.userName || currentProfile?.name || "Operador", icon: "bed", title: record.status === "active" ? "Inicio de descanso" : "Descanso completado", detail: record.status === "active" ? "Descanso en curso" : `Duración ${formatDuration(record.startAtClient, record.endAtClient)}`, date: record.startAtClient, status: record.syncStatus }));
    userParts.forEach((part) => items.push({ type: "part", personUid: part.operatorUid || part.uid, personName: part.operatorName || currentProfile?.name || "Operador", machine: part.machine || "", icon: "clipboard", title: "Parte diario enviado", detail: `${part.machine || "Sin máquina"} · Troza ${part.production?.troza ?? part.production?.trozo ?? 0} / Pulpa ${part.production?.pulpa || 0}`, date: part.updatedAtClient || part.createdAtClient, status: part.syncStatus }));
  }
  if (role === "admin") {
    breakRecords.forEach((record) => items.push({
      type: "break",
      personUid: record.uid || record.operatorUid || "",
      personName: record.userName || adminProfiles.get(record.uid || record.operatorUid)?.name || "Operador",
      icon: "bed",
      title: `${record.status === "active" ? "Descanso iniciado" : "Descanso completado"} · ${record.userName || adminProfiles.get(record.uid || record.operatorUid)?.name || "Operador"}`,
      detail: record.status === "active" ? "En curso" : `Duración ${formatDuration(record.startAtClient, record.endAtClient)}`,
      date: record.startAtClient,
      status: record.syncStatus
    }));
    operatorParts.forEach((part) => items.push({
      type: "part",
      personUid: part.operatorUid || part.uid || "",
      personName: part.operatorName || "Operador",
      machine: part.machine || "",
      icon: "clipboard",
      title: `Parte de ${part.operatorName || "Operador"}`,
      detail: `${part.machine || "Sin máquina"} · ${part.dateKey || formatDate(part.createdAtClient)} · Troza ${part.production?.troza ?? part.production?.trozo ?? 0} / Pulpa ${part.production?.pulpa || 0}`,
      date: part.updatedAtClient || part.createdAtClient,
      status: part.syncStatus
    }));
  }
  if (["mechanic", "admin"].includes(role)) {
    services.forEach((record) => items.push({
      type: "service",
      personUid: record.mechanicUid || "",
      personName: record.mechanicName || "Mecánico",
      machine: record.machine || "",
      icon: "wrench",
      title: `${record.status === "active" ? "Servicio iniciado" : "Servicio completado"} · ${record.mechanicName || "Mecánico"}`,
      detail: `${record.operatorName || "Operador"} · ${record.machine || "Máquina"}`,
      date: record.startAtClient,
      status: record.syncStatus
    }));
    fuelLoads.forEach((record) => items.push({
      type: "fuel",
      personUid: record.uid || record.mechanicUid || "",
      personName: record.userName || record.mechanicName || "Mecánico",
      machine: record.machine || "",
      icon: "fuel",
      title: `Carga de combustible · ${record.userName || record.mechanicName || "Mecánico"}`,
      detail: `${record.machine || "Máquina"} · ${liters(record.liters)} · ${record.shift === "night" ? "Nocturno" : "Diurno"}`,
      date: record.createdAtClient,
      status: record.syncStatus
    }));
  }
  return items.sort((a, b) => String(b.date || "").localeCompare(String(a.date || "")));
}

function activityTemplate(item) {
  const syncedLabel = item.status === "pending" ? "Pendiente" : "Completado";
  return `<div class="activity-item"><span class="activity-icon">${iconSvg(item.icon)}</span><div class="activity-copy"><strong>${escapeHtml(item.title)}</strong><span>${escapeHtml(item.detail)}</span></div><div class="activity-meta"><span>${formatDate(item.date)}</span><strong>${formatTime(item.date)}</strong><small class="activity-status ${item.status === "pending" ? "pending" : ""}">${syncedLabel}</small></div></div>`;
}


function reportDateInputValue(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function reportRecordDateKey(value) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value).slice(0, 10);
  return reportDateInputValue(date);
}

function reportDurationMinutes(start, end) {
  if (!start || !end) return 0;
  const diff = new Date(end).getTime() - new Date(start).getTime();
  return Number.isFinite(diff) && diff > 0 ? diff / 60000 : 0;
}

function reportNumber(value, digits = 1) {
  return new Intl.NumberFormat("es-UY", { maximumFractionDigits: digits }).format(Number(value || 0));
}

function setDefaultReportDates() {
  if (!els.reportDateFrom || !els.reportDateTo) return;
  const to = new Date();
  const from = new Date();
  from.setDate(from.getDate() - 6);
  els.reportDateFrom.value = reportDateInputValue(from);
  els.reportDateTo.value = reportDateInputValue(to);
}

function resetReportFilters() {
  setDefaultReportDates();
  if (els.reportOperator) els.reportOperator.value = "";
  if (els.reportMachine) els.reportMachine.value = "";
  if (els.reportShift) els.reportShift.value = "";
  renderAdminReports();
}

function compactReportPayload() {
  return {
    users: reportUsers.map((item) => ({ uid: item.uid, name: item.name || item.email || "Usuario", role: item.role || "operator" })),
    breaks: reportBreaks.map((item) => ({ id: item.id, uid: item.uid, userName: item.userName || "", status: item.status || "", startAtClient: item.startAtClient || "", endAtClient: item.endAtClient || "" })),
    fuelLoads: reportFuelLoads.map((item) => ({ id: item.id, uid: item.uid, userName: item.userName || "", operatorUid: item.operatorUid || "", operatorName: item.operatorName || "", machine: item.machine || "", liters: Number(item.liters || 0), shift: item.shift || "day", createdAtClient: item.createdAtClient || "" })),
    services: reportServices.map((item) => ({ id: item.id, partId: item.partId || "", operatorUid: item.operatorUid || "", operatorName: item.operatorName || "", mechanicUid: item.mechanicUid || "", mechanicName: item.mechanicName || "", machine: item.machine || "", status: item.status || "", startReason: item.startReason || "", endReason: item.endReason || "", startAtClient: item.startAtClient || "", endAtClient: item.endAtClient || "" })),
    loadedAt: reportLoadedAt || localIso()
  };
}

function saveReportCache() {
  try { localStorage.setItem(REPORT_CACHE_KEY, JSON.stringify(compactReportPayload())); }
  catch (error) { console.warn("Cache de reportes", error); }
}

function loadReportCache() {
  try {
    const cached = JSON.parse(localStorage.getItem(REPORT_CACHE_KEY) || "null");
    if (!cached) return false;
    reportUsers = Array.isArray(cached.users) ? cached.users : [];
    reportParts = [];
    reportBreaks = Array.isArray(cached.breaks) ? cached.breaks : [];
    reportFuelLoads = Array.isArray(cached.fuelLoads) ? cached.fuelLoads : [];
    reportServices = Array.isArray(cached.services) ? cached.services : [];
    reportLoadedAt = cached.loadedAt || null;
    return true;
  } catch (error) {
    console.warn("Lectura de cache de reportes", error);
    return false;
  }
}

function setReportsLoading(loading, message = "") {
  reportLoading = loading;
  setBusy(els.refreshReportsButton, loading, "Actualizando...");
  if (els.reportsConnectionBadge) {
    els.reportsConnectionBadge.textContent = loading ? "Cargando..." : message || (navigator.onLine ? "En linea" : "Datos guardados");
    els.reportsConnectionBadge.classList.toggle("offline-report", !navigator.onLine && !loading);
  }
}

async function loadAdminReports(force = false) {
  if (currentProfile?.role !== "admin" || reportLoading) return;
  if (!els.reportDateFrom.value || !els.reportDateTo.value) setDefaultReportDates();

  if (!navigator.onLine || localSession) {
    const hasCache = reportUsers.length || loadReportCache();
    if (!hasCache) {
      setReportsLoading(false, "Sin conexion");
      renderAdminReports("No hay datos de reportes guardados en este dispositivo.");
      return;
    }
    setReportsLoading(false, "Datos guardados");
    populateReportFilters();
    renderAdminReports();
    return;
  }

  if (!force && reportLoadedAt && reportUsers.length) {
    populateReportFilters();
    renderAdminReports();
    return;
  }

  setReportsLoading(true);
  try {
    await importFirebase();
    const usersSnap = await sdk.getDocs(sdk.collection(db, "users"));
    reportUsers = usersSnap.docs.map((item) => ({ uid: item.id, ...item.data() }));

    const breakGroups = await Promise.all(reportUsers.map(async (user) => {
      try {
        const snap = await sdk.getDocs(sdk.collection(db, "users", user.uid, "breaks"));
        return snap.docs.map((item) => ({ id: item.id, uid: user.uid, userName: user.name || user.email || "Usuario", ...item.data() }));
      } catch (error) {
        console.warn(`Descansos de ${user.uid}`, error);
        return [];
      }
    }));

    const [fuelSnap, serviceSnap] = await Promise.all([
      sdk.getDocs(sdk.collection(db, "fuelLoads")),
      sdk.getDocs(sdk.collection(db, "services"))
    ]);

    reportParts = [];
    reportBreaks = breakGroups.flat();
    reportFuelLoads = fuelSnap.docs.map((item) => ({ id: item.id, ...item.data() }));
    reportServices = serviceSnap.docs.map((item) => ({ id: item.id, ...item.data() }));
    reportLoadedAt = localIso();
    saveReportCache();
    populateReportFilters();
    setReportsLoading(false, "Actualizado");
    renderAdminReports();
  } catch (error) {
    const hasCache = loadReportCache();
    setReportsLoading(false, hasCache ? "Datos guardados" : "Error");
    if (hasCache) {
      populateReportFilters();
      renderAdminReports();
      showToast("Mostrando datos guardados", "No se pudo actualizar Firebase. Se muestran los ultimos datos disponibles.", "error");
      return;
    }
    throw error;
  }
}

function populateReportFilters() {
  if (!els.reportOperator || !els.reportMachine) return;
  const selectedOperator = els.reportOperator.value;
  const selectedMachine = els.reportMachine.value;
  const operators = new Map();
  reportUsers.filter((item) => item.role === "operator").forEach((item) => operators.set(item.uid, item.name || item.email || item.uid));
  reportBreaks.forEach((item) => { if (item.uid) operators.set(item.uid, item.userName || operators.get(item.uid) || item.uid); });
  reportFuelLoads.forEach((item) => { if (item.operatorUid) operators.set(item.operatorUid, item.operatorName || operators.get(item.operatorUid) || item.operatorUid); });
  reportServices.forEach((item) => { if (item.operatorUid) operators.set(item.operatorUid, item.operatorName || operators.get(item.operatorUid) || item.operatorUid); });
  els.reportOperator.innerHTML = '<option value="">Todos los operadores</option>' + Array.from(operators.entries()).sort((a, b) => a[1].localeCompare(b[1], "es")).map(([uid, name]) => `<option value="${escapeHtml(uid)}">${escapeHtml(name)}</option>`).join("");
  els.reportOperator.value = operators.has(selectedOperator) ? selectedOperator : "";

  const machines = Array.from(new Set([...reportFuelLoads, ...reportServices].map((item) => String(item.machine || "").trim()).filter(Boolean))).sort((a, b) => a.localeCompare(b, "es", { numeric: true }));
  els.reportMachine.innerHTML = '<option value="">Todas las maquinas</option>' + machines.map((machine) => `<option value="${escapeHtml(machine)}">${escapeHtml(machine)}</option>`).join("");
  els.reportMachine.value = machines.includes(selectedMachine) ? selectedMachine : "";
}

function reportFilters() {
  const from = els.reportDateFrom?.value || "0000-01-01";
  const to = els.reportDateTo?.value || "9999-12-31";
  const operatorUid = els.reportOperator?.value || "";
  const machine = els.reportMachine?.value || "";
  const shift = els.reportShift?.value || "";
  return { from, to, operatorUid, machine, shift };
}

function recordInReportRange(value, filters) {
  const key = reportRecordDateKey(value);
  return key && key >= filters.from && key <= filters.to;
}

function sameReportOperator(record, operatorUid) {
  if (!operatorUid) return true;
  return record.uid === operatorUid || record.operatorUid === operatorUid;
}

function groupReportRows(records, keyFn, valueFn, detailFn = null) {
  const map = new Map();
  records.forEach((record) => {
    const key = keyFn(record) || "Sin dato";
    const current = map.get(key) || { label: key, value: 0, count: 0, records: [] };
    current.value += Number(valueFn(record) || 0);
    current.count += 1;
    current.records.push(record);
    map.set(key, current);
  });
  return Array.from(map.values()).map((row) => ({ ...row, detail: detailFn ? detailFn(row) : `${row.count} registro${row.count === 1 ? "" : "s"}` }));
}

function renderReportBars(container, rows, formatter, emptyMessage = "Sin datos para el periodo seleccionado.") {
  if (!container) return;
  if (!rows.length) {
    container.innerHTML = `<div class="empty-state compact">${escapeHtml(emptyMessage)}</div>`;
    return;
  }
  const max = Math.max(...rows.map((row) => Number(row.value || 0)), 1);
  container.innerHTML = rows.map((row) => {
    const width = row.value > 0 ? Math.max(3, row.value / max * 100) : 0;
    return `<div class="report-bar-row"><div class="report-bar-label"><strong>${escapeHtml(row.label)}</strong><span>${escapeHtml(row.detail || "")}</span></div><div class="report-bar-track"><div class="report-bar-fill" style="width:${width.toFixed(2)}%"></div></div><strong class="report-bar-value">${escapeHtml(formatter(row.value, row))}</strong></div>`;
  }).join("");
}


function svgEscape(value) { return escapeHtml(String(value ?? "")); }
function chartNiceMax(value) {
  const n = Math.max(1, Number(value || 0));
  const magnitude = 10 ** Math.floor(Math.log10(n));
  const normalized = n / magnitude;
  const nice = normalized <= 1 ? 1 : normalized <= 2 ? 2 : normalized <= 5 ? 5 : 10;
  return nice * magnitude;
}
function renderVerticalSvgChart(container, rows, formatter, options = {}) {
  if (!container) return;
  const data = rows.slice(0, options.limit || 20);
  if (!data.length) { container.innerHTML = '<div class="empty-state compact">Sin datos para el período seleccionado.</div>'; return; }
  const width = 900, height = 310, left = 58, right = 18, top = 18, bottom = 54;
  const plotW = width - left - right, plotH = height - top - bottom;
  const max = chartNiceMax(Math.max(...data.map((row) => Number(row.value || 0)), 1));
  const slot = plotW / data.length, barW = Math.max(10, Math.min(34, slot * .58));
  let svg = `<svg viewBox="0 0 ${width} ${height}" class="report-svg" role="img">`;
  for (let i=0;i<=4;i++) { const y=top+plotH-(plotH*i/4); const v=max*i/4; svg += `<line x1="${left}" y1="${y}" x2="${width-right}" y2="${y}" class="chart-grid-line"/><text x="${left-10}" y="${y+4}" text-anchor="end" class="chart-axis-label">${svgEscape(reportNumber(v, v<10?1:0))}</text>`; }
  data.forEach((row,i)=>{ const x=left+i*slot+(slot-barW)/2; const h=Math.max(2,(Number(row.value||0)/max)*plotH); const y=top+plotH-h; const label=String(row.label||"").replace(/^\d{4}-/,''); svg += `<rect x="${x}" y="${y}" width="${barW}" height="${h}" rx="5" class="chart-bar"/><text x="${x+barW/2}" y="${Math.max(12,y-7)}" text-anchor="middle" class="chart-value-label">${svgEscape(formatter(row.value,row))}</text><text x="${x+barW/2}" y="${height-24}" text-anchor="middle" class="chart-axis-label">${svgEscape(label)}</text>`; });
  svg += `</svg>`; container.innerHTML = svg;
}
function renderHorizontalSvgChart(container, rows, formatter, options = {}) {
  if (!container) return;
  const data = rows.slice(0, options.limit || 10);
  if (!data.length) { container.innerHTML = '<div class="empty-state compact">Sin datos para el período seleccionado.</div>'; return; }
  const width=720, rowH=38, top=12, left=150, right=48, height=top+data.length*rowH+18, plotW=width-left-right;
  const max=Math.max(...data.map(r=>Number(r.value||0)),1);
  let svg=`<svg viewBox="0 0 ${width} ${height}" class="report-svg horizontal-report-svg" role="img">`;
  data.forEach((row,i)=>{ const y=top+i*rowH; const w=Math.max(4,Number(row.value||0)/max*plotW); svg += `<text x="${left-12}" y="${y+18}" text-anchor="end" class="chart-category-label">${svgEscape(row.label)}</text><rect x="${left}" y="${y+5}" width="${plotW}" height="18" rx="9" class="chart-bar-bg"/><rect x="${left}" y="${y+5}" width="${w}" height="18" rx="9" class="chart-bar"/><text x="${Math.min(width-right+7,left+w+7)}" y="${y+19}" class="chart-value-label">${svgEscape(formatter(row.value,row))}</text>`; });
  svg += '</svg>'; container.innerHTML=svg;
}
function renderDonutSvgChart(container, rows, formatter) {
  if (!container) return;
  const data=rows.slice(0,6); const total=data.reduce((s,r)=>s+Number(r.value||0),0);
  if (!data.length || total<=0) { container.innerHTML='<div class="empty-state compact">Sin datos para el período seleccionado.</div>'; return; }
  const colors=['#05833f','#25a45a','#67c987','#0e9fa5','#4c9bdf','#f2b83f'];
  const r=72,c=2*Math.PI*r; let offset=0;
  const arcs=data.map((row,i)=>{ const frac=Number(row.value||0)/total; const dash=frac*c; const node=`<circle cx="105" cy="105" r="${r}" fill="none" stroke="${colors[i]}" stroke-width="26" stroke-dasharray="${dash} ${c-dash}" stroke-dashoffset="${-offset}" transform="rotate(-90 105 105)"/>`; offset+=dash; return node; }).join('');
  const legend=data.map((row,i)=>`<div class="donut-legend-row"><span style="--legend-color:${colors[i]}"></span><strong>${svgEscape(row.label)}</strong><b>${svgEscape(formatter(row.value,row))}</b><small>${reportNumber(Number(row.value||0)/total*100,1)}%</small></div>`).join('');
  container.innerHTML=`<div class="donut-layout"><svg viewBox="0 0 210 210" class="donut-svg">${arcs}<circle cx="105" cy="105" r="50" class="donut-hole"/><text x="105" y="100" text-anchor="middle" class="donut-total">${svgEscape(formatter(total))}</text><text x="105" y="122" text-anchor="middle" class="donut-caption">Total</text></svg><div class="donut-legend">${legend}</div></div>`;
}
function renderLineSvgChart(container, rowsA, rowsB) {
  if (!container) return;
  const keys=Array.from(new Set([...rowsA.map(r=>r.label),...rowsB.map(r=>r.label)])).sort();
  if (!keys.length) { container.innerHTML='<div class="empty-state compact">Sin datos para el período seleccionado.</div>'; return; }
  const mapA=new Map(rowsA.map(r=>[r.label,Number(r.value||0)])), mapB=new Map(rowsB.map(r=>[r.label,Number(r.value||0)]));
  const valsA=keys.map(k=>mapA.get(k)||0), valsB=keys.map(k=>mapB.get(k)||0); const max=chartNiceMax(Math.max(...valsA,...valsB,1));
  const width=720,height=280,left=48,right=18,top=25,bottom=48,plotW=width-left-right,plotH=height-top-bottom;
  const points=(vals)=>vals.map((v,i)=>`${left+(keys.length===1?plotW/2:i*plotW/(keys.length-1))},${top+plotH-v/max*plotH}`).join(' ');
  let svg=`<svg viewBox="0 0 ${width} ${height}" class="report-svg" role="img">`;
  for(let i=0;i<=4;i++){const y=top+plotH-plotH*i/4;svg+=`<line x1="${left}" y1="${y}" x2="${width-right}" y2="${y}" class="chart-grid-line"/>`;}
  svg+=`<polyline points="${points(valsA)}" class="chart-line chart-line-solid"/><polyline points="${points(valsB)}" class="chart-line chart-line-dashed"/>`;
  keys.forEach((k,i)=>{const x=left+(keys.length===1?plotW/2:i*plotW/(keys.length-1));svg+=`<text x="${x}" y="${height-20}" text-anchor="middle" class="chart-axis-label">${svgEscape(k.replace(/^\d{4}-/,''))}</text>`;});
  svg+='</svg><div class="line-chart-legend"><span><i class="solid"></i>Litros cargados</span><span><i class="dashed"></i>Horas de servicio</span></div>'; container.innerHTML=svg;
}


function renderShiftComparisonChart(container, dayLiters, nightLiters) {
  if (!container) return;
  const day = Math.max(0, Number(dayLiters || 0));
  const night = Math.max(0, Number(nightLiters || 0));
  const total = day + night;
  const dayPct = total ? day / total * 100 : 0;
  const nightPct = total ? night / total * 100 : 0;
  const dominant = total ? (night > day ? "Nocturno" : "Diurno") : "Sin datos";
  container.innerHTML = `
    <div class="shift-comparison-summary">
      <article class="shift-result-card day">
        <span class="shift-result-icon" aria-hidden="true"><svg viewBox="0 0 48 48"><circle cx="24" cy="24" r="9"/><path d="M24 4v7M24 37v7M4 24h7M37 24h7M10 10l5 5M33 33l5 5M38 10l-5 5M15 33l-5 5"/></svg></span>
        <div><small>Diurno</small><strong>${reportNumber(day, 1)} L</strong><span>${reportNumber(dayPct, 0)}% del total</span></div>
      </article>
      <article class="shift-result-card night">
        <span class="shift-result-icon" aria-hidden="true"><svg viewBox="0 0 48 48"><path d="M36 31c-13 3-23-8-19-21C7 15 4 28 11 37c7 9 21 10 29 2-2-2-3-5-4-8z"/><circle cx="32" cy="13" r="2"/><circle cx="39" cy="20" r="1.5"/></svg></span>
        <div><small>Nocturno</small><strong>${reportNumber(night, 1)} L</strong><span>${reportNumber(nightPct, 0)}% del total</span></div>
      </article>
    </div>
    <div class="shift-balance" role="img" aria-label="Comparación de combustible entre turno Diurno y Nocturno">
      <div class="shift-balance-bar"><span class="day" style="width:${dayPct.toFixed(2)}%"></span><span class="night" style="width:${nightPct.toFixed(2)}%"></span></div>
      <div class="shift-balance-footer"><span><i class="day"></i>Diurno</span><strong>${escapeHtml(dominant)}</strong><span><i class="night"></i>Nocturno</span></div>
    </div>`;
}

function renderAdminReports(message = "") {
  if (currentProfile?.role !== "admin" || !els.reportFuelTotal) return;
  const filters = reportFilters();
  if (filters.from > filters.to) {
    showToast("Fechas inválidas", "La fecha desde no puede ser posterior a la fecha hasta.", "error");
    return;
  }

  const breaks = reportBreaks.filter((item) => recordInReportRange(item.startAtClient, filters) && sameReportOperator(item, filters.operatorUid));
  const fuels = reportFuelLoads.filter((item) => recordInReportRange(item.createdAtClient, filters) && sameReportOperator(item, filters.operatorUid) && (!filters.machine || item.machine === filters.machine) && (!filters.shift || (item.shift || "day") === filters.shift));
  const servicesFiltered = reportServices.filter((item) => recordInReportRange(item.startAtClient, filters) && sameReportOperator(item, filters.operatorUid) && (!filters.machine || item.machine === filters.machine));
  const completedBreaks = breaks.filter((item) => item.endAtClient);
  const completedServices = servicesFiltered.filter((item) => item.endAtClient);
  const serviceHours = completedServices.reduce((sum, item) => sum + reportDurationMinutes(item.startAtClient, item.endAtClient) / 60, 0);
  const fuelTotal = fuels.reduce((sum, item) => sum + Number(item.liters || 0), 0);
  const activeServices = servicesFiltered.filter((item) => !item.endAtClient || item.status === "active").length;
  const dayLiters = fuels.filter((item) => (item.shift || "day") === "day").reduce((sum, item) => sum + Number(item.liters || 0), 0);
  const nightLiters = fuels.filter((item) => item.shift === "night").reduce((sum, item) => sum + Number(item.liters || 0), 0);

  els.reportFuelTotal.textContent = `${reportNumber(fuelTotal, 1)} L`;
  els.reportFuelDetail.textContent = `${fuels.length} carga${fuels.length === 1 ? "" : "s"}`;
  els.reportServiceHours.textContent = `${reportNumber(serviceHours, 1)} h`;
  els.reportServiceDetail.textContent = `${completedServices.length} finalizado${completedServices.length === 1 ? "" : "s"}${activeServices ? ` · ${activeServices} activo${activeServices === 1 ? "" : "s"}` : ""}`;
  if (els.reportDominantShift) els.reportDominantShift.textContent = fuelTotal ? (nightLiters > dayLiters ? "Nocturno" : "Diurno") : "Sin datos";

  const breaksByOperator = groupReportRows(completedBreaks, (item) => item.userName || "Sin operador", () => 1, (row) => `${row.count} descanso${row.count === 1 ? "" : "s"}`).sort((a, b) => b.count - a.count);
  const fuelByDay = groupReportRows(fuels, (item) => reportRecordDateKey(item.createdAtClient), (item) => Number(item.liters || 0), (row) => `${row.count} carga${row.count === 1 ? "" : "s"}`).sort((a, b) => a.label.localeCompare(b.label));
  const fuelByOperator = groupReportRows(fuels, (item) => item.operatorName || item.userName || "Sin operador", (item) => Number(item.liters || 0), (row) => `${row.count} carga${row.count === 1 ? "" : "s"}`).sort((a, b) => b.value - a.value);
  const fuelByMachine = groupReportRows(fuels, (item) => item.machine || "Sin máquina", (item) => Number(item.liters || 0), (row) => `${row.count} carga${row.count === 1 ? "" : "s"}`).sort((a, b) => b.value - a.value);
  const serviceByMachine = groupReportRows(completedServices, (item) => item.machine || "Sin máquina", (item) => reportDurationMinutes(item.startAtClient, item.endAtClient) / 60, (row) => `${row.count} servicio${row.count === 1 ? "" : "s"}`).sort((a, b) => b.value - a.value);
  const activeMachines = new Set([...fuels, ...servicesFiltered].map((item) => item.machine).filter(Boolean));

  if (els.reportMachineCount) els.reportMachineCount.textContent = reportNumber(activeMachines.size, 0);
  renderVerticalSvgChart(els.fuelByDayChart, fuelByDay, (value) => reportNumber(value, 0), { limit: 20 });
  renderShiftComparisonChart(els.fuelByShiftChart, dayLiters, nightLiters);
  renderHorizontalSvgChart(els.breaksByOperatorChart, breaksByOperator.map((row) => ({ ...row, value: row.count })), (value) => reportNumber(value, 0), { limit: 10 });
  renderDonutSvgChart(els.fuelByMachineChart, fuelByMachine, (value) => `${reportNumber(value, 0)} L`);
  renderVerticalSvgChart(els.serviceByMachineChart, serviceByMachine, (value) => reportNumber(value, 1), { limit: 10 });
  renderLineSvgChart(els.reportSummaryChart, fuelByDay, groupReportRows(completedServices, (item) => reportRecordDateKey(item.startAtClient), (item) => reportDurationMinutes(item.startAtClient, item.endAtClient) / 60).sort((a,b)=>a.label.localeCompare(b.label)));
  if (els.fuelByOperatorChart) renderReportBars(els.fuelByOperatorChart, fuelByOperator, (value) => `${reportNumber(value, 1)} L`);
  renderReportServiceTable(servicesFiltered);

  if (els.reportsLastUpdated) {
    const source = navigator.onLine && !localSession ? "Firebase" : "datos guardados";
    els.reportsLastUpdated.textContent = message || (reportLoadedAt ? `Actualizado ${formatDateTime(reportLoadedAt)} · ${source}` : "Todavía no se cargaron datos.");
  }
}

function renderReportServiceTable(records) {
  if (!els.reportServiceTable || !els.reportServiceTableCount) return;
  const rows = [...records].sort((a, b) => String(b.startAtClient || "").localeCompare(String(a.startAtClient || ""))).slice(0, 100);
  els.reportServiceTableCount.textContent = `${records.length} registro${records.length === 1 ? "" : "s"}`;
  if (!rows.length) {
    els.reportServiceTable.innerHTML = '<div class="empty-state">Sin servicios para el período seleccionado.</div>';
    return;
  }
  els.reportServiceTable.innerHTML = `<table class="report-table responsive-report-table"><thead><tr><th>Fecha</th><th>Máquina</th><th>Operador</th><th>Mecánico</th><th>Duración</th><th>Estado</th></tr></thead><tbody>${rows.map((item) => {
    const completed = Boolean(item.endAtClient);
    const duration = completed ? `${reportNumber(reportDurationMinutes(item.startAtClient, item.endAtClient) / 60, 2)} h` : "En curso";
    return `<tr><td data-label="Fecha">${escapeHtml(formatDate(item.startAtClient))}<br><small>${escapeHtml(formatTime(item.startAtClient))}</small></td><td data-label="Máquina"><strong>${escapeHtml(item.machine || "-")}</strong></td><td data-label="Operador">${escapeHtml(item.operatorName || "-")}</td><td data-label="Mecánico">${escapeHtml(item.mechanicName || "-")}</td><td data-label="Duración">${escapeHtml(duration)}</td><td data-label="Estado"><span class="badge ${completed ? "active" : "warning"}">${completed ? "Finalizado" : "Activo"}</span></td></tr>`;
  }).join("")}</tbody></table>`;
}

function renderActivity() {
  if (!currentProfile) return;
  const role = currentProfile.role;
  const operatorMode = role === "operator";
  const adminMode = role === "admin";

  if (els.operatorActivityTabs) els.operatorActivityTabs.classList.toggle("hidden", !operatorMode);
  if (els.activityDateFilter) {
    els.activityDateFilter.closest(".activity-date-filter")?.classList.toggle("hidden", !operatorMode);
    if (!els.activityDateFilter.value) els.activityDateFilter.value = todayKey();
  }
  els.adminActivityControls?.classList.toggle("hidden", !adminMode);

  if (adminMode) {
    els.operatorPartsActivity?.classList.add("hidden");
    els.operatorBreaksActivity?.classList.add("hidden");
    els.generalActivityList?.classList.remove("hidden");

    const allRecords = buildActivityRecords();
    const people = new Map();
    allRecords.forEach((record) => { if (record.personUid && record.personName) people.set(record.personUid, record.personName); });
    if (els.adminActivityPerson) {
      const previous = els.adminActivityPerson.value;
      els.adminActivityPerson.innerHTML = '<option value="">Todos los usuarios</option>' + Array.from(people.entries()).sort((a,b)=>a[1].localeCompare(b[1])).map(([uid,name]) => `<option value="${escapeHtml(uid)}">${escapeHtml(name)}</option>`).join("");
      els.adminActivityPerson.value = people.has(previous) ? previous : "";
    }

    const type = els.adminActivityType?.value || "all";
    const person = els.adminActivityPerson?.value || "";
    const date = els.adminActivityDate?.value || "";
    const search = String(els.adminActivitySearch?.value || "").trim().toLowerCase();
    const records = allRecords.filter((record) => {
      if (type !== "all" && record.type !== type) return false;
      if (person && record.personUid !== person) return false;
      if (date && reportRecordDateKey(record.date) !== date) return false;
      if (search) {
        const haystack = `${record.title || ""} ${record.detail || ""} ${record.personName || ""} ${record.machine || ""}`.toLowerCase();
        if (!haystack.includes(search)) return false;
      }
      return true;
    });

    if (els.adminActivityTotal) els.adminActivityTotal.textContent = String(allRecords.length);
    if (els.adminActivityParts) els.adminActivityParts.textContent = String(allRecords.filter((item) => item.type === "part").length);
    if (els.adminActivityBreaks) els.adminActivityBreaks.textContent = String(allRecords.filter((item) => item.type === "break").length);
    if (els.adminActivityServices) els.adminActivityServices.textContent = String(allRecords.filter((item) => item.type === "service").length);
    if (els.adminActivityFuel) els.adminActivityFuel.textContent = String(allRecords.filter((item) => item.type === "fuel").length);

    if (els.generalActivityList) els.generalActivityList.innerHTML = records.length
      ? records.map(activityTemplate).join("")
      : '<div class="empty-state">No hay registros que coincidan con los filtros.</div>';
    return;
  }

  if (!operatorMode) {
    els.operatorPartsActivity?.classList.add("hidden");
    els.operatorBreaksActivity?.classList.add("hidden");
    els.generalActivityList?.classList.remove("hidden");
    const records = buildActivityRecords();
    if (els.generalActivityList) els.generalActivityList.innerHTML = records.length ? records.map(activityTemplate).join("") : '<div class="empty-state">Sin actividad para mostrar.</div>';
    return;
  }

  els.generalActivityList?.classList.add("hidden");
  const dateKey = els.activityDateFilter?.value || "";
  const parts = [...userParts]
    .filter((part) => !dateKey || String(part.dateKey || part.date || "").slice(0, 10) === dateKey)
    .sort((a, b) => String(b.updatedAtClient || b.createdAtClient || b.dateKey || "").localeCompare(String(a.updatedAtClient || a.createdAtClient || a.dateKey || "")));
  const breaks = [...breakRecords]
    .filter((record) => !dateKey || reportRecordDateKey(record.startAtClient) === dateKey)
    .sort((a, b) => String(b.startAtClient || "").localeCompare(String(a.startAtClient || "")));

  const tabs = els.operatorActivityTabs?.querySelectorAll("[data-activity-tab]") || [];
  tabs.forEach((button) => {
    const active = button.dataset.activityTab === operatorActivityTab;
    button.classList.toggle("active", active);
    button.setAttribute("aria-selected", active ? "true" : "false");
  });
  els.operatorPartsActivity?.classList.toggle("hidden", operatorActivityTab !== "parts");
  els.operatorBreaksActivity?.classList.toggle("hidden", operatorActivityTab !== "breaks");

  if (els.operatorPartsActivity) {
    els.operatorPartsActivity.innerHTML = parts.length ? parts.map((part) => {
      const hours = partOperatingHours(part);
      const status = part.syncStatus === "pending" ? "Pendiente" : part.status === "active" ? "En progreso" : "Completado";
      const statusClass = part.syncStatus === "pending" ? "pending" : part.status === "active" ? "warning" : "complete";
      return `<article class="operator-record-card"><span class="operator-record-icon">${iconSvg("tractor")}</span><div class="operator-record-copy"><strong>${escapeHtml(part.machine || "Máquina sin definir")}</strong><span>${iconSvg("calendar")} ${escapeHtml(formatDate(part.dateKey || part.createdAtClient))}</span><span>${iconSvg("clock")} ${hours ? `${reportNumber(hours, 1)} h operadas` : "Sin cierre de horómetro"}</span></div><span class="record-status ${statusClass}">${status}</span><button class="record-chevron" type="button" data-open-part="${escapeHtml(part.id || "")}" aria-label="Abrir Parte">${iconSvg("chevron-right")}</button></article>`;
    }).join("") : '<div class="empty-state">No hay Partes para la fecha seleccionada.</div>';
    els.operatorPartsActivity.querySelectorAll("[data-open-part]").forEach((button) => button.addEventListener("click", () => {
      const part = userParts.find((item) => item.id === button.dataset.openPart);
      if (part) { currentPart = part; showSection("part"); renderPart(); }
    }));
  }
  if (els.operatorBreaksActivity) {
    els.operatorBreaksActivity.innerHTML = breaks.length ? breaks.map((record) => {
      const completed = Boolean(record.endAtClient);
      const status = record.syncStatus === "pending" ? "Pendiente" : completed ? "Completado" : "En curso";
      const statusClass = record.syncStatus === "pending" ? "pending" : completed ? "complete" : "warning";
      return `<article class="operator-record-card"><span class="operator-record-icon break-record-icon">${iconSvg("bed")}</span><div class="operator-record-copy"><strong>${completed ? "Descanso registrado" : "Descanso en curso"}</strong><span>${iconSvg("calendar")} ${escapeHtml(formatDate(record.startAtClient))}</span><span>${iconSvg("clock")} ${escapeHtml(formatTime(record.startAtClient))}${completed ? ` – ${escapeHtml(formatTime(record.endAtClient))} · ${escapeHtml(formatDuration(record.startAtClient, record.endAtClient).slice(0,5))}` : ""}</span></div><span class="record-status ${statusClass}">${status}</span><button class="record-chevron" type="button" data-section-link="break" aria-label="Abrir Descanso">${iconSvg("chevron-right")}</button></article>`;
    }).join("") : '<div class="empty-state">No hay marcas de descanso para la fecha seleccionada.</div>';
    els.operatorBreaksActivity.querySelectorAll("[data-section-link]").forEach((button) => button.addEventListener("click", () => showSection("break")));
  }
}

function renderBreak() {
  const active = Boolean(currentBreak?.status === "active");
  els.breakBadge.textContent = active ? "Activo" : "Disponible";
  els.breakBadge.className = `badge ${active ? "active" : "neutral"}`;
  els.breakTitle.textContent = active ? "Descanso en curso" : "Sin descanso activo";
  els.breakDescription.textContent = active ? `Iniciado ${formatDateTime(currentBreak.startAtClient)}` : "Puedes iniciar tu descanso.";
  els.startBreakButton.disabled = active;
  els.endBreakButton.disabled = !active;
  els.breakRecentList.innerHTML = breakRecords.slice(0, 5).map((record) => activityTemplate({ icon: "bed", title: record.status === "active" ? "Descanso activo" : "Descanso completado", detail: record.status === "active" ? "En curso" : formatDuration(record.startAtClient, record.endAtClient), date: record.startAtClient, status: record.syncStatus })).join("") || '<div class="empty-state">Sin descansos registrados.</div>';
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
      showToast("Conexion recuperada", "Para enviar los pendientes, ingresa una vez con correo y contraseña.", "error");
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

function partsForDate(dateKey) {
  return userParts
    .filter((part) => part.dateKey === dateKey)
    .sort((a, b) => String(b.updatedAtClient || b.createdAtClient || "").localeCompare(String(a.updatedAtClient || a.createdAtClient || "")));
}

function normalizePartRecord(source = {}) {
  const operatorUid = String(source.operatorUid || source.uid || currentUser?.uid || "").trim();
  if (!operatorUid) throw new Error("El parte no tiene un usuario asociado. Vuelve a iniciar sesion y reintenta.");

  const dateKey = String(source.dateKey || partDraftDate || els.partDateInput?.value || todayKey());
  const machine = String(source.machine || "").trim();
  const sourceId = String(source.id || "");
  const generatedId = makePartId(operatorUid, dateKey, machine);
  const id = (!sourceId || sourceId.includes("undefined") || sourceId.includes("null"))
    ? (generatedId || `${operatorUid}_${dateKey}_${uuid()}`)
    : sourceId;

  return {
    ...source,
    id,
    uid: operatorUid,
    operatorUid,
    operatorName: source.operatorName || currentProfile?.name || currentUser?.email || "Operador",
    dateKey,
    establishment: source.establishment || "LAS CANIAS",
    machine,
    machineKey: machineKey(machine),
    status: source.status || "active",
    horometers: source.horometers && typeof source.horometers === "object" ? source.horometers : {},
    production: {
      // Compatibilidad: los Partes antiguos guardaban la propiedad "trozo".
      troza: Number(source.production?.troza ?? source.production?.trozo ?? 0),
      pulpa: Number(source.production?.pulpa || 0)
    },
    createdAtClient: source.createdAtClient || localIso(),
    updatedAtClient: source.updatedAtClient || localIso(),
    syncStatus: source.syncStatus === "synced" ? "synced" : "pending"
  };
}

async function repairPendingParts() {
  const pendingParts = userParts.filter((part) => part.syncStatus !== "synced");
  for (const source of pendingParts) {
    const repaired = normalizePartRecord(source);
    await OfflineDB.putPart(repaired);
    await OfflineDB.putOperatorPart(repaired);
    await queueForSync({ id: `part:${repaired.id}`, uid: repaired.operatorUid, type: "part-upsert", payload: repaired });
  }
  userParts = (await OfflineDB.getParts(currentUser.uid).catch(() => userParts)).map(normalizePartRecord);
  if (currentPart) currentPart = userParts.find((part) => part.id === currentPart.id) || currentPart;
}

function createPartDraft() {
  const dateKey = els.partDateInput.value || partDraftDate || todayKey();
  const machine = els.machineInput.value;
  if (!machine) throw new Error("Selecciona la maquina antes de registrar horometros.");
  const id = makePartId(currentUser.uid, dateKey, machine);
  const duplicate = userParts.find((part) => part.id === id || (part.dateKey === dateKey && machineKey(part.machine) === machineKey(machine)));
  if (duplicate) {
    currentPart = duplicate;
    partDraftDate = duplicate.dateKey;
    renderPart();
    throw new Error("Ya existe un parte para esta maquina y fecha. Se abrio el parte existente.");
  }
  currentPart = normalizePartRecord({
    id,
    uid: currentUser.uid,
    operatorUid: currentUser.uid,
    operatorName: currentProfile.name,
    dateKey,
    establishment: els.establishmentInput.value || "LAS CANIAS",
    machine,
    status: "active",
    horometers: {},
    production: { troza: 0, pulpa: 0 },
    createdAtClient: localIso(),
    updatedAtClient: localIso(),
    syncStatus: "pending"
  });
  userParts = userParts.filter((part) => part.id !== currentPart.id).concat(currentPart);
  return currentPart;
}

function ensurePart() {
  if (currentPart) {
    currentPart = normalizePartRecord(currentPart);
    return currentPart;
  }
  return createPartDraft();
}

function startNewPart() {
  currentPart = null;
  partDraftDate = todayKey();
  els.partForm.reset();
  els.establishmentInput.value = "LAS CANIAS";
  els.partDateInput.value = partDraftDate;
  renderPart();
  showSection("part");
  showToast("Nuevo parte", "Selecciona la maquina y completa la jornada.");
}

function selectPartSession() {
  const id = els.partSessionSelect.value;
  if (!id) {
    startNewPart();
    return;
  }
  const selected = userParts.find((part) => part.id === id);
  if (!selected) return;
  currentPart = selected;
  partDraftDate = selected.dateKey;
  renderPart();
}

function handlePartDateChange() {
  if (currentPart) return;
  partDraftDate = els.partDateInput.value || todayKey();
  renderPartSessionSelector();
}

function renderPartSessionSelector() {
  const dateKey = currentPart?.dateKey || partDraftDate || todayKey();
  const records = partsForDate(dateKey);
  els.partSessionSelect.innerHTML = '<option value="">+ Nuevo parte</option>' + records.map((part) => {
    const state = part.syncStatus === "pending" ? "Pendiente" : "Guardado";
    return `<option value="${escapeHtml(part.id)}">${escapeHtml(part.machine || "Sin maquina")} · ${state}</option>`;
  }).join("");
  els.partSessionSelect.value = currentPart?.id || "";
  els.partSessionInfo.textContent = records.length
    ? `${records.length} parte${records.length === 1 ? "" : "s"} para ${formatDate(`${dateKey}T12:00:00`)}`
    : `No hay partes para ${formatDate(`${dateKey}T12:00:00`)}.`;
}

function evidencePreview(evidence, label = "Evidencia") {
  if (!evidence) return '<span class="admin-evidence-empty">Sin evidencia</span>';
  const photoUrl = evidence.photoUrl || "";
  const location = evidence.location || null;
  return `<div class="admin-evidence-preview">${photoUrl ? `<a class="admin-evidence-photo" href="${escapeHtml(photoUrl)}" target="_blank" rel="noopener"><img src="${escapeHtml(photoUrl)}" alt="${escapeHtml(label)}" loading="lazy"><span>Ampliar foto</span></a>` : '<span class="admin-evidence-empty">Sin foto</span>'}${location ? `<a class="admin-map-button" href="${mapUrl(location)}" target="_blank" rel="noopener">${iconSvg("map-pin")} Ver ubicación</a>` : '<span class="admin-evidence-empty">Sin ubicación</span>'}</div>`;
}
function partEvidenceLink(stage) { return evidencePreview(stage?.evidence, "Evidencia de horómetro"); }

function renderAdminParts() {
  if (!els.adminPartsList || currentProfile?.role !== "admin") return;
  const search = String(els.adminPartsSearch?.value || "").trim().toLowerCase();
  const dateFilter = String(els.adminPartsDateFilter?.value || "");
  const operatorFilter = String(els.adminPartsOperatorFilter?.value || "");
  const operators = new Map();
  operatorParts.forEach((part) => operators.set(part.operatorUid || part.uid || "", part.operatorName || "Operador"));
  if (els.adminPartsOperatorFilter) {
    const previous = els.adminPartsOperatorFilter.value;
    els.adminPartsOperatorFilter.innerHTML = '<option value="">Todos los operadores</option>' + Array.from(operators.entries()).sort((a,b)=>String(a[1]).localeCompare(String(b[1]))).map(([uid,name]) => `<option value="${escapeHtml(uid)}">${escapeHtml(name)}</option>`).join("");
    els.adminPartsOperatorFilter.value = operators.has(previous) ? previous : operatorFilter;
  }
  const visible = operatorParts.filter((part) => {
    if (dateFilter && part.dateKey !== dateFilter) return false;
    if (operatorFilter && (part.operatorUid || part.uid) !== operatorFilter) return false;
    if (!search) return true;
    return [part.operatorName, part.machine, part.establishment, part.dateKey].some((value) => String(value || "").toLowerCase().includes(search));
  });
  if (els.adminPartsCount) els.adminPartsCount.textContent = `${visible.length} Parte${visible.length === 1 ? "" : "s"}`;
  if (!visible.length) {
    els.adminPartsList.innerHTML = `<div class="empty-state"><strong>No hay Partes para mostrar.</strong><br><span>${navigator.onLine ? "Verifica que el operador vea el estado Sincronizado y presiona Actualizar." : "Conecta el dispositivo a Internet para consultar Firebase."}</span></div>`;
    return;
  }
  els.adminPartsList.innerHTML = visible.map((part) => {
    const created = part.updatedAtClient || part.createdAtClient;
    const initial = part.horometers?.initial;
    const breakStage = part.horometers?.break;
    const postBreak = part.horometers?.postBreak;
    const final = part.horometers?.final;
    const hours = partOperatingHours(part);
    const statusClass = part.syncStatus === "pending" ? "warning" : "active";
    const statusText = part.syncStatus === "pending" ? "Pendiente" : "Sincronizado";
    return `<article class="admin-part-card" data-admin-part-card="${escapeHtml(part.id)}">
      <button class="admin-part-summary" type="button" data-admin-part-toggle="${escapeHtml(part.id)}">
        <span class="admin-part-primary"><span class="admin-part-machine-icon">${iconSvg("clipboard")}</span><span><strong>${escapeHtml(part.operatorName || "Operador")}</strong><span>${escapeHtml(part.machine || "Sin máquina")} · ${escapeHtml(part.establishment || "-")}</span></span></span>
        <span class="admin-part-metric"><strong>${formatDate(`${part.dateKey || ""}T12:00:00`)}</strong><span>Fecha del Parte</span></span>
        <span class="admin-part-metric"><strong>${formatHours(hours)}</strong><span>Horas operadas</span></span>
        <span class="admin-part-status"><span class="badge ${statusClass}">${statusText}</span><svg class="admin-part-chevron"><use href="#icon-chevron-right"></use></svg></span>
      </button>
      <div class="admin-part-details">
        <div class="admin-part-detail-grid">
          <div class="admin-part-detail-box"><span>Operador</span><strong>${escapeHtml(part.operatorName || "-")}</strong></div>
          <div class="admin-part-detail-box"><span>Máquina</span><strong>${escapeHtml(part.machine || "-")}</strong></div>
          <div class="admin-part-detail-box"><span>Troza</span><strong>${Number(part.production?.troza ?? part.production?.trozo ?? 0).toLocaleString("es-UY")}</strong></div>
          <div class="admin-part-detail-box"><span>Pulpa</span><strong>${Number(part.production?.pulpa || 0).toLocaleString("es-UY")}</strong></div>
        </div>
        <div class="admin-part-horometers">
          <div class="admin-part-horometer"><span>Horómetro inicial</span><strong>${initial?.value ?? "-"}</strong>${partEvidenceLink(initial)}</div>
          <div class="admin-part-horometer"><span>Horómetro descanso</span><strong>${breakStage?.value ?? "-"}</strong>${partEvidenceLink(breakStage)}</div>
          <div class="admin-part-horometer"><span>Horómetro post descanso</span><strong>${postBreak?.value ?? "-"}</strong>${partEvidenceLink(postBreak)}</div>
          <div class="admin-part-horometer"><span>Horómetro final</span><strong>${final?.value ?? "-"}</strong>${partEvidenceLink(final)}</div>
        </div>
        <div class="admin-part-footer"><span>ID: ${escapeHtml(part.id)}</span><span>Actualizado: ${formatDateTime(created)} · Fuente: ${part._source === "legacy" ? "registro heredado" : "operationalParts"}</span></div>
      </div>
    </article>`;
  }).join("");
  els.adminPartsList.querySelectorAll("[data-admin-part-toggle]").forEach((button) => button.addEventListener("click", () => {
    const card = els.adminPartsList.querySelector(`[data-admin-part-card="${CSS.escape(button.dataset.adminPartToggle)}"]`);
    card?.classList.toggle("open");
  }));
}

function setAdminBreaksStatus(message, isError = false) {
  if (!els.adminBreaksStatus) return;
  els.adminBreaksStatus.textContent = message;
  els.adminBreaksStatus.classList.toggle("error", Boolean(isError));
}
function setAdminServicesStatus(message, isError = false) {
  if (!els.adminServicesStatus) return;
  els.adminServicesStatus.textContent = message;
  els.adminServicesStatus.classList.toggle("error", Boolean(isError));
}
function fillFilterSelect(element, values, placeholder) {
  if (!element) return;
  const previous = element.value;
  const rows = Array.from(values.entries ? values.entries() : values).sort((a, b) => String(a[1] ?? a[0]).localeCompare(String(b[1] ?? b[0]), "es", { numeric: true }));
  element.innerHTML = `<option value="">${escapeHtml(placeholder)}</option>` + rows.map(([value, label]) => `<option value="${escapeHtml(value)}">${escapeHtml(label)}</option>`).join("");
  if (rows.some(([value]) => String(value) === String(previous))) element.value = previous;
}
function renderAdminBreaks() {
  if (!els.adminBreaksList || currentProfile?.role !== "admin") return;
  const operatorMap = new Map();
  breakRecords.forEach((record) => { const uid = record.operatorUid || record.uid || ""; operatorMap.set(uid, record.userName || adminProfiles.get(uid)?.name || adminProfiles.get(uid)?.email || "Operador"); });
  fillFilterSelect(els.adminBreaksOperatorFilter, operatorMap, "Todos los operadores");
  const search = String(els.adminBreaksSearch?.value || "").trim().toLowerCase();
  const date = els.adminBreaksDateFilter?.value || "";
  const operator = els.adminBreaksOperatorFilter?.value || "";
  const status = els.adminBreaksStatusFilter?.value || "";
  const visible = [...breakRecords].filter((record) => {
    const uid = record.operatorUid || record.uid || "";
    const name = record.userName || adminProfiles.get(uid)?.name || "Operador";
    if (date && reportRecordDateKey(record.startAtClient) !== date) return false;
    if (operator && uid !== operator) return false;
    if (status && record.status !== status) return false;
    return !search || `${name} ${record.status || ""}`.toLowerCase().includes(search);
  }).sort((a,b)=>String(b.startAtClient||"").localeCompare(String(a.startAtClient||"")));
  els.adminBreaksCount.textContent = `${visible.length} descanso${visible.length === 1 ? "" : "s"}`;
  setAdminBreaksStatus(navigator.onLine ? `${breakRecords.length} registro${breakRecords.length === 1 ? "" : "s"} disponible${breakRecords.length === 1 ? "" : "s"} en Firebase.` : "Sin conexión: mostrando la última copia guardada.");
  if (!visible.length) { els.adminBreaksList.innerHTML = '<div class="empty-state"><strong>No hay descansos para los filtros seleccionados.</strong></div>'; return; }
  els.adminBreaksList.innerHTML = visible.map((record) => {
    const uid=record.operatorUid||record.uid||""; const name=record.userName||adminProfiles.get(uid)?.name||adminProfiles.get(uid)?.email||"Operador"; const active=record.status==="active"; const duration=active?formatDuration(record.startAtClient):formatDuration(record.startAtClient,record.endAtClient);
    return `<article class="admin-record-card admin-break-card"><header class="admin-record-card-header"><div class="admin-record-person"><span class="admin-record-avatar">${escapeHtml(initials(name))}</span><div><strong>${escapeHtml(name)}</strong><span>${formatDate(record.startAtClient)}</span></div></div><span class="badge ${active?"warning":"active"}">${active?"En curso":"Finalizado"}</span></header><div class="admin-record-metrics"><div><span>Inicio</span><strong>${formatTime(record.startAtClient)}</strong></div><div><span>Finalización</span><strong>${record.endAtClient?formatTime(record.endAtClient):"En curso"}</strong></div><div><span>Duración</span><strong>${duration}</strong></div></div><div class="admin-record-evidence-grid"><section><h4>Marcación inicial</h4>${evidencePreview(record.startEvidence,"Foto de inicio de descanso")}</section><section><h4>Marcación final</h4>${record.endEvidence?evidencePreview(record.endEvidence,"Foto de finalización de descanso"):'<span class="admin-evidence-empty">Pendiente de finalización</span>'}</section></div></article>`;
  }).join("");
}
function renderAdminServices() {
  if (!els.adminServicesList || currentProfile?.role !== "admin") return;
  const operators=new Map(), mechanics=new Map(), machines=new Map();
  services.forEach((record)=>{ if(record.operatorUid) operators.set(record.operatorUid,record.operatorName||"Operador"); if(record.mechanicUid) mechanics.set(record.mechanicUid,record.mechanicName||"Mecánico"); if(record.machine) machines.set(record.machine,record.machine); });
  fillFilterSelect(els.adminServicesOperatorFilter,operators,"Todos los operadores"); fillFilterSelect(els.adminServicesMechanicFilter,mechanics,"Todos los mecánicos"); fillFilterSelect(els.adminServicesMachineFilter,machines,"Todas las máquinas");
  const search=String(els.adminServicesSearch?.value||"").trim().toLowerCase(), date=els.adminServicesDateFilter?.value||"", operator=els.adminServicesOperatorFilter?.value||"", mechanic=els.adminServicesMechanicFilter?.value||"", machine=els.adminServicesMachineFilter?.value||"", status=els.adminServicesStatusFilter?.value||"";
  const visible=[...services].filter((record)=>{ if(date&&reportRecordDateKey(record.startAtClient)!==date)return false; if(operator&&record.operatorUid!==operator)return false; if(mechanic&&record.mechanicUid!==mechanic)return false; if(machine&&record.machine!==machine)return false; if(status&&record.status!==status)return false; const haystack=`${record.operatorName||""} ${record.mechanicName||""} ${record.machine||""} ${record.startReason||""} ${record.endReason||""}`.toLowerCase(); return !search||haystack.includes(search); }).sort((a,b)=>String(b.startAtClient||"").localeCompare(String(a.startAtClient||"")));
  els.adminServicesCount.textContent=`${visible.length} servicio${visible.length===1?"":"s"}`; setAdminServicesStatus(navigator.onLine?`${services.length} registro${services.length===1?"":"s"} disponible${services.length===1?"":"s"} en Firebase.`:"Sin conexión: mostrando la última copia guardada.");
  if(!visible.length){els.adminServicesList.innerHTML='<div class="empty-state"><strong>No hay servicios para los filtros seleccionados.</strong></div>';return;}
  els.adminServicesList.innerHTML=visible.map((record)=>{const active=record.status==="active",duration=active?formatDuration(record.startAtClient):formatDuration(record.startAtClient,record.endAtClient);return `<article class="admin-record-card admin-service-card"><header class="admin-record-card-header"><div class="admin-record-person"><span class="admin-record-avatar service">${iconSvg("wrench")}</span><div><strong>${escapeHtml(record.machine||"Máquina sin definir")}</strong><span>Parte ${escapeHtml(record.partId||"-")} · Servicio ${escapeHtml(record.serviceNumber||"-")}</span></div></div><span class="badge ${active?"warning":"active"}">${active?"En curso":"Finalizado"}</span></header><div class="admin-record-metrics service-metrics"><div><span>Operador</span><strong>${escapeHtml(record.operatorName||"-")}</strong></div><div><span>Mecánico</span><strong>${escapeHtml(record.mechanicName||"-")}</strong></div><div><span>Inicio</span><strong>${formatDateTime(record.startAtClient)}</strong></div><div><span>Finalización</span><strong>${record.endAtClient?formatDateTime(record.endAtClient):"En curso"}</strong></div><div><span>Duración</span><strong>${duration}</strong></div></div><div class="admin-service-description-grid"><section><span>Motivo de reparación</span><p>${escapeHtml(record.startReason||"Sin motivo registrado")}</p></section><section><span>Trabajo realizado</span><p>${escapeHtml(record.endReason||(active?"Servicio aún en curso":"Sin detalle"))}</p></section></div><div class="admin-record-evidence-grid"><section><h4>Inicio del servicio</h4>${evidencePreview(record.startEvidence,"Foto de inicio de servicio")}</section><section><h4>Finalización del servicio</h4>${record.endEvidence?evidencePreview(record.endEvidence,"Foto de finalización de servicio"):'<span class="admin-evidence-empty">Pendiente de finalización</span>'}</section></div></article>`;}).join("");
}

function renderPart() {
  const editing = Boolean(currentPart);
  const dateKey = currentPart?.dateKey || partDraftDate || todayKey();
  els.partDateInput.value = dateKey;
  els.partDateInput.max = todayKey();
  els.establishmentInput.value = currentPart?.establishment || "LAS CANIAS";
  els.machineInput.value = currentPart?.machine || "";
  els.trozoInput.value = currentPart?.production?.troza ?? currentPart?.production?.trozo ?? "";
  els.pulpaInput.value = currentPart?.production?.pulpa ?? "";
  els.machineInput.disabled = editing;
  els.partDateInput.disabled = editing;
  els.partStatus.textContent = currentPart ? (currentPart.syncStatus === "pending" ? "Pendiente" : "Guardado") : "Nuevo";
  els.partStatus.className = `badge ${currentPart?.syncStatus === "pending" ? "warning" : currentPart ? "active" : "neutral"}`;
  renderPartSessionSelector();
  els.horometerStages.innerHTML = HOROMETER_CONFIG.map((config, index) => {
    const stage = currentPart?.horometers?.[config.key] || {};
    const evidence = stage.evidence;
    return `<article class="stage-card"><div class="stage-title"><strong>${index + 1}. ${escapeHtml(config.label)}</strong><small>${escapeHtml(config.help)}</small></div><label class="field"><span>Valor</span><input type="number" inputmode="decimal" step="0.1" min="0" data-horometer-value="${config.key}" value="${escapeHtml(stage.value ?? "")}" placeholder="0"></label><div class="stage-actions"><button class="secondary-button" type="button" data-horometer-capture="${config.key}">${evidence ? "Repetir foto" : "Foto y GPS"}</button><span class="stage-status ${evidence ? "ready" : ""}">${evidence ? "Completo" : "Pendiente"}</span></div>${evidence ? `<div class="stage-evidence">${evidence.photoUrl || evidence.photoBlob ? `<img src="${evidence.photoUrl || URL.createObjectURL(evidence.photoBlob)}" alt="${escapeHtml(config.label)}">` : ""}<a href="${mapUrl(evidence.location)}" target="_blank" rel="noopener">Ver ubicacion en mapa</a></div>` : ""}</article>`;
  }).join("");
}

function captureHorometer(key) {
  let part;
  try { part = ensurePart(); }
  catch (error) { showToast("No se pudo iniciar el parte", error.message, "error"); return; }
  const input = document.querySelector(`[data-horometer-value="${key}"]`);
  const value = input?.value;
  if (!value) { showToast("Falta el horometro", "Ingresa el valor antes de tomar la evidencia.", "error"); return; }
  const config = HOROMETER_CONFIG.find((item) => item.key === key);
  openCapture({ title: config.label, subtitle: "Fotografia y ubicacion obligatorias.", requireGps: true, onConfirm: async (evidence) => {
    part.horometers[key] = { value: Number(value), evidence };
    part.updatedAtClient = localIso();
    part.syncStatus = "pending";
    currentPart = part;
    userParts = userParts.filter((item) => item.id !== part.id).concat(part);
    await OfflineDB.putPart(part);
    await OfflineDB.putOperatorPart(part);
    renderPart();
  }});
}

async function savePart(event) {
  event.preventDefault();
  if (!els.machineInput.value) { showToast("Selecciona la maquina", "La maquina es obligatoria.", "error"); return; }
  let part;
  try { part = ensurePart(); }
  catch (error) { showToast("No se pudo guardar", error.message, "error"); return; }
  document.querySelectorAll("[data-horometer-value]").forEach((input) => {
    if (input.value) {
      const key = input.dataset.horometerValue;
      part.horometers[key] = { ...(part.horometers[key] || {}), value: Number(input.value) };
    }
  });
  part.dateKey = currentPart?.dateKey || els.partDateInput.value || partDraftDate || todayKey();
  part.establishment = els.establishmentInput.value;
  part.machine = currentPart?.machine || els.machineInput.value;
  part.machineKey = machineKey(part.machine);
  part.id = currentPart?.id || makePartId(currentUser.uid, part.dateKey, part.machine);
  part.production = { troza: Number(els.trozoInput.value || 0), pulpa: Number(els.pulpaInput.value || 0) };
  part.updatedAtClient = localIso();
  part.syncStatus = "pending";
  currentPart = normalizePartRecord(part);
  userParts = userParts.filter((item) => item.id !== currentPart.id).concat(currentPart);
  await OfflineDB.putPart(currentPart);
  await OfflineDB.putOperatorPart(currentPart);
  await queueForSync({ id: `part:${currentPart.id}`, uid: currentPart.operatorUid, type: "part-upsert", payload: currentPart });
  renderAll();
  await updateSyncUi();
  if (navigator.onLine && firebaseReady && !localSession) {
    showToast("Parte guardado", "Validando el envío a Firebase...");
    await syncNow(false);
    try {
      const remote = await sdk.getDoc(sdk.doc(db, "operationalParts", currentPart.id));
      if (remote.exists()) showToast("Parte sincronizado", "El administrador ya puede verlo en Partes y Actividad.");
      else showToast("Parte pendiente", "El Parte quedó guardado en el dispositivo, pero todavía no llegó a Firebase.", "error");
    } catch (error) {
      showToast("Parte pendiente", friendlyError(error), "error");
    }
  } else {
    showToast("Parte guardado sin conexión", "Se enviará automáticamente cuando vuelva Internet.");
  }
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

function normalizeServiceRecord(source = {}) {
  const startAtClient = source.startAtClient || localIso();
  return {
    ...source,
    id: source.id || uuid(),
    partId: source.partId || "",
    partDateKey: source.partDateKey || source.dateKey || "",
    operatorUid: source.operatorUid || "",
    operatorName: source.operatorName || "Operador",
    machine: source.machine || "",
    mechanicUid: source.mechanicUid || currentUser?.uid || "",
    mechanicName: source.mechanicName || currentProfile?.name || "Mecanico",
    serviceNumber: Number(source.serviceNumber || 0),
    status: source.status || "active",
    startReason: source.startReason || "",
    endReason: source.endReason || "",
    startAtClient,
    endAtClient: source.endAtClient || null,
    startEvidence: source.startEvidence || null,
    endEvidence: source.endEvidence || null,
    syncStatus: source.syncStatus === "synced" ? "synced" : "pending"
  };
}

function assignServiceNumbers(records = []) {
  const chronological = [...records].sort((a, b) => String(a.startAtClient || "").localeCompare(String(b.startAtClient || "")));
  const used = new Set(chronological.map((item) => Number(item.serviceNumber || 0)).filter((number) => number > 0));
  let candidate = 1;
  chronological.forEach((record) => {
    if (Number(record.serviceNumber || 0) > 0) return;
    while (used.has(candidate)) candidate += 1;
    record.serviceNumber = candidate;
    used.add(candidate);
    candidate += 1;
  });
  return chronological.sort((a, b) => String(b.startAtClient || "").localeCompare(String(a.startAtClient || "")));
}

function nextServiceNumber(records = selectedPartServices) {
  return Math.max(records.length, ...records.map((item) => Number(item.serviceNumber || 0)), 0) + 1;
}

async function selectServicePart() {
  const partId = els.servicePartSelect.value;
  const part = operatorParts.find((item) => item.id === partId);
  els.serviceMachine.textContent = part?.machine || "-";
  els.serviceOperator.textContent = part?.operatorName || "-";
  selectedPartServices = [];
  serviceDraftMode = false;

  if (!part) {
    currentService = null;
    renderService();
    return;
  }

  const local = (await OfflineDB.getServicesForPart(partId)).map(normalizeServiceRecord);
  selectedPartServices = assignServiceNumbers(local);

  if (firebaseReady && navigator.onLine && !localSession) {
    const q = sdk.query(sdk.collection(db, "services"), sdk.where("partId", "==", partId));
    const snap = await sdk.getDocs(q);
    for (const item of snap.docs) {
      await OfflineDB.putService(normalizeServiceRecord({ id: item.id, ...item.data(), syncStatus: "synced" }));
    }
    selectedPartServices = assignServiceNumbers((await OfflineDB.getServicesForPart(partId)).map(normalizeServiceRecord));
  }

  currentService = selectedPartServices.find((item) => item.status === "active")
    || selectedPartServices[0]
    || null;
  serviceDraftMode = selectedPartServices.length === 0;
  if (serviceDraftMode) clearServiceForm();
  renderService();
}

function evidenceBox(element, evidence, emptyText) {
  if (!evidence) { element.className = "evidence-box empty"; element.textContent = emptyText; return; }
  const source = evidence.photoUrl || (evidence.photoBlob ? URL.createObjectURL(evidence.photoBlob) : "");
  element.className = "evidence-box ready";
  element.innerHTML = `${source ? `<img src="${source}" alt="Evidencia">` : ""}<div><strong>Evidencia registrada</strong><br><a href="${mapUrl(evidence.location)}" target="_blank" rel="noopener">Ver ubicacion</a><br><small>${formatDateTime(evidence.capturedAtClient)}</small></div>`;
}

function serviceSessionTemplate(record) {
  const active = record.status === "active";
  const number = Number(record.serviceNumber || 0) || "-";
  const duration = active
    ? formatDuration(record.startAtClient)
    : formatDuration(record.startAtClient, record.endAtClient);
  const status = active ? "En curso" : "Finalizado";
  const statusClass = active ? "active" : "synced";
  return `<article class="service-session-item ${active ? "is-active" : ""}">
    <div class="service-session-main">
      <div class="service-session-title">
        <span class="service-session-number">Servicio ${escapeHtml(number)}</span>
        <span class="service-session-status ${statusClass}">${status}</span>
      </div>
      <strong>${escapeHtml(record.startReason || "Sin motivo registrado")}</strong>
      <small>${formatDate(record.startAtClient)} · ${formatTime(record.startAtClient)}${record.endAtClient ? ` a ${formatTime(record.endAtClient)}` : ""}</small>
    </div>
    <div class="service-session-duration"><span>Duracion</span><strong>${duration}</strong></div>
  </article>`;
}

function renderServiceSessionList() {
  const total = selectedPartServices.length;
  if (els.serviceSessionCount) {
    els.serviceSessionCount.textContent = `${total} servicio${total === 1 ? "" : "s"}`;
  }
  if (!els.serviceSessionList) return;
  els.serviceSessionList.innerHTML = total
    ? selectedPartServices.map(serviceSessionTemplate).join("")
    : '<div class="empty-state compact">Este Parte todavia no tiene servicios registrados.</div>';
}

function clearServiceForm() {
  els.serviceStartReason.value = "";
  els.serviceEndReason.value = "";
  evidenceBox(els.serviceStartEvidence, null, "Foto y ubicacion pendientes");
  evidenceBox(els.serviceEndEvidence, null, "Foto y ubicacion pendientes");
}

function beginNewServiceSession() {
  const part = operatorParts.find((item) => item.id === els.servicePartSelect.value);
  const active = selectedPartServices.find((item) => item.status === "active");
  if (!part) {
    showToast("Selecciona un Parte", "El nuevo servicio debe quedar asociado a un Parte diario.", "error");
    return;
  }
  if (active) {
    currentService = active;
    serviceDraftMode = false;
    renderService();
    showToast("Servicio en curso", "Finaliza el servicio activo antes de iniciar otro.", "error");
    return;
  }
  currentService = null;
  serviceDraftMode = true;
  clearServiceForm();
  renderService();
  els.serviceStartReason.focus();
  showToast("Nuevo servicio", `Se creara el servicio ${nextServiceNumber()} para este Parte.`);
}

function renderService() {
  const part = operatorParts.find((item) => item.id === els.servicePartSelect.value);
  if (part) {
    els.serviceMachine.textContent = part.machine || "-";
    els.serviceOperator.textContent = part.operatorName || "-";
  }

  const activeRecord = selectedPartServices.find((item) => item.status === "active") || null;
  if (activeRecord) currentService = activeRecord;
  const active = currentService?.status === "active";
  const completed = currentService?.status === "completed" && !serviceDraftMode;

  els.serviceStatus.textContent = active
    ? `Servicio ${currentService.serviceNumber || ""} en curso`.trim()
    : serviceDraftMode
      ? `Nuevo servicio ${nextServiceNumber()} listo para iniciar`
      : completed
        ? `Servicio ${currentService.serviceNumber || ""} finalizado`.trim()
        : "Sin servicio activo";

  els.serviceStartedAt.textContent = active || completed
    ? `Iniciado ${formatDateTime(currentService.startAtClient)}`
    : part
      ? "Completa el motivo y registra la evidencia para iniciar."
      : "Selecciona un Parte para comenzar.";

  if (!serviceDraftMode) els.serviceStartReason.value = currentService?.startReason || "";
  if (active || completed) els.serviceEndReason.value = currentService?.endReason || "";
  else if (!serviceDraftMode) els.serviceEndReason.value = "";
  evidenceBox(els.serviceStartEvidence, serviceDraftMode ? null : currentService?.startEvidence, "Foto y ubicacion pendientes");
  evidenceBox(els.serviceEndEvidence, active || completed ? currentService?.endEvidence : null, "Foto y ubicacion pendientes");

  els.serviceStartReason.disabled = !part || active || completed;
  els.serviceEndReason.disabled = !active;
  els.startServiceButton.disabled = !part || active || completed || !serviceDraftMode;
  els.endServiceButton.disabled = !active;
  els.newServiceButton.disabled = !part || active;
  els.newServiceButton.textContent = active ? "Servicio en curso" : "+ Nuevo servicio";
  renderServiceSessionList();
}

async function startService() {
  const part = operatorParts.find((item) => item.id === els.servicePartSelect.value);
  if (!part) { showToast("Selecciona un Parte", "Debes elegir el operador y la maquina.", "error"); return; }
  if (selectedPartServices.some((item) => item.status === "active")) {
    showToast("Servicio en curso", "Finaliza el servicio actual antes de iniciar uno nuevo.", "error");
    return;
  }
  if (!serviceDraftMode) {
    beginNewServiceSession();
    return;
  }
  if (!els.serviceStartReason.value.trim()) { showToast("Falta el motivo", "Describe la falla o reparacion.", "error"); return; }

  openCapture({ title: "Inicio de reparacion", subtitle: "Foto y ubicacion obligatorias.", requireGps: true, onConfirm: async (evidence) => {
    const record = normalizeServiceRecord({
      id: uuid(),
      partId: part.id,
      partDateKey: part.dateKey,
      operatorUid: part.operatorUid,
      operatorName: part.operatorName,
      machine: part.machine,
      mechanicUid: currentUser.uid,
      mechanicName: currentProfile.name,
      serviceNumber: nextServiceNumber(),
      status: "active",
      startReason: els.serviceStartReason.value.trim(),
      startAtClient: localIso(),
      startEvidence: evidence,
      syncStatus: "pending"
    });
    currentService = record;
    serviceDraftMode = false;
    selectedPartServices = [record, ...selectedPartServices.filter((item) => item.id !== record.id)];
    services = [record, ...services.filter((item) => item.id !== record.id)];
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
    currentService = normalizeServiceRecord({
      ...currentService,
      status: "completed",
      endReason: els.serviceEndReason.value.trim(),
      endAtClient: localIso(),
      endEvidence: evidence,
      syncStatus: "pending"
    });
    selectedPartServices = selectedPartServices.map((item) => item.id === currentService.id ? currentService : item);
    services = services.map((item) => item.id === currentService.id ? currentService : item);
    await OfflineDB.putService(currentService);
    await queueForSync({ id: `service:${currentService.id}`, uid: currentUser.uid, type: "service-upsert", payload: currentService });
    serviceDraftMode = false;
    renderAll();
    showToast("Servicio finalizado", "Quedo guardado como una sesion independiente asociada al Parte.");
    await updateSyncUi();
    syncNow(false).catch(console.warn);
  }});
}

async function loadFuelSection() {
  if (firebaseReady && navigator.onLine && !localSession && ["mechanic", "admin"].includes(currentProfile?.role)) {
    const tankSnap = await sdk.getDoc(sdk.doc(db, "tanks", "main"));
    if (tankSnap.exists()) { tank = { id: "main", ...tankSnap.data() }; await OfflineDB.putTank(tank); }
    let q;
    if (currentProfile.role === "admin") q = sdk.collection(db, "fuelLoads");
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
  renderDashboardOverview();
}

function renderFuelRecent() {
  const rows = fuelLoads.slice(0, 8).map((record) => `
    <tr>
      <td>${formatDate(record.createdAtClient)}<br><small>${formatTime(record.createdAtClient)}</small></td>
      <td>${escapeHtml(record.machine || "-")}</td>
      <td><strong>${liters(record.liters)}</strong></td>
      <td>${record.shift === "night" ? "Nocturno" : "Diurno"}</td>
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

function updateCleanupButtonState() {
  if (!els.cleanupDataButton) return;
  const selected = [els.cleanupParts, els.cleanupServices, els.cleanupFuel, els.cleanupTank].some((input) => input?.checked);
  els.cleanupDataButton.disabled = currentProfile?.role !== "admin" || !selected || String(els.cleanupConfirmInput?.value || "").trim().toUpperCase() !== "ELIMINAR";
}

async function applyGlobalOperationalReset() {
  if (!firebaseReady || !navigator.onLine || !currentUser || localSession) return false;
  try {
    const snap = await sdk.getDoc(sdk.doc(db, "system", "maintenance"));
    if (!snap.exists()) return false;
    const data = snap.data();
    const resetAt = String(data.operationalResetAtClient || "");
    if (!resetAt) return false;
    const applied = String(await OfflineDB.getSetting(DATA_RESET_SETTING_KEY).catch(() => "") || "");
    if (applied && applied >= resetAt) return false;
    const scopes = Array.isArray(data.operationalResetScopes) ? data.operationalResetScopes : ["parts", "services", "fuel"];
    await OfflineDB.clearOperationalData(scopes);
    await OfflineDB.setSetting(DATA_RESET_SETTING_KEY, resetAt);
    await loadAllLocalData();
    renderAll();
    showToast("Datos de prueba limpiados", "Este dispositivo aplicó la limpieza definida por el administrador.");
    return true;
  } catch (error) {
    console.warn("Limpieza global", error);
    return false;
  }
}

async function deleteDocumentsInBatches(docRefs, batchSize = 350) {
  for (let start = 0; start < docRefs.length; start += batchSize) {
    const batch = sdk.writeBatch(db);
    docRefs.slice(start, start + batchSize).forEach((ref) => batch.delete(ref));
    await batch.commit();
  }
}

async function collectLegacyPartRefs() {
  const refs = [];
  const usersSnap = await sdk.getDocs(sdk.collection(db, "users"));
  for (const userDoc of usersSnap.docs) {
    const partSnap = await sdk.getDocs(sdk.collection(db, "users", userDoc.id, "parts"));
    partSnap.docs.forEach((docSnap) => refs.push(docSnap.ref));
  }
  return refs;
}

async function cleanupOperationalData() {
  if (currentProfile?.role !== "admin") return;
  if (!navigator.onLine || !firebaseReady || localSession) { showToast("Se necesita Internet", "La limpieza de Firebase solo puede ejecutarse en línea.", "error"); return; }
  updateCleanupButtonState();
  if (els.cleanupDataButton.disabled) return;
  const scopes = [];
  if (els.cleanupParts.checked) scopes.push("parts");
  if (els.cleanupServices.checked) scopes.push("services");
  if (els.cleanupFuel.checked) scopes.push("fuel");
  if (els.cleanupTank.checked) scopes.push("tank");
  try {
    showProcessing("Limpiando datos", "Eliminando registros de prueba. No cierres la aplicación...");
    const refs = [];
    let operationalParts = [];
    if (scopes.includes("parts") || scopes.includes("services")) {
      const partSnap = await sdk.getDocs(sdk.collection(db, "operationalParts"));
      operationalParts = partSnap.docs;
      if (scopes.includes("services")) {
        for (const partDoc of operationalParts) {
          const nestedServices = await sdk.getDocs(sdk.collection(db, "operationalParts", partDoc.id, "services"));
          nestedServices.docs.forEach((docSnap) => refs.push(docSnap.ref));
        }
        const servicesSnap = await sdk.getDocs(sdk.collection(db, "services"));
        servicesSnap.docs.forEach((docSnap) => refs.push(docSnap.ref));
      }
      if (scopes.includes("parts")) {
        refs.push(...await collectLegacyPartRefs());
        operationalParts.forEach((docSnap) => refs.push(docSnap.ref));
      }
    }
    if (scopes.includes("fuel")) {
      const fuelSnap = await sdk.getDocs(sdk.collection(db, "fuelLoads"));
      fuelSnap.docs.forEach((docSnap) => refs.push(docSnap.ref));
    }
    await deleteDocumentsInBatches(refs);
    if (scopes.includes("tank")) {
      const tankRef = sdk.doc(db, "tanks", "main");
      const tankSnap = await sdk.getDoc(tankRef);
      if (tankSnap.exists()) {
        await sdk.setDoc(tankRef, { currentLiters: 0, updatedAtClient: localIso(), updatedBy: currentUser.uid, updatedAt: sdk.serverTimestamp() }, { merge: true });
      }
    }
    const resetAt = localIso();
    await sdk.setDoc(sdk.doc(db, "system", "maintenance"), { operationalResetAtClient: resetAt, operationalResetScopes: scopes, operationalResetBy: currentUser.uid, operationalResetAt: sdk.serverTimestamp() }, { merge: true });
    await OfflineDB.clearOperationalData(scopes);
    await OfflineDB.setSetting(DATA_RESET_SETTING_KEY, resetAt);
    els.cleanupConfirmInput.value = "";
    updateCleanupButtonState();
    await loadAllLocalData();
    await refreshServerData();
    renderAll();
    showToast("Limpieza completada", `${refs.length} registro${refs.length === 1 ? "" : "s"} eliminado${refs.length === 1 ? "" : "s"}.`);
  } catch (error) {
    showToast("No se pudo completar la limpieza", friendlyError(error), "error");
  } finally {
    hideProcessing();
  }
}

function openProfilePhotoPicker(targetUid) {
  if (!currentUser || !targetUid || !els.profilePhotoInput) return;
  const canEdit = targetUid === currentUser.uid || currentProfile?.role === "admin";
  if (!canEdit) { showToast("Sin permiso", "Solo puedes cambiar tu propia foto.", "error"); return; }
  if (!navigator.onLine || !firebaseReady || localSession) { showToast("Se necesita Internet", "La foto de perfil se guarda en Firebase.", "error"); return; }
  profilePhotoTargetUid = targetUid;
  els.profilePhotoInput.value = "";
  els.profilePhotoInput.click();
}

async function handleProfilePhotoSelection(event) {
  const file = event.target.files?.[0];
  const targetUid = profilePhotoTargetUid;
  if (!file || !targetUid) return;
  if (!file.type.startsWith("image/")) { showToast("Archivo inválido", "Selecciona una imagen.", "error"); return; }
  try {
    showProcessing("Guardando foto", "Optimizando y cargando la imagen de perfil...");
    const blob = await compressImage(file, 900, 0.84);
    const path = `profilePhotos/${currentUser.uid}/${targetUid}/avatar.jpg`;
    const ref = sdk.storageRef(storage, path);
    const snap = await sdk.uploadBytes(ref, blob, { contentType: blob.type || "image/jpeg", cacheControl: "public,max-age=3600" });
    const photoURL = await sdk.getDownloadURL(snap.ref);
    await sdk.updateDoc(sdk.doc(db, "users", targetUid), { photoURL, photoUpdatedAt: sdk.serverTimestamp(), photoUpdatedAtClient: localIso() });
    if (targetUid === currentUser.uid) {
      currentProfile = await OfflineDB.saveProfile({ ...currentProfile, photoURL });
      lastOfflineProfile = currentProfile;
      applyProfile();
    }
    if (currentProfile?.role === "admin" && currentSection === "users") await loadUsers();
    showToast("Foto actualizada", "La imagen de perfil quedó guardada.");
  } catch (error) {
    showToast("No se pudo guardar la foto", friendlyError(error), "error");
  } finally {
    hideProcessing();
    profilePhotoTargetUid = "";
    event.target.value = "";
  }
}

async function loadUsers() {
  if (currentProfile?.role !== "admin") return;
  if (!firebaseReady || !navigator.onLine || localSession) { els.usersList.innerHTML = '<div class="empty-state">La administracion de usuarios requiere Internet.</div>'; return; }
  const snap = await sdk.getDocs(sdk.collection(db, "users"));
  els.usersList.innerHTML = snap.docs.map((item) => {
    const data = item.data();
    const name = data.name || "Usuario";
    const avatar = data.photoURL
      ? `<img class="user-photo" src="${escapeHtml(data.photoURL)}" alt="Foto de ${escapeHtml(name)}">`
      : `<span class="user-photo-fallback">${escapeHtml(initials(name))}</span>`;
    return `<div class="user-row modern-user-row">
      <button class="user-photo-button" type="button" data-upload-user-photo="${item.id}" aria-label="Cargar foto de ${escapeHtml(name)}">${avatar}<span><svg class="ui-icon"><use href="#icon-camera"></use></svg></span></button>
      <div class="user-row-copy"><strong>${escapeHtml(name)}</strong><span>${escapeHtml(roleLabel(data.role || "operator"))}</span></div>
      <select id="role-${item.id}" aria-label="Rol de ${escapeHtml(name)}"><option value="operator" ${data.role === "operator" ? "selected" : ""}>Operador</option><option value="mechanic" ${data.role === "mechanic" ? "selected" : ""}>Mecánico</option><option value="admin" ${data.role === "admin" ? "selected" : ""}>Administrador</option></select>
      <button class="primary-button compact-button" type="button" data-save-role="${item.id}">Guardar</button>
    </div>`;
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
      if (manual) showToast("Falta validar la sesion", "Bloquea la aplicacion e ingresa con correo y contraseña. Los datos no se perderan.", "error");
      return;
    }

    await sdk.getIdToken(auth.currentUser, true).catch(() => {});
    await applyGlobalOperationalReset();
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
    await sdk.setDoc(sdk.doc(db, "operationalBreaks", record.id), remote, { merge: true });
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
    // operationalParts es la fuente canonica. La copia antigua bajo users/{uid}/parts
    // no se escribe porque una regla desactualizada en esa ruta bloqueaba todo el batch.
    await sdk.setDoc(sdk.doc(db, "operationalParts", record.id), remote, { merge: true });
    // Copia de compatibilidad: si falla, no invalida la escritura canónica.
    try {
      await sdk.setDoc(sdk.doc(db, "users", record.operatorUid, "parts", record.id), remote, { merge: true });
    } catch (legacyError) {
      console.warn("No se pudo actualizar la copia heredada del Parte", legacyError);
    }

    const verification = await sdk.getDoc(sdk.doc(db, "operationalParts", record.id));
    if (!verification.exists()) throw new Error("Firebase no confirmó el documento operationalParts del Parte.");

    const syncedRecord = { ...record, _source: "canonical", syncStatus: "synced" };
    await OfflineDB.putPart(syncedRecord);
    await OfflineDB.putOperatorPart(syncedRecord);
    userParts = userParts.filter((part) => part.id !== syncedRecord.id).concat(syncedRecord);
    if (currentPart?.id === syncedRecord.id) currentPart = syncedRecord;
    operatorParts = operatorParts.filter((part) => part.id !== syncedRecord.id).concat(syncedRecord);
    renderPart();
    renderDashboardCards();
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
    const syncedService = { ...record, syncStatus: "synced" };
    await OfflineDB.putService(syncedService);
    services = services.map((service) => service.id === syncedService.id ? syncedService : service);
    selectedPartServices = selectedPartServices.map((service) => service.id === syncedService.id ? syncedService : service);
    if (currentService?.id === syncedService.id) currentService = syncedService;
    renderService();
    renderDashboardCards();
    renderActivity();
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
  if (item.type === "direct-chat-message") {
    const record = { ...item.payload };
    if (record.senderUid !== currentUser?.uid) throw new Error("El mensaje pertenece a otro usuario.");
    if (!record.recipientUid || record.recipientUid === record.senderUid) throw new Error("El destinatario del mensaje no es válido.");
    const participantUids = [record.senderUid, record.recipientUid].sort();
    record.participantUids = participantUids;
    record.conversationId = directConversationId(record.senderUid, record.recipientUid);
    record.senderName = currentProfile?.name || currentUser?.displayName || record.senderName || "Usuario";
    record.senderRole = currentProfile?.role || record.senderRole || "operator";
    record.readBy = Array.from(new Set([...(record.readBy || []), record.senderUid]));
    const remote = { ...cleanRecord(record), syncStatus: "synced", createdAt: sdk.serverTimestamp() };
    await sdk.setDoc(sdk.doc(db, "directMessages", record.id), remote, { merge: false });
    const syncedMessage = { ...record, syncStatus: "synced" };
    await OfflineDB.putChatMessage(syncedMessage);
    mergeChatMessages([syncedMessage]);
    renderChat(true);
    return;
  }
  if (item.type === "chat-message") {
    const record = { ...item.payload };
    if (record.senderUid !== currentUser?.uid) {
      throw new Error("El mensaje pertenece a otro usuario.");
    }
    record.senderName = currentProfile?.name || currentUser?.displayName || record.senderName || "Usuario";
    record.senderRole = currentProfile?.role || record.senderRole || "operator";
    const remote = {
      ...cleanRecord(record),
      syncStatus: "synced",
      createdAt: sdk.serverTimestamp()
    };
    await sdk.setDoc(sdk.doc(db, "chatMessages", record.id), remote, { merge: false });
    const syncedMessage = { ...record, syncStatus: "synced" };
    await OfflineDB.putChatMessage(syncedMessage);
    mergeChatMessages([syncedMessage]);
    renderChat(true);
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
