"use strict";

// APP LUBAYD v2.3.0 - Offline completo, PIN local, descansos, parte y reparaciones
// La interfaz se inicia primero y Firebase se carga luego de forma dinámica.
// Así, aun si el CDN de Firebase falla, los botones y los mensajes siguen funcionando.
window.__APP_SCRIPT_LOADED__ = true;
window.__FIREBASE_READY__ = false;

const firebaseConfig = {
  apiKey: "AIzaSyAYJV6Ko8-anMATIOqL_EcaSppqlbIosqo",
  authDomain: "app-lubayd.firebaseapp.com",
  projectId: "app-lubayd",
  storageBucket: "app-lubayd.firebasestorage.app",
  messagingSenderId: "270098605772",
  appId: "1:270098605772:web:aa7762106280f1594f0469",
  measurementId: "G-RNN1LHVQVQ"
};

let auth = null;
let db = null;
let storage = null;
let firebaseReady = false;
let firebaseInitializationPromise = null;

let setPersistence;
let browserLocalPersistence;
let createUserWithEmailAndPassword;
let signInWithEmailAndPassword;
let signOut;
let updateProfile;
let onAuthStateChanged;

let doc;
let setDoc;
let getDoc;
let deleteDoc;
let collection;
let query;
let orderBy;
let limit;
let onSnapshot;
let runTransaction;
let serverTimestamp;
let enableMultiTabIndexedDbPersistence;

let storageRef;
let uploadBytes;
let getDownloadURL;

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => Array.from(document.querySelectorAll(selector));

const els = {
  authView: $("#authView"),
  appView: $("#appView"),
  loginTab: $("#loginTab"),
  registerTab: $("#registerTab"),
  loginForm: $("#loginForm"),
  registerForm: $("#registerForm"),
  loginButton: $("#loginButton"),
  registerButton: $("#registerButton"),
  offlineLoginPanel: $("#offlineLoginPanel"),
  offlineUserAvatar: $("#offlineUserAvatar"),
  offlineUserName: $("#offlineUserName"),
  offlineUserEmail: $("#offlineUserEmail"),
  offlinePinInput: $("#offlinePinInput"),
  offlineLoginButton: $("#offlineLoginButton"),
  offlineLoginHelp: $("#offlineLoginHelp"),
  pinSetupModal: $("#pinSetupModal"),
  pinSetupForm: $("#pinSetupForm"),
  pinSetupInput: $("#pinSetupInput"),
  pinSetupConfirm: $("#pinSetupConfirm"),
  pinSetupError: $("#pinSetupError"),
  savePinButton: $("#savePinButton"),
  skipPinButton: $("#skipPinButton"),
  logoutButton: $("#logoutButton"),
  userName: $("#userName"),
  userEmail: $("#userEmail"),
  userAvatar: $("#userAvatar"),
  connectionDot: $("#connectionDot"),
  connectionText: $("#connectionText"),
  offlineWarning: $("#offlineWarning"),
  syncBanner: $("#syncBanner"),
  syncBannerTitle: $("#syncBannerTitle"),
  syncBannerText: $("#syncBannerText"),
  syncStatusPill: $("#syncStatusPill"),
  syncStatusText: $("#syncStatusText"),
  pendingSyncCount: $("#pendingSyncCount"),
  manualSyncButton: $("#manualSyncButton"),
  captureStorageMode: $("#captureStorageMode"),
  liveClock: $("#liveClock"),
  liveDate: $("#liveDate"),
  dashboardGreeting: $("#dashboardGreeting"),
  dashboardDate: $("#dashboardDate"),
  todayBreakCount: $("#todayBreakCount"),
  todayBreakTotal: $("#todayBreakTotal"),
  averageBreakTime: $("#averageBreakTime"),
  todayPhotoCount: $("#todayPhotoCount"),
  lastMarkStatus: $("#lastMarkStatus"),
  lastMarkTime: $("#lastMarkTime"),
  dashboardMapStatus: $("#dashboardMapStatus"),
  historyCount: $("#historyCount"),
  pageTitle: $("#pageTitle"),
  dashboardSection: $("#dashboardSection"),
  partSection: $("#partSection"),
  historySection: $("#historySection"),
  partForm: $("#partForm"),
  partDateLabel: $("#partDateLabel"),
  partStatusBadge: $("#partStatusBadge"),
  partOfflineWarning: $("#partOfflineWarning"),
  horometerInitialInput: $("#horometerInitialInput"),
  horometerBreakInput: $("#horometerBreakInput"),
  horometerPostBreakInput: $("#horometerPostBreakInput"),
  horometerFinalInput: $("#horometerFinalInput"),
  trozoInput: $("#trozoInput"),
  pulpaInput: $("#pulpaInput"),
  repairEnabled: $("#repairEnabled"),
  repairFields: $("#repairFields"),
  repairStartReason: $("#repairStartReason"),
  repairEndReason: $("#repairEndReason"),
  partObservations: $("#partObservations"),
  partSaveTitle: $("#partSaveTitle"),
  partSaveStatus: $("#partSaveStatus"),
  savePartButton: $("#savePartButton"),
  sidebar: $(".sidebar"),
  mobileMenuButton: $("#mobileMenuButton"),
  breakStatusTitle: $("#breakStatusTitle"),
  breakStatusBadge: $("#breakStatusBadge"),
  breakTimer: $("#breakTimer"),
  breakStartDescription: $("#breakStartDescription"),
  activeBreakDetails: $("#activeBreakDetails"),
  activeStartTime: $("#activeStartTime"),
  activeMapLink: $("#activeMapLink"),
  startBreakButton: $("#startBreakButton"),
  endBreakButton: $("#endBreakButton"),
  testGpsButton: $("#testGpsButton"),
  gpsTestResult: $("#gpsTestResult"),
  recentList: $("#recentList"),
  historyList: $("#historyList"),
  captureModal: $("#captureModal"),
  captureEyebrow: $("#captureEyebrow"),
  captureTitle: $("#captureTitle"),
  captureSubtitle: $("#captureSubtitle"),
  captureStepPhoto: $("#captureStepPhoto"),
  captureStepLocation: $("#captureStepLocation"),
  captureStepConfirm: $("#captureStepConfirm"),
  photoReadyBadge: $("#photoReadyBadge"),
  locationReadyBadge: $("#locationReadyBadge"),
  closeCaptureButton: $("#closeCaptureButton"),
  cameraVideo: $("#cameraVideo"),
  cameraCanvas: $("#cameraCanvas"),
  photoPreview: $("#photoPreview"),
  cameraPlaceholder: $("#cameraPlaceholder"),
  takePhotoButton: $("#takePhotoButton"),
  retakePhotoButton: $("#retakePhotoButton"),
  fallbackPhotoLabel: $("#fallbackPhotoLabel"),
  fallbackPhotoInput: $("#fallbackPhotoInput"),
  locationSpinner: $("#locationSpinner"),
  locationStatus: $("#locationStatus"),
  locationHelp: $("#locationHelp"),
  captureTime: $("#captureTime"),
  captureMapLink: $("#captureMapLink"),
  refreshGpsButton: $("#refreshGpsButton"),
  captureValidation: $("#captureValidation"),
  confirmCaptureButton: $("#confirmCaptureButton"),
  processingOverlay: $("#processingOverlay"),
  processingTitle: $("#processingTitle"),
  processingMessage: $("#processingMessage"),
  toastRegion: $("#toastRegion"),
  authMessage: $("#authMessage"),
  startupError: $("#startupError"),
  photoViewerModal: $("#photoViewerModal"),
  photoViewerImage: $("#photoViewerImage"),
  photoViewerLoading: $("#photoViewerLoading"),
  photoViewerTitle: $("#photoViewerTitle"),
  closePhotoViewerButton: $("#closePhotoViewerButton"),
  mobileQuickAction: $("#mobileQuickAction"),
  mobilePartNav: $("#mobilePartNav"),
  mobileProfileButton: $("#mobileProfileButton")
};

let currentUser = null;
let currentBreak = null;
let currentBreakId = null;
let unsubscribeCurrent = null;
let unsubscribeHistory = null;
let unsubscribePart = null;
let currentPart = null;
let partCaptureStage = null;
let partDirty = false;
let timerInterval = null;
let cameraStream = null;
let captureMode = "start";
let capturedBlob = null;
let capturedPosition = null;
let captureObjectUrl = null;
let isSaving = false;
let lastHistoryRecords = [];
let historyFilter = "all";
let currentUserRole = "operator";
let offlineProfile = null;
let localSessionActive = false;
let serverHistoryRecords = [];
let localHistoryRecords = [];
let syncInProgress = false;
let authStateHandledUid = null;
const photoUrlCache = new Map();
const localObjectUrls = new Set();

const PART_STAGE_CONFIG = {
  horometerInitial: { group: "horometers", key: "initial", label: "Horómetro inicial", input: "horometerInitialInput" },
  horometerBreak: { group: "horometers", key: "break", label: "Horómetro descanso", input: "horometerBreakInput" },
  horometerPostBreak: { group: "horometers", key: "postBreak", label: "Horómetro post descanso", input: "horometerPostBreakInput" },
  horometerFinal: { group: "horometers", key: "final", label: "Horómetro final", input: "horometerFinalInput" },
  repairStart: { group: "repair", key: "start", label: "Inicio de reparación", reason: "repairStartReason" },
  repairEnd: { group: "repair", key: "end", label: "Finalización de reparación", reason: "repairEndReason" }
};

function setBusy(button, busy, label) {
  if (!button) return;
  if (!button.dataset.defaultHtml) button.dataset.defaultHtml = button.innerHTML;
  button.disabled = busy;
  button.innerHTML = busy ? `<span>${label}</span><span class="mini-loader">…</span>` : button.dataset.defaultHtml;
}

function showToast(title, message, type = "success") {
  const toast = document.createElement("div");
  toast.className = `toast ${type === "error" ? "error" : ""}`;
  toast.innerHTML = `<strong>${escapeHtml(title)}</strong><span>${escapeHtml(message)}</span>`;
  els.toastRegion.appendChild(toast);
  window.setTimeout(() => toast.remove(), 5200);
}

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>'"]/g, (char) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;"
  })[char]);
}

function friendlyError(error) {
  const code = error?.code || "";
  const host = window.location.hostname || "este dominio";
  const messages = {
    "auth/invalid-credential": "Correo o contraseña incorrectos.",
    "auth/invalid-login-credentials": "Correo o contraseña incorrectos.",
    "auth/user-not-found": "No existe un usuario con ese correo.",
    "auth/wrong-password": "La contraseña es incorrecta.",
    "auth/invalid-email": "El correo electrónico no es válido.",
    "auth/email-already-in-use": "Ya existe un usuario con ese correo.",
    "auth/weak-password": "La contraseña debe tener al menos 6 caracteres.",
    "auth/operation-not-allowed": "El acceso por correo y contraseña no está habilitado en Firebase Authentication.",
    "auth/unauthorized-domain": `El dominio ${host} no está autorizado. Agrégalo en Firebase > Authentication > Configuración > Dominios autorizados.`,
    "auth/app-not-authorized": `La clave de Firebase no autoriza la aplicación publicada en ${host}. Revisa los dominios autorizados y las restricciones de la API key.`,
    "auth/network-request-failed": "No se pudo conectar con Firebase. Revisa internet, firewall, VPN o bloqueadores del navegador.",
    "auth/invalid-api-key": "La API key de Firebase no es válida. Revisa la configuración de Firebase incluida en app.js.",
    "auth/too-many-requests": "Demasiados intentos. Espera unos minutos y vuelve a probar.",
    "storage/unauthorized": "Firebase Storage rechazó la fotografía. Revisa las reglas de Storage.",
    "storage/retry-limit-exceeded": "No se pudo cargar la fotografía. Comprueba la conexión.",
    "permission-denied": "Firebase rechazó el registro. Revisa las reglas de Firestore."
  };
  return messages[code] || `${error?.message || "Ocurrió un error inesperado."}${code ? ` (${code})` : ""}`;
}

function showAuthMessage(message, type = "error") {
  if (!els.authMessage) return;
  els.authMessage.textContent = message;
  els.authMessage.classList.remove("hidden", "error");
  if (type === "error") els.authMessage.classList.add("error");
}

function clearAuthMessage() {
  if (!els.authMessage) return;
  els.authMessage.textContent = "";
  els.authMessage.classList.add("hidden");
  els.authMessage.classList.remove("error");
}

function switchAuthTab(tab) {
  const isLogin = tab === "login";
  els.loginTab.classList.toggle("active", isLogin);
  els.registerTab.classList.toggle("active", !isLogin);
  els.loginTab.setAttribute("aria-selected", String(isLogin));
  els.registerTab.setAttribute("aria-selected", String(!isLogin));
  els.loginForm.classList.toggle("active", isLogin);
  els.registerForm.classList.toggle("active", !isLogin);
}

els.loginTab.addEventListener("click", () => switchAuthTab("login"));
els.registerTab.addEventListener("click", () => switchAuthTab("register"));

$$('[data-password-target]').forEach((button) => {
  button.addEventListener("click", () => {
    const input = document.getElementById(button.dataset.passwordTarget);
    const visible = input.type === "text";
    input.type = visible ? "password" : "text";
    button.textContent = visible ? "Ver" : "Ocultar";
  });
});

async function renderOfflineAccessPanel() {
  if (!window.OfflineDB || !els.offlineLoginPanel) return;
  try {
    offlineProfile = await OfflineDB.getLastProfile();
    const enabled = Boolean(offlineProfile?.offlineAccessEnabled && offlineProfile?.pinHash);
    els.offlineLoginPanel.classList.toggle("hidden", !enabled);
    if (!enabled) return;
    els.offlineUserName.textContent = offlineProfile.name || "Operador";
    els.offlineUserEmail.textContent = offlineProfile.email || "—";
    els.offlineUserAvatar.textContent = getInitials(offlineProfile.name || offlineProfile.email || "U");
    els.offlineLoginHelp.textContent = navigator.onLine
      ? "También puedes usar el PIN para desbloquear este dispositivo."
      : "Sin conexión: tus registros quedarán guardados en el dispositivo.";
    if (!navigator.onLine) window.setTimeout(() => els.offlinePinInput?.focus(), 150);
  } catch (error) {
    console.warn("Acceso offline:", error);
  }
}

async function initializeOfflineAccess() {
  if (!window.OfflineDB) return;
  try {
    await OfflineDB.open();
    OfflineDB.requestPersistentStorage().catch(() => {});
    await renderOfflineAccessPanel();
    await updatePendingSyncUi();
  } catch (error) {
    console.warn("Base local:", error);
  }
}

function showPinSetup(profile) {
  if (!profile || profile.offlineAccessEnabled || !els.pinSetupModal) return;
  els.pinSetupInput.value = "";
  els.pinSetupConfirm.value = "";
  els.pinSetupError.classList.add("hidden");
  els.pinSetupModal.classList.remove("hidden");
  document.body.style.overflow = "hidden";
  window.setTimeout(() => els.pinSetupInput?.focus(), 120);
}

function closePinSetup() {
  els.pinSetupModal?.classList.add("hidden");
  if (els.captureModal?.classList.contains("hidden")) document.body.style.overflow = "";
}

async function cacheAuthenticatedProfile(user, role = "operator") {
  if (!window.OfflineDB || !user?.uid) return null;
  const previous = await OfflineDB.getProfile(user.uid);
  const profile = await OfflineDB.saveProfile({
    ...(previous || {}),
    uid: user.uid,
    name: user.displayName || previous?.name || "Operador",
    email: user.email || previous?.email || "",
    role: role || previous?.role || "operator",
    active: true,
    locked: false,
    lastLoginAt: Date.now()
  });
  offlineProfile = profile;
  await renderOfflineAccessPanel();
  return profile;
}

async function lockApplication() {
  if (currentUser?.uid && window.OfflineDB) {
    try { await OfflineDB.setLocked(currentUser.uid, true); } catch (error) { console.warn(error); }
  }
  clearSubscriptions();
  stopTimer();
  localSessionActive = false;
  currentUser = null;
  currentBreak = null;
  currentPart = null;
  els.appView.classList.add("hidden");
  els.authView.classList.remove("hidden");
  switchAuthTab("login");
  await renderOfflineAccessPanel();
  clearAuthMessage();
}

els.loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  clearAuthMessage();
  if (!navigator.onLine) {
    showAuthMessage("No hay conexión. Usa el acceso con PIN offline disponible debajo del formulario.");
    await renderOfflineAccessPanel();
    return;
  }
  if (!firebaseReady || !auth) {
    showAuthMessage("Firebase todavía no terminó de cargar. Espera unos segundos y vuelve a intentar.");
    return;
  }
  const email = $("#loginEmail").value.trim();
  const password = $("#loginPassword").value;
  setBusy(els.loginButton, true, "Ingresando…");
  try {
    const credential = await signInWithEmailAndPassword(auth, email, password);
    if (window.OfflineDB) await OfflineDB.setLocked(credential.user.uid, false).catch(() => {});
    await handleAuthStateChanged(credential.user, true);
  } catch (error) {
    const message = friendlyError(error);
    showAuthMessage(message);
    showToast("No se pudo iniciar sesión", message, "error");
    console.error("Firebase Auth login:", error);
  } finally {
    setBusy(els.loginButton, false);
  }
});

els.registerForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  clearAuthMessage();
  if (!navigator.onLine) {
    showAuthMessage("Para crear un usuario nuevo necesitas conexión a Internet.");
    return;
  }
  if (!firebaseReady || !auth) {
    showAuthMessage("Firebase todavía no terminó de cargar. Espera unos segundos y vuelve a intentar.");
    return;
  }
  const name = $("#registerName").value.trim();
  const email = $("#registerEmail").value.trim();
  const password = $("#registerPassword").value;
  const confirm = $("#registerPasswordConfirm").value;

  if (password !== confirm) {
    showToast("Revisa la contraseña", "Las dos contraseñas no coinciden.", "error");
    return;
  }

  setBusy(els.registerButton, true, "Creando usuario…");
  try {
    const credential = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(credential.user, { displayName: name });

    try {
      await setDoc(doc(db, "users", credential.user.uid), {
        uid: credential.user.uid,
        name,
        email,
        role: "operator",
        active: true,
        createdAt: serverTimestamp(),
        createdAtClient: new Date().toISOString()
      }, { merge: true });
    } catch (profileError) {
      console.warn("La cuenta se creó, pero no se pudo guardar el perfil:", profileError);
    }

    await cacheAuthenticatedProfile(credential.user, "operator");
    clearAuthMessage();
    showToast("Usuario creado", "La cuenta quedó registrada. Configura el PIN para trabajar sin conexión.");
    await handleAuthStateChanged(credential.user, true);
  } catch (error) {
    const message = friendlyError(error);
    showAuthMessage(message);
    showToast("No se pudo crear el usuario", message, "error");
    console.error("Firebase Auth registro:", error);
  } finally {
    setBusy(els.registerButton, false);
  }
});

els.offlineLoginButton?.addEventListener("click", async () => {
  clearAuthMessage();
  if (!window.OfflineDB) {
    showAuthMessage("El almacenamiento offline no está disponible en este navegador.");
    return;
  }
  const pin = String(els.offlinePinInput?.value || "").replace(/\D/g, "");
  setBusy(els.offlineLoginButton, true, "Verificando…");
  try {
    const profile = offlineProfile || await OfflineDB.getLastProfile();
    if (!profile) throw new Error("No existe un usuario offline configurado en este dispositivo.");
    const valid = await OfflineDB.verifyPin(profile, pin);
    if (!valid) throw new Error("El PIN offline no es correcto.");
    await OfflineDB.setLocked(profile.uid, false);
    els.offlinePinInput.value = "";
    await enterOfflineSession(profile);
  } catch (error) {
    showAuthMessage(error.message || "No se pudo validar el PIN offline.");
    showToast("Acceso offline rechazado", error.message || "PIN incorrecto.", "error");
  } finally {
    setBusy(els.offlineLoginButton, false);
  }
});

els.offlinePinInput?.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    els.offlineLoginButton?.click();
  }
});

els.pinSetupForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!currentUser?.uid || !window.OfflineDB) return;
  const pin = String(els.pinSetupInput.value || "").replace(/\D/g, "");
  const confirm = String(els.pinSetupConfirm.value || "").replace(/\D/g, "");
  els.pinSetupError.classList.add("hidden");
  if (!/^\d{6}$/.test(pin)) {
    els.pinSetupError.textContent = "El PIN debe tener exactamente 6 números.";
    els.pinSetupError.classList.remove("hidden");
    return;
  }
  if (pin !== confirm) {
    els.pinSetupError.textContent = "Los dos PIN no coinciden.";
    els.pinSetupError.classList.remove("hidden");
    return;
  }
  setBusy(els.savePinButton, true, "Guardando…");
  try {
    offlineProfile = await OfflineDB.configurePin(currentUser.uid, pin);
    closePinSetup();
    await renderOfflineAccessPanel();
    showToast("PIN offline configurado", "Ya puedes ingresar y trabajar sin conexión en este dispositivo.");
  } catch (error) {
    els.pinSetupError.textContent = error.message || "No se pudo guardar el PIN.";
    els.pinSetupError.classList.remove("hidden");
  } finally {
    setBusy(els.savePinButton, false);
  }
});

els.skipPinButton?.addEventListener("click", () => {
  closePinSetup();
  showToast("PIN pendiente", "Puedes configurarlo más adelante volviendo a iniciar sesión con Internet.");
});

els.logoutButton.addEventListener("click", lockApplication);

async function updatePendingSyncUi(state = {}) {
  if (!window.OfflineDB) return;
  const uid = currentUser?.uid || offlineProfile?.uid;
  const pending = uid ? await OfflineDB.countPending(uid).catch(() => 0) : 0;
  const running = Boolean(state.running || syncInProgress);
  const failed = Number(state.failed || 0);

  els.pendingSyncCount?.classList.toggle("hidden", pending === 0);
  if (els.pendingSyncCount) els.pendingSyncCount.textContent = String(pending);
  els.syncStatusPill?.classList.toggle("syncing", running);
  els.syncStatusPill?.classList.toggle("has-pending", pending > 0 && !failed);
  els.syncStatusPill?.classList.toggle("has-error", failed > 0);

  if (els.syncStatusText) {
    if (running) els.syncStatusText.textContent = `Sincronizando ${state.processed || 0} de ${state.total || pending}`;
    else if (failed) els.syncStatusText.textContent = `${pending} pendiente${pending === 1 ? "" : "s"} con error`;
    else if (pending) els.syncStatusText.textContent = `${pending} registro${pending === 1 ? "" : "s"} pendiente${pending === 1 ? "" : "s"}`;
    else els.syncStatusText.textContent = "Todo sincronizado";
  }

  if (els.syncBanner) {
    els.syncBanner.classList.toggle("hidden", pending === 0 && !running);
    if (running) {
      els.syncBannerTitle.textContent = "Sincronizando registros";
      els.syncBannerText.textContent = `Procesando ${state.processed || 0} de ${state.total || pending}. No cierres la aplicación.`;
    } else if (pending) {
      els.syncBannerTitle.textContent = `${pending} registro${pending === 1 ? "" : "s"} pendiente${pending === 1 ? "" : "s"}`;
      els.syncBannerText.textContent = navigator.onLine
        ? "La sincronización comenzará automáticamente."
        : "Se enviarán las fotos y los datos cuando vuelva Internet.";
    }
  }

  if (els.manualSyncButton) els.manualSyncButton.disabled = !navigator.onLine || !currentUser || pending === 0 || running;
}

function updateConnectionState() {
  const online = navigator.onLine;
  els.connectionDot.classList.toggle("offline", !online);
  els.connectionText.textContent = online ? (localSessionActive ? "Conectado; validando sesión" : "Conexión disponible") : "Modo sin conexión";
  els.offlineWarning.classList.toggle("hidden", online);
  els.partOfflineWarning?.classList.toggle("hidden", online);
  if (els.savePartButton) els.savePartButton.disabled = isSaving;
  $$('[data-part-capture]').forEach((button) => {
    button.disabled = isSaving || Boolean(button.closest("#repairFields") && !els.repairEnabled?.checked);
  });
  if (els.captureStorageMode) els.captureStorageMode.textContent = online ? "Guardado seguro" : "Se guardará en el dispositivo";
  updateActionButtons();
  updatePendingSyncUi().catch(() => {});
}

window.addEventListener("online", async () => {
  updateConnectionState();
  try {
    if (!firebaseReady) await ensureFirebaseServices();
    await attemptAutomaticSync();
  } catch (error) {
    console.warn("Reconexión y sincronización automática:", error);
  }
});
window.addEventListener("offline", updateConnectionState);
els.manualSyncButton?.addEventListener("click", () => attemptAutomaticSync(true));
updateConnectionState();

function startClock() {
  const render = () => {
    const now = new Date();
    const hour = now.getHours();
    const greeting = hour < 12 ? "Buenos días" : hour < 19 ? "Buenas tardes" : "Buenas noches";
    const operatorName = currentUser?.displayName?.trim()?.split(/\s+/)[0] || "Operador";

    els.liveClock.textContent = now.toLocaleTimeString("es-UY", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
    els.liveDate.textContent = now.toLocaleDateString("es-UY", { weekday: "long", day: "2-digit", month: "long", year: "numeric" });
    if (els.dashboardGreeting) els.dashboardGreeting.textContent = `${greeting}, ${operatorName}`;
    if (els.dashboardDate) els.dashboardDate.textContent = now.toLocaleDateString("es-UY", { weekday: "long", day: "2-digit", month: "long", year: "numeric" });
  };
  render();
  window.setInterval(render, 1000);
}
startClock();

function showSection(section) {
  if (currentUserRole === "operator" && section === "history") section = "dashboard";
  if (!["dashboard", "part", "history"].includes(section)) section = "dashboard";

  els.dashboardSection.classList.toggle("active", section === "dashboard");
  els.partSection?.classList.toggle("active", section === "part");
  els.historySection.classList.toggle("active", section === "history");
  const titles = { dashboard: "Inicio", part: "Parte", history: "Historial" };
  els.pageTitle.textContent = titles[section];
  $$('[data-section]').forEach((button) => button.classList.toggle("active", button.dataset.section === section));
  els.sidebar.classList.remove("open");
  window.scrollTo({ top: 0, behavior: "smooth" });
}
$$('[data-section]').forEach((button) => button.addEventListener("click", () => showSection(button.dataset.section)));
$$('[data-go-history]').forEach((button) => button.addEventListener("click", () => showSection("history")));
els.mobileMenuButton.addEventListener("click", () => els.sidebar.classList.toggle("open"));

$$('[data-history-filter]').forEach((button) => {
  button.addEventListener("click", () => {
    historyFilter = button.dataset.historyFilter || "all";
    $$('[data-history-filter]').forEach((item) => item.classList.toggle("active", item === button));
    renderHistory(lastHistoryRecords);
  });
});

els.mobileQuickAction?.addEventListener("click", () => {
  const active = Boolean(currentBreak && currentBreak.status === "active");
  openCapture(active ? "end" : "start");
});
els.mobileProfileButton?.addEventListener("click", () => {
  showToast(currentUser?.displayName || "Operador", currentUser?.email || "Usuario autenticado");
});

document.addEventListener("click", (event) => {
  if (window.innerWidth <= 820 && els.sidebar.classList.contains("open") && !els.sidebar.contains(event.target) && event.target !== els.mobileMenuButton) {
    els.sidebar.classList.remove("open");
  }
});

function presentUserInInterface(user) {
  els.authView.classList.add("hidden");
  els.appView.classList.remove("hidden");
  els.userName.textContent = user.displayName || "Operador";
  els.userEmail.textContent = user.email || "—";
  els.userAvatar.textContent = getInitials(user.displayName || user.email || "U");
  $$(".topbar-user-mobile .avatar").forEach((avatar) => { avatar.textContent = getInitials(user.displayName || user.email || "U"); });
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Buenos días" : hour < 19 ? "Buenas tardes" : "Buenas noches";
  const operatorName = (user.displayName || "Operador").trim().split(/\s+/)[0];
  if (els.dashboardGreeting) els.dashboardGreeting.textContent = `${greeting}, ${operatorName}`;
}

async function loadLocalState(uid) {
  if (!window.OfflineDB || !uid) return;
  try {
    localHistoryRecords = await OfflineDB.getBreaks(uid);
    const localActive = await OfflineDB.getActiveBreak(uid);
    if (localActive) {
      currentBreak = localActive;
      currentBreakId = localActive.id;
    }
    const localPart = await OfflineDB.getPart(uid, localDateKey());
    if (localPart && (!currentPart || localPart.syncStatus === "pending" || Number(localPart.updatedAtLocal || 0) >= Number(currentPart.updatedAtLocal || 0))) {
      currentPart = localPart;
    }
    renderMergedHistory();
    renderCurrentBreak();
    renderPart();
    await updatePendingSyncUi();
  } catch (error) {
    console.warn("Estado local:", error);
  }
}

function mergeHistoryRecords(serverRecords = serverHistoryRecords, localRecords = localHistoryRecords) {
  const map = new Map();
  serverRecords.forEach((record) => map.set(record.id, record));
  localRecords.forEach((record) => {
    const server = map.get(record.id);
    if (!server || record.syncStatus === "pending" || record.status !== server.status) map.set(record.id, { ...(server || {}), ...record });
  });
  return Array.from(map.values()).sort((a, b) => String(b.startAtClient || "").localeCompare(String(a.startAtClient || "")));
}

function renderMergedHistory() {
  const records = mergeHistoryRecords();
  lastHistoryRecords = records;
  renderHistory(records);
  renderRecent(records.slice(0, 4));
  updateDailySummary(records);
}

async function enterOfflineSession(profile) {
  clearSubscriptions();
  localSessionActive = true;
  currentUser = {
    uid: profile.uid,
    email: profile.email || "",
    displayName: profile.name || "Operador",
    isOfflineLocal: true
  };
  currentUserRole = profile.role || "operator";
  presentUserInInterface(currentUser);
  applyRolePermissions(currentUserRole);
  await loadLocalState(profile.uid);
  updateConnectionState();
  showToast("Modo offline activo", "Puedes trabajar normalmente. Los datos se sincronizarán al recuperar Internet.");
  if (navigator.onLine) attemptAutomaticSync().catch(() => {});
}

async function handleAuthStateChanged(user, force = false) {
  if (user && localSessionActive && currentUser?.uid === user.uid && !navigator.onLine && !force) return;
  if (!user) {
    if (localSessionActive) return;
    clearSubscriptions();
    currentUser = null;
    currentBreak = null;
    currentBreakId = null;
    currentPart = null;
    currentUserRole = "operator";
    document.body.dataset.userRole = "operator";
    els.authView.classList.remove("hidden");
    els.appView.classList.add("hidden");
    stopTimer();
    await renderOfflineAccessPanel();
    return;
  }

  const localProfile = window.OfflineDB ? await OfflineDB.getProfile(user.uid).catch(() => null) : null;
  const requireOfflinePin = !navigator.onLine && localProfile?.offlineAccessEnabled;
  if (!force && (localProfile?.locked || requireOfflinePin)) {
    currentUser = null;
    els.appView.classList.add("hidden");
    els.authView.classList.remove("hidden");
    await renderOfflineAccessPanel();
    return;
  }

  if (!force && authStateHandledUid === user.uid && !localSessionActive) return;
  authStateHandledUid = user.uid;
  clearSubscriptions();
  localSessionActive = false;
  currentUser = user;
  presentUserInInterface(user);

  let role = localProfile?.role || "operator";
  try {
    if (db && navigator.onLine) {
      const profileRef = doc(db, "users", user.uid);
      const profileSnap = await getDoc(profileRef);
      if (!profileSnap.exists()) {
        await setDoc(profileRef, {
          uid: user.uid,
          name: user.displayName || "Operador",
          email: user.email || "",
          role: "operator",
          active: true,
          createdAt: serverTimestamp(),
          createdAtClient: new Date().toISOString()
        }, { merge: true });
      } else {
        role = profileSnap.data()?.role || role;
      }
    }
  } catch (error) {
    console.warn("Perfil remoto; se utilizará la copia local:", error);
  }

  const cachedProfile = await cacheAuthenticatedProfile(user, role).catch(() => localProfile);
  applyRolePermissions(role);
  await loadLocalState(user.uid);

  if (db) {
    subscribeCurrentBreak(user.uid);
    subscribeHistory(user.uid);
    subscribeCurrentPart(user.uid);
  }

  updateConnectionState();
  if (cachedProfile && !cachedProfile.offlineAccessEnabled) showPinSetup(cachedProfile);
  if (navigator.onLine) attemptAutomaticSync().catch((error) => console.warn("Sincronización inicial:", error));
}


function applyRolePermissions(role) {
  currentUserRole = role || "operator";
  document.body.dataset.userRole = currentUserRole;

  const isOperator = currentUserRole === "operator";
  $$(".role-history").forEach((element) => {
    element.classList.toggle("role-hidden", isOperator);
    if (isOperator && element.matches("button, a")) element.setAttribute("tabindex", "-1");
  });

  $$(".operator-hidden").forEach((element) => {
    element.classList.toggle("role-hidden", isOperator);
  });

  if (isOperator) {
    showSection("dashboard");
    els.pageTitle.textContent = "Inicio";
  }
}

function getInitials(value) {
  const pieces = String(value).trim().split(/\s+/).filter(Boolean);
  return (pieces.slice(0, 2).map((part) => part[0]).join("") || "U").toUpperCase();
}

function clearSubscriptions() {
  if (unsubscribeCurrent) unsubscribeCurrent();
  if (unsubscribeHistory) unsubscribeHistory();
  if (unsubscribePart) unsubscribePart();
  unsubscribeCurrent = null;
  unsubscribeHistory = null;
  unsubscribePart = null;
}

function subscribeCurrentBreak(uid) {
  if (!db) return;
  const currentRef = doc(db, "users", uid, "current", "break");
  unsubscribeCurrent = onSnapshot(currentRef, async (snapshot) => {
    const localActive = window.OfflineDB ? await OfflineDB.getActiveBreak(uid).catch(() => null) : null;
    if (!snapshot.exists()) {
      if (localActive) {
        currentBreak = localActive;
        currentBreakId = localActive.id;
      } else {
        currentBreak = null;
        currentBreakId = null;
      }
      renderCurrentBreak();
      return;
    }

    const pointer = snapshot.data();
    if (!pointer.breakId) {
      currentBreak = localActive || null;
      currentBreakId = localActive?.id || null;
      renderCurrentBreak();
      return;
    }

    const breakSnap = await getDoc(doc(db, "users", uid, "breaks", pointer.breakId));
    const remote = breakSnap.exists() ? { id: breakSnap.id, ...breakSnap.data() } : null;
    if (localActive && localActive.syncStatus === "pending") {
      currentBreak = localActive;
      currentBreakId = localActive.id;
    } else {
      currentBreak = remote;
      currentBreakId = remote?.id || null;
    }
    renderCurrentBreak();
  }, (error) => console.warn("Descanso remoto:", error));
}

function subscribeHistory(uid) {
  if (!db) return;
  const historyQuery = query(collection(db, "users", uid, "breaks"), orderBy("startAtClient", "desc"), limit(50));
  unsubscribeHistory = onSnapshot(historyQuery, async (snapshot) => {
    serverHistoryRecords = snapshot.docs.map((item) => ({ id: item.id, ...item.data() }));
    if (window.OfflineDB) localHistoryRecords = await OfflineDB.getBreaks(uid).catch(() => localHistoryRecords);
    renderMergedHistory();
  }, (error) => {
    console.warn("Historial remoto:", error);
    renderMergedHistory();
  });
}

function localDateKey(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function currentPartRef(uid = currentUser?.uid) {
  if (!uid) return null;
  return doc(db, "users", uid, "parts", localDateKey());
}

function subscribeCurrentPart(uid) {
  const partRef = currentPartRef(uid);
  if (!partRef || !db) return;
  unsubscribePart = onSnapshot(partRef, async (snapshot) => {
    const remotePart = snapshot.exists() ? { id: `${uid}:${snapshot.id}`, ...snapshot.data() } : null;
    const localPart = window.OfflineDB ? await OfflineDB.getPart(uid, localDateKey()).catch(() => null) : null;
    currentPart = localPart?.syncStatus === "pending" ? localPart : (remotePart || localPart);
    partDirty = false;
    renderPart();
  }, (error) => {
    console.warn("Parte remoto:", error);
    loadLocalState(uid).catch(() => {});
  });
}

function parseDecimalInput(input) {
  const raw = String(input?.value ?? "").trim().replace(/\s/g, "").replace(",", ".");
  if (!raw) return null;
  const value = Number(raw);
  return Number.isFinite(value) ? value : null;
}

function formatDecimalInput(value) {
  if (value === null || value === undefined || value === "") return "";
  return String(value).replace(".", ",");
}

function setInputValue(input, value) {
  if (!input || document.activeElement === input) return;
  input.value = formatDecimalInput(value);
}

function stageData(stageKey) {
  const config = PART_STAGE_CONFIG[stageKey];
  return currentPart?.[config.group]?.[config.key] || null;
}

function collectPartPayload(status = currentPart?.status || "draft") {
  const nowIso = new Date().toISOString();
  const horometers = {
    ...(currentPart?.horometers || {}),
    initial: { ...(currentPart?.horometers?.initial || {}), value: parseDecimalInput(els.horometerInitialInput) },
    break: { ...(currentPart?.horometers?.break || {}), value: parseDecimalInput(els.horometerBreakInput) },
    postBreak: { ...(currentPart?.horometers?.postBreak || {}), value: parseDecimalInput(els.horometerPostBreakInput) },
    final: { ...(currentPart?.horometers?.final || {}), value: parseDecimalInput(els.horometerFinalInput) }
  };
  const repairEnabled = Boolean(els.repairEnabled?.checked);
  const repair = {
    ...(currentPart?.repair || {}),
    enabled: repairEnabled,
    start: { ...(currentPart?.repair?.start || {}), reason: els.repairStartReason?.value.trim() || "" },
    end: { ...(currentPart?.repair?.end || {}), reason: els.repairEndReason?.value.trim() || "" }
  };
  return {
    ...(currentPart || {}),
    id: `${currentUser.uid}:${localDateKey()}`,
    uid: currentUser.uid,
    userId: currentUser.uid,
    userName: currentUser.displayName || "Operador",
    userEmail: currentUser.email || "",
    dateKey: localDateKey(),
    status,
    horometers,
    production: {
      trozo: parseDecimalInput(els.trozoInput),
      pulpa: parseDecimalInput(els.pulpaInput)
    },
    repair,
    observations: els.partObservations?.value.trim() || "",
    syncStatus: "pending",
    updatedAtClient: nowIso,
    createdAtClient: currentPart?.createdAtClient || nowIso
  };
}

function hasEvidence(entry) {
  return Boolean((entry?.photoPath || entry?.localPhotoBlob) && entry?.location && Number.isFinite(Number(entry.location.latitude)) && Number.isFinite(Number(entry.location.longitude)));
}

function createLocalObjectUrl(blob) {
  if (!(blob instanceof Blob)) return "";
  const url = URL.createObjectURL(blob);
  localObjectUrls.add(url);
  return url;
}

function renderPartStage(stageKey) {
  const entry = stageData(stageKey);
  const ready = hasEvidence(entry);
  const status = document.getElementById(`${stageKey}Status`);
  const map = document.getElementById(`${stageKey}Map`);
  const evidence = document.getElementById(`${stageKey}Evidence`);
  const card = document.querySelector(`[data-part-stage-card="${stageKey}"]`);

  if (status) {
    status.textContent = ready ? "Registrado" : "Pendiente";
    status.classList.toggle("ready", ready);
  }
  card?.classList.toggle("is-complete", ready);

  if (map) {
    if (entry?.location) {
      map.href = mapUrl(entry.location.latitude, entry.location.longitude);
      map.classList.remove("disabled-link");
      map.innerHTML = "<span>⌖</span> Ver ubicación";
    } else {
      map.href = "#";
      map.classList.add("disabled-link");
      map.innerHTML = "<span>⌖</span> Ubicación";
    }
  }

  if (evidence) {
    const captured = entry?.capturedAtClient ? formatDateTime(parseDate(entry.capturedAtClient)) : "Evidencia registrada";
    if (entry?.localPhotoBlob instanceof Blob) {
      const url = createLocalObjectUrl(entry.localPhotoBlob);
      const pending = currentPart?.syncStatus === "pending" || entry?.syncStatus === "pending";
      evidence.innerHTML = `<button class="part-photo-thumb" type="button" data-local-photo-url="${escapeHtml(url)}" data-photo-label="${escapeHtml(PART_STAGE_CONFIG[stageKey].label)}"><img class="local-photo" src="${escapeHtml(url)}" alt="${escapeHtml(PART_STAGE_CONFIG[stageKey].label)}"></button><div><strong>${pending ? "Evidencia guardada localmente" : "Evidencia guardada"}</strong><span>${escapeHtml(captured)} ${pending ? '<span class="local-sync-badge">Pendiente</span>' : ''}</span></div>`;
    } else if (entry?.photoPath) {
      evidence.innerHTML = `<button class="part-photo-thumb is-loading" type="button" data-photo-open="${escapeHtml(entry.photoPath)}" data-photo-label="${escapeHtml(PART_STAGE_CONFIG[stageKey].label)}"><span class="photo-loading history-photo-loader">Cargando</span><img data-photo-path="${escapeHtml(entry.photoPath)}" alt="${escapeHtml(PART_STAGE_CONFIG[stageKey].label)}" loading="eager" decoding="async" referrerpolicy="no-referrer"></button><div><strong>Evidencia guardada</strong><span>${escapeHtml(captured)}</span></div>`;
    } else {
      evidence.innerHTML = "";
    }
  }
}

function renderPart() {
  const date = new Date();
  if (els.partDateLabel) els.partDateLabel.textContent = date.toLocaleDateString("es-UY", { weekday: "long", day: "2-digit", month: "long", year: "numeric" });

  setInputValue(els.horometerInitialInput, currentPart?.horometers?.initial?.value);
  setInputValue(els.horometerBreakInput, currentPart?.horometers?.break?.value);
  setInputValue(els.horometerPostBreakInput, currentPart?.horometers?.postBreak?.value);
  setInputValue(els.horometerFinalInput, currentPart?.horometers?.final?.value);
  setInputValue(els.trozoInput, currentPart?.production?.trozo);
  setInputValue(els.pulpaInput, currentPart?.production?.pulpa);
  if (els.repairStartReason && document.activeElement !== els.repairStartReason) els.repairStartReason.value = currentPart?.repair?.start?.reason || "";
  if (els.repairEndReason && document.activeElement !== els.repairEndReason) els.repairEndReason.value = currentPart?.repair?.end?.reason || "";
  if (els.partObservations && document.activeElement !== els.partObservations) els.partObservations.value = currentPart?.observations || "";

  const hasRepairData = Boolean(currentPart?.repair?.enabled || hasEvidence(currentPart?.repair?.start) || hasEvidence(currentPart?.repair?.end) || currentPart?.repair?.start?.reason || currentPart?.repair?.end?.reason);
  if (els.repairEnabled) els.repairEnabled.checked = hasRepairData;
  updateRepairFields(hasRepairData);

  Object.keys(PART_STAGE_CONFIG).forEach(renderPartStage);
  hydrateHistoryPhotos();

  const completed = currentPart?.status === "completed";
  if (els.partStatusBadge) {
    els.partStatusBadge.textContent = completed ? "Completado" : currentPart ? "Borrador" : "Nuevo";
    els.partStatusBadge.className = `badge ${completed ? "complete" : "neutral"}`;
  }
  if (els.partSaveTitle) els.partSaveTitle.textContent = completed ? "Parte guardado" : "Parte del día";
  if (els.partSaveStatus) {
    if (currentPart?.syncStatus === "pending") els.partSaveStatus.textContent = "Guardado en el dispositivo. Pendiente de sincronización.";
    else if (currentPart?.updatedAtClient) els.partSaveStatus.textContent = `Última actualización: ${formatDateTime(parseDate(currentPart.updatedAtClient))}.`;
    else els.partSaveStatus.textContent = "Completa los campos y registra las evidencias obligatorias.";
  }
}

function updateRepairFields(enabled) {
  els.repairFields?.classList.toggle("is-disabled", !enabled);
  els.repairFields?.querySelectorAll("textarea, button").forEach((control) => { control.disabled = !enabled || isSaving; });
}

function markPartDirty() {
  partDirty = true;
  if (els.partSaveStatus) els.partSaveStatus.textContent = "Hay cambios sin guardar.";
  if (els.partStatusBadge && currentPart?.status === "completed") {
    els.partStatusBadge.textContent = "Modificado";
    els.partStatusBadge.className = "badge active";
  }
}

function validatePartForCompletion(payload) {
  const stages = [
    ["Horómetro inicial", payload.horometers.initial],
    ["Horómetro descanso", payload.horometers.break],
    ["Horómetro post descanso", payload.horometers.postBreak],
    ["Horómetro final", payload.horometers.final]
  ];
  for (const [label, entry] of stages) {
    if (!Number.isFinite(entry.value) || entry.value < 0) throw new Error(`${label}: ingresa un valor válido.`);
    if (!hasEvidence(entry)) throw new Error(`${label}: falta registrar la foto y la ubicación.`);
  }
  const values = stages.map(([, entry]) => entry.value);
  if (values.some((value, index) => index > 0 && value < values[index - 1])) throw new Error("Los horómetros deben mantener un orden igual o creciente.");
  if (!Number.isFinite(payload.production.trozo) || payload.production.trozo < 0) throw new Error("Trozo: ingresa una cantidad válida, incluso si es 0.");
  if (!Number.isFinite(payload.production.pulpa) || payload.production.pulpa < 0) throw new Error("Pulpa: ingresa una cantidad válida, incluso si es 0.");

  if (payload.repair.enabled) {
    if (!payload.repair.start.reason) throw new Error("Inicio de reparación: escribe el motivo.");
    if (!hasEvidence(payload.repair.start)) throw new Error("Inicio de reparación: falta foto y ubicación.");
    if (!payload.repair.end.reason) throw new Error("Finalización de reparación: escribe el detalle final.");
    if (!hasEvidence(payload.repair.end)) throw new Error("Finalización de reparación: falta foto y ubicación.");
  }
}

async function queuePartForSync(part) {
  if (!window.OfflineDB) throw new Error("El almacenamiento offline no está disponible.");
  await OfflineDB.putPart(part);
  await OfflineDB.enqueue({
    id: `part-upsert:${part.uid}:${part.dateKey}`,
    uid: part.uid,
    type: "part-upsert",
    partId: part.dateKey,
    createdAt: Date.now()
  });
  currentPart = part;
  partDirty = false;
  renderPart();
  await updatePendingSyncUi();
}

async function savePartForm(event) {
  event?.preventDefault();
  if (!currentUser || isSaving) return;
  const payload = collectPartPayload("completed");
  try {
    validatePartForCompletion(payload);
  } catch (error) {
    showToast("Parte incompleto", error.message, "error");
    return;
  }

  isSaving = true;
  setBusy(els.savePartButton, true, "Guardando…");
  showProcessing("Guardando parte…", navigator.onLine ? "Preparando datos para sincronizar." : "Guardando datos y fotos en este dispositivo.");
  try {
    payload.completedAtClient = new Date().toISOString();
    payload.syncStatus = "pending";
    await queuePartForSync(payload);
    showToast("Parte guardado", navigator.onLine
      ? "El registro quedó guardado y se sincronizará en segundos."
      : "El registro quedó guardado en el dispositivo y se sincronizará cuando vuelva Internet.");
    if (navigator.onLine) attemptAutomaticSync().catch(() => {});
  } catch (error) {
    console.error("Guardar parte local:", error);
    showToast("No se pudo guardar el parte", error.message || "Error de almacenamiento local.", "error");
  } finally {
    isSaving = false;
    setBusy(els.savePartButton, false);
    hideProcessing();
    updateConnectionState();
  }
}

function openPartCapture(stageKey) {
  const config = PART_STAGE_CONFIG[stageKey];
  if (!config) return;
  if (config.group === "repair" && !els.repairEnabled?.checked) {
    showToast("Reparación desactivada", "Activa 'Hubo reparación' para registrar esta evidencia.", "error");
    return;
  }
  partCaptureStage = stageKey;
  captureMode = "part";
  capturedBlob = null;
  capturedPosition = null;
  isSaving = false;
  cleanupCaptureObjectUrl();
  resetCaptureUi();
  els.captureEyebrow.textContent = "EVIDENCIA DEL PARTE";
  els.captureTitle.textContent = config.label;
  els.captureSubtitle.textContent = "Toma una foto y confirma la ubicación del registro.";
  els.confirmCaptureButton.textContent = "Guardar evidencia";
  els.captureModal.classList.remove("hidden");
  document.body.style.overflow = "hidden";
  startCamera();
  locateForCapture();
}

async function savePartEvidence(stageKey) {
  const config = PART_STAGE_CONFIG[stageKey];
  if (!config) throw new Error("La etapa del parte no es válida.");
  if (!window.OfflineDB) throw new Error("El almacenamiento offline no está disponible.");
  const uid = currentUser.uid;
  const dateKey = localDateKey();
  const timestamp = Date.now();
  const path = `parts/${uid}/${dateKey}/${stageKey}-${timestamp}.jpg`;
  const nowIso = new Date().toISOString();
  const payload = collectPartPayload(currentPart?.status === "completed" ? "completed" : "draft");
  const group = { ...(payload[config.group] || {}) };
  const existing = { ...(group[config.key] || {}) };
  group[config.key] = {
    ...existing,
    photoPath: path,
    localPhotoBlob: capturedBlob,
    location: capturedPosition,
    capturedAtClient: nowIso,
    syncStatus: "pending",
    ...(config.input ? { value: parseDecimalInput(els[config.input]) } : {}),
    ...(config.reason ? { reason: els[config.reason]?.value.trim() || "" } : {})
  };
  payload[config.group] = group;
  payload.syncStatus = "pending";
  await queuePartForSync(payload);
  if (navigator.onLine) attemptAutomaticSync().catch(() => {});
}

els.partForm?.addEventListener("submit", savePartForm);
$$('[data-part-capture]').forEach((button) => button.addEventListener("click", () => openPartCapture(button.dataset.partCapture)));
$$('#partForm input, #partForm textarea').forEach((control) => {
  if (control.id !== "repairEnabled") control.addEventListener("input", markPartDirty);
});
els.repairEnabled?.addEventListener("change", () => {
  if (!els.repairEnabled.checked && (hasEvidence(currentPart?.repair?.start) || hasEvidence(currentPart?.repair?.end))) {
    els.repairEnabled.checked = true;
    showToast("Reparación registrada", "No se puede desactivar porque ya existen evidencias guardadas.", "error");
    return;
  }
  updateRepairFields(els.repairEnabled.checked);
  markPartDirty();
});
$$('.part-map-button').forEach((link) => link.addEventListener("click", (event) => {
  if (link.classList.contains("disabled-link")) event.preventDefault();
}));

function renderCurrentBreak() {
  const active = Boolean(currentBreak && currentBreak.status === "active");
  els.breakStatusTitle.textContent = active ? "Descanso en curso" : "Disponible para iniciar descanso";
  els.breakStatusBadge.textContent = active ? "En descanso" : "Disponible";
  els.breakStatusBadge.className = `badge ${active ? "active" : "neutral"}`;
  els.activeBreakDetails.classList.toggle("hidden", !active);

  if (active) {
    const start = parseDate(currentBreak.startAtClient);
    els.activeStartTime.textContent = formatDateTime(start);
    const location = currentBreak.startLocation;
    if (location) {
      els.activeMapLink.href = mapUrl(location.latitude, location.longitude);
      els.activeMapLink.classList.remove("disabled-link");
    } else {
      els.activeMapLink.href = "#";
      els.activeMapLink.classList.add("disabled-link");
    }
    els.breakStartDescription.textContent = `Iniciado el ${formatDateTime(start)}.`;
    startTimer(start);
  } else {
    stopTimer();
    els.breakTimer.textContent = "00:00:00";
    els.breakStartDescription.textContent = "Inicia tu descanso cuando corresponda.";
  }
  if (els.mobileQuickAction) {
    els.mobileQuickAction.textContent = active ? "■" : "+";
    els.mobileQuickAction.setAttribute("aria-label", active ? "Finalizar descanso" : "Iniciar descanso");
  }
  updateActionButtons();
}

function updateActionButtons() {
  const active = Boolean(currentBreak && currentBreak.status === "active");
  els.startBreakButton.disabled = !currentUser || active || isSaving;
  els.endBreakButton.disabled = !currentUser || !active || isSaving;
}

function startTimer(startDate) {
  stopTimer();
  const tick = () => {
    const seconds = Math.max(0, Math.floor((Date.now() - startDate.getTime()) / 1000));
    els.breakTimer.textContent = formatDuration(seconds);
  };
  tick();
  timerInterval = window.setInterval(tick, 1000);
}

function stopTimer() {
  if (timerInterval) window.clearInterval(timerInterval);
  timerInterval = null;
}

function parseDate(value) {
  if (!value) return new Date();
  if (value.toDate) return value.toDate();
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? new Date() : date;
}

function formatDateTime(date) {
  return date.toLocaleString("es-UY", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" });
}

function formatDuration(totalSeconds) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return [hours, minutes, seconds].map((value) => String(value).padStart(2, "0")).join(":");
}

function durationForRecord(record) {
  if (!record.endAtClient) return null;
  const seconds = Math.max(0, Math.floor((parseDate(record.endAtClient) - parseDate(record.startAtClient)) / 1000));
  return { seconds, label: formatDuration(seconds) };
}

function updateDailySummary(records) {
  const today = new Date();
  const sameDay = (date) => date.getFullYear() === today.getFullYear()
    && date.getMonth() === today.getMonth()
    && date.getDate() === today.getDate();

  const todaysRecords = records.filter((record) => sameDay(parseDate(record.startAtClient)));
  const completedToday = todaysRecords.filter((record) => record.endAtClient);
  const totalSeconds = completedToday.reduce((sum, record) => sum + (durationForRecord(record)?.seconds || 0), 0);
  const averageSeconds = completedToday.length ? Math.round(totalSeconds / completedToday.length) : 0;
  const photoCount = todaysRecords.reduce((sum, record) => sum
    + ((record.startPhotoPath || record.startPhotoBlob) ? 1 : 0)
    + ((record.endPhotoPath || record.endPhotoBlob) ? 1 : 0), 0);

  const compactDuration = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
  };

  if (els.todayBreakCount) els.todayBreakCount.textContent = String(todaysRecords.length);
  if (els.todayBreakTotal) els.todayBreakTotal.textContent = compactDuration(totalSeconds);
  if (els.averageBreakTime) els.averageBreakTime.textContent = compactDuration(averageSeconds);
  if (els.todayPhotoCount) els.todayPhotoCount.textContent = String(photoCount);

  const latest = records[0];
  if (els.lastMarkStatus && els.lastMarkTime) {
    if (!latest) {
      els.lastMarkStatus.textContent = "Sin registros";
      els.lastMarkTime.textContent = "Todavía no hay actividad registrada.";
    } else if (latest.status === "active") {
      els.lastMarkStatus.textContent = "Inicio registrado";
      els.lastMarkTime.textContent = formatDateTime(parseDate(latest.startAtClient));
    } else {
      els.lastMarkStatus.textContent = "Descanso finalizado";
      els.lastMarkTime.textContent = latest.endAtClient ? formatDateTime(parseDate(latest.endAtClient)) : formatDateTime(parseDate(latest.startAtClient));
    }
  }
}

function renderRecent(records) {
  if (!records.length) {
    els.recentList.innerHTML = `<div class="empty-state">Aún no hay descansos registrados.</div>`;
    return;
  }

  els.recentList.innerHTML = records.map((record) => {
    const start = parseDate(record.startAtClient);
    const end = record.endAtClient ? parseDate(record.endAtClient) : null;
    const duration = durationForRecord(record);
    const location = record.endLocation || record.startLocation;
    const dateLabel = start.toLocaleDateString("es-UY", { day: "2-digit", month: "short", year: "numeric" });
    const startTime = start.toLocaleTimeString("es-UY", { hour: "2-digit", minute: "2-digit" });
    const endTime = end ? end.toLocaleTimeString("es-UY", { hour: "2-digit", minute: "2-digit" }) : "En curso";
    const durationLabel = duration ? duration.label.slice(0, 5) : "—";
    return `<article class="record-row">
      <div class="record-cell"><span class="record-mobile-label">Fecha</span><strong>${escapeHtml(dateLabel)}</strong></div>
      <div class="record-cell"><span class="record-mobile-label">Inicio</span><strong>${escapeHtml(startTime)}</strong></div>
      <div class="record-cell"><span class="record-mobile-label">Finalización</span><strong>${escapeHtml(endTime)}</strong></div>
      <div class="record-cell"><span class="record-mobile-label">Duración</span><strong>${escapeHtml(durationLabel)}</strong></div>
      <div class="record-cell"><span class="record-mobile-label">Ubicación</span>${location ? `<a class="record-location-link" href="${mapUrl(location.latitude, location.longitude)}" target="_blank" rel="noopener">Ver en mapa</a>` : `<strong>—</strong>`}</div>
      <span class="badge ${record.status === "active" ? "active" : "complete"} record-status">${record.status === "active" ? "Activo" : "Finalizado"}${record.syncStatus === "pending" ? ' · Pendiente' : ''}</span>
    </article>`;
  }).join("");
}

function renderHistory(records) {
  const filtered = records.filter((record) => {
    if (historyFilter === "active") return record.status === "active";
    if (historyFilter === "completed") return record.status !== "active";
    return true;
  });

  if (els.historyCount) els.historyCount.textContent = `${filtered.length} ${filtered.length === 1 ? "registro" : "registros"}`;

  if (!filtered.length) {
    els.historyList.innerHTML = `<div class="empty-state">No hay registros para este filtro.</div>`;
    return;
  }

  els.historyList.innerHTML = filtered.map((record) => {
    const start = parseDate(record.startAtClient);
    const end = record.endAtClient ? parseDate(record.endAtClient) : null;
    const duration = durationForRecord(record);
    const startLocation = record.startLocation;
    const endLocation = record.endLocation;
    const dateLong = start.toLocaleDateString("es-UY", { day: "2-digit", month: "short", year: "numeric" });
    const weekday = start.toLocaleDateString("es-UY", { weekday: "long" });
    const startTime = start.toLocaleTimeString("es-UY", { hour: "2-digit", minute: "2-digit" });
    const endTime = end ? end.toLocaleTimeString("es-UY", { hour: "2-digit", minute: "2-digit" }) : "En curso";
    const durationLabel = duration ? duration.label.slice(0, 5) : "—";
    const statusClass = record.status === "active" ? "active" : "complete";
    const statusText = record.status === "active" ? "Activo" : "Finalizado";

    const startPhoto = (record.startPhotoPath || record.startPhotoBlob)
      ? historyPhotoTile(record.startPhotoPath, "Foto de inicio", "Inicio", record.startPhotoBlob)
      : historyPhotoPlaceholder("Sin foto");
    const endPhoto = (record.endPhotoPath || record.endPhotoBlob)
      ? historyPhotoTile(record.endPhotoPath, "Foto final", "Final", record.endPhotoBlob)
      : historyPhotoPlaceholder(record.status === "active" ? "Pendiente" : "Sin foto");

    return `<article class="history-row">
      <div class="history-date-cell"><strong>${escapeHtml(dateLong)}</strong><small>${escapeHtml(weekday)}</small></div>
      <span class="badge ${statusClass} history-mobile-status">${statusText}${record.syncStatus === "pending" ? ' · Pendiente' : ''}</span>
      <div class="history-data-cell"><span>Hora de inicio</span><strong>${escapeHtml(startTime)}</strong></div>
      <div class="history-data-cell"><span>Finalización</span><strong>${escapeHtml(endTime)}</strong></div>
      <div class="history-data-cell"><span>Duración</span><strong>${escapeHtml(durationLabel)}</strong></div>
      <div class="history-map-cell">
        ${startLocation ? `<a href="${mapUrl(startLocation.latitude, startLocation.longitude)}" target="_blank" rel="noopener">Inicio</a>` : ""}
        ${endLocation ? `<a href="${mapUrl(endLocation.latitude, endLocation.longitude)}" target="_blank" rel="noopener">Final</a>` : ""}
        ${!startLocation && !endLocation ? `<span>Sin ubicación</span>` : ""}
      </div>
      ${startPhoto}
      ${endPhoto}
      <div class="history-row-more">•••</div>
    </article>`;
  }).join("");

  hydrateHistoryPhotos();
}

function historyPhotoTile(path, alt, label, localBlob = null) {
  if (localBlob instanceof Blob) {
    const url = createLocalObjectUrl(localBlob);
    return `<button class="history-photo-button" type="button" data-local-photo-url="${escapeHtml(url)}" data-photo-label="${escapeHtml(label)}" aria-label="Abrir ${escapeHtml(alt)}"><img class="local-photo" src="${escapeHtml(url)}" alt="${escapeHtml(alt)}"></button>`;
  }
  return `<button class="history-photo-button is-loading" type="button" data-photo-open="${escapeHtml(path)}" data-photo-label="${escapeHtml(label)}" aria-label="Abrir ${escapeHtml(alt)}">
    <span class="photo-loading history-photo-loader">Cargando</span>
    <img data-photo-path="${escapeHtml(path)}" alt="${escapeHtml(alt)}" loading="eager" decoding="async" referrerpolicy="no-referrer">
  </button>`;
}

function historyPhotoPlaceholder(message) {
  return `<div class="history-photo-placeholder">${escapeHtml(message)}</div>`;
}

async function resolvePhotoUrl(path) {
  if (photoUrlCache.has(path)) return photoUrlCache.get(path);
  const url = await getDownloadURL(storageRef(storage, path));
  photoUrlCache.set(path, url);
  return url;
}

function hydrateHistoryPhotos() {
  $$('[data-local-photo-url]').forEach((button) => {
    if (button.dataset.photoBound === "true") return;
    button.dataset.photoBound = "true";
    button.addEventListener("click", () => openLocalPhotoViewer(button.dataset.localPhotoUrl, button.dataset.photoLabel || "Fotografía"));
  });
  $$('[data-photo-open]').forEach((button) => {
    if (button.dataset.photoBound === "true") return;
    button.dataset.photoBound = "true";
    const path = button.dataset.photoOpen;
    const image = button.querySelector('img[data-photo-path]');
    if (!image || !path) return;

    resolvePhotoUrl(path).then((url) => {
      const markLoaded = () => {
        button.classList.remove("is-loading", "has-error");
      };
      const markError = () => {
        button.classList.remove("is-loading");
        button.classList.add("has-error");
        const loader = button.querySelector(".history-photo-loader");
        if (loader) loader.textContent = "No disponible";
      };
      image.addEventListener("load", markLoaded, { once: true });
      image.addEventListener("error", markError, { once: true });
      button.dataset.photoUrl = url;
      image.src = url;
      if (image.complete) {
        if (image.naturalWidth > 0) markLoaded();
        else markError();
      }
    }).catch((error) => {
      console.warn("Fotografía del historial:", error);
      button.classList.remove("is-loading");
      button.classList.add("has-error");
      const loader = button.querySelector(".history-photo-loader");
      if (loader) loader.textContent = "No disponible";
    });

    button.addEventListener("click", () => openPhotoViewer(path, button.dataset.photoLabel || "Fotografía"));
  });
}

function openLocalPhotoViewer(url, label) {
  if (!els.photoViewerModal || !url) return;
  els.photoViewerTitle.textContent = label || "Fotografía";
  els.photoViewerLoading.classList.add("hidden");
  els.photoViewerImage.src = url;
  els.photoViewerImage.classList.remove("hidden");
  els.photoViewerModal.classList.remove("hidden");
  document.body.style.overflow = "hidden";
}

async function openPhotoViewer(path, label) {
  if (!els.photoViewerModal) return;
  els.photoViewerTitle.textContent = label || "Fotografía del descanso";
  els.photoViewerImage.classList.add("hidden");
  els.photoViewerImage.removeAttribute("src");
  els.photoViewerLoading.classList.remove("hidden");
  els.photoViewerModal.classList.remove("hidden");
  document.body.style.overflow = "hidden";

  try {
    const url = await resolvePhotoUrl(path);
    els.photoViewerImage.src = url;
    await new Promise((resolve, reject) => {
      if (els.photoViewerImage.complete && els.photoViewerImage.naturalWidth) return resolve();
      els.photoViewerImage.onload = resolve;
      els.photoViewerImage.onerror = reject;
    });
    els.photoViewerLoading.classList.add("hidden");
    els.photoViewerImage.classList.remove("hidden");
  } catch (error) {
    closePhotoViewer();
    showToast("No se pudo abrir la fotografía", friendlyError(error), "error");
  }
}

function closePhotoViewer() {
  if (!els.photoViewerModal) return;
  els.photoViewerModal.classList.add("hidden");
  els.photoViewerImage.classList.add("hidden");
  els.photoViewerImage.removeAttribute("src");
  els.photoViewerLoading.classList.remove("hidden");
  if (els.captureModal.classList.contains("hidden")) document.body.style.overflow = "";
}

els.closePhotoViewerButton?.addEventListener("click", closePhotoViewer);
els.photoViewerModal?.querySelectorAll('[data-close-photo-viewer]').forEach((element) => element.addEventListener("click", closePhotoViewer));

function mapUrl(latitude, longitude) {
  return `https://www.google.com/maps?q=${encodeURIComponent(latitude)},${encodeURIComponent(longitude)}`;
}

els.startBreakButton.addEventListener("click", () => openCapture("start"));
els.endBreakButton.addEventListener("click", () => openCapture("end"));

async function openCapture(mode) {
  partCaptureStage = null;
  captureMode = mode;
  capturedBlob = null;
  capturedPosition = null;
  isSaving = false;
  cleanupCaptureObjectUrl();
  resetCaptureUi();

  const isStart = mode === "start";
  els.captureEyebrow.textContent = isStart ? "INICIO DEL DESCANSO" : "FIN DEL DESCANSO";
  els.captureTitle.textContent = isStart ? "Iniciar descanso" : "Finalizar descanso";
  els.captureSubtitle.textContent = isStart ? "Completa foto, ubicación y confirmación." : "Completa la foto final y confirma el cierre.";
  els.confirmCaptureButton.textContent = isStart ? "Confirmar inicio" : "Confirmar finalización";
  els.captureModal.classList.remove("hidden");
  document.body.style.overflow = "hidden";

  startCamera();
  locateForCapture();
}

function resetCaptureUi() {
  els.cameraVideo.classList.remove("hidden");
  els.photoPreview.classList.add("hidden");
  els.photoPreview.removeAttribute("src");
  els.cameraPlaceholder.classList.remove("hidden");
  els.takePhotoButton.classList.remove("hidden");
  els.takePhotoButton.disabled = true;
  els.retakePhotoButton.classList.add("hidden");
  els.fallbackPhotoLabel.classList.add("hidden");
  els.locationSpinner.className = "spinner";
  els.locationStatus.textContent = "Buscando ubicación…";
  els.locationHelp.textContent = "Mantené el GPS activado.";
  els.captureTime.textContent = new Date().toLocaleTimeString("es-UY", { hour: "2-digit", minute: "2-digit" });
  els.captureMapLink.classList.add("hidden");
  els.captureMapLink.href = "#";
  els.captureValidation.textContent = "Debes tomar una fotografía y obtener la ubicación antes de confirmar.";
  els.confirmCaptureButton.disabled = true;
  updateCaptureProgress();
}

async function startCamera() {
  stopCamera();
  if (!navigator.mediaDevices?.getUserMedia) {
    cameraFailed("Este navegador no permite cámara directa.");
    return;
  }

  try {
    cameraStream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: { ideal: "environment" }, width: { ideal: 1920 }, height: { ideal: 1080 } },
      audio: false
    });
    els.cameraVideo.srcObject = cameraStream;
    await els.cameraVideo.play();
    els.cameraPlaceholder.classList.add("hidden");
    els.takePhotoButton.disabled = false;
  } catch (error) {
    console.warn("Cámara:", error);
    cameraFailed("No se pudo abrir la cámara. Puedes usar la opción alternativa.");
  }
}

function cameraFailed(message) {
  els.cameraPlaceholder.classList.remove("hidden");
  els.cameraPlaceholder.querySelector("strong").textContent = "Cámara no disponible";
  els.cameraPlaceholder.querySelector("span").textContent = message;
  els.takePhotoButton.classList.add("hidden");
  els.fallbackPhotoLabel.classList.remove("hidden");
}

function stopCamera() {
  if (cameraStream) cameraStream.getTracks().forEach((track) => track.stop());
  cameraStream = null;
  els.cameraVideo.srcObject = null;
}

els.takePhotoButton.addEventListener("click", async () => {
  try {
    capturedBlob = await captureVideoFrame(els.cameraVideo);
    showPhotoPreview(capturedBlob);
    stopCamera();
    validateCapture();
  } catch (error) {
    showToast("No se pudo tomar la fotografía", friendlyError(error), "error");
  }
});

async function captureVideoFrame(video) {
  if (!video.videoWidth || !video.videoHeight) throw new Error("La cámara todavía no está lista.");
  const max = 1600;
  const scale = Math.min(1, max / Math.max(video.videoWidth, video.videoHeight));
  const width = Math.max(1, Math.round(video.videoWidth * scale));
  const height = Math.max(1, Math.round(video.videoHeight * scale));
  const canvas = els.cameraCanvas;
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext("2d", { alpha: false });
  context.drawImage(video, 0, 0, width, height);
  return new Promise((resolve, reject) => canvas.toBlob((blob) => blob ? resolve(blob) : reject(new Error("No se pudo procesar la imagen.")), "image/jpeg", .82));
}

els.fallbackPhotoInput.addEventListener("change", async () => {
  const file = els.fallbackPhotoInput.files?.[0];
  if (!file) return;
  try {
    capturedBlob = await compressImageFile(file, 1600, .82);
    showPhotoPreview(capturedBlob);
    validateCapture();
  } catch (error) {
    showToast("No se pudo procesar la fotografía", friendlyError(error), "error");
  } finally {
    els.fallbackPhotoInput.value = "";
  }
});

async function compressImageFile(file, maxSize, quality) {
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, maxSize / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.round(bitmap.width * scale));
  canvas.height = Math.max(1, Math.round(bitmap.height * scale));
  canvas.getContext("2d", { alpha: false }).drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  bitmap.close();
  return new Promise((resolve, reject) => canvas.toBlob((blob) => blob ? resolve(blob) : reject(new Error("No se pudo comprimir la imagen.")), "image/jpeg", quality));
}

function showPhotoPreview(blob) {
  cleanupCaptureObjectUrl();
  captureObjectUrl = URL.createObjectURL(blob);
  els.photoPreview.src = captureObjectUrl;
  els.photoPreview.classList.remove("hidden");
  els.cameraVideo.classList.add("hidden");
  els.cameraPlaceholder.classList.add("hidden");
  els.takePhotoButton.classList.add("hidden");
  els.fallbackPhotoLabel.classList.add("hidden");
  els.retakePhotoButton.classList.remove("hidden");
  updateCaptureProgress();
}

function cleanupCaptureObjectUrl() {
  if (captureObjectUrl) URL.revokeObjectURL(captureObjectUrl);
  captureObjectUrl = null;
}

els.retakePhotoButton.addEventListener("click", () => {
  capturedBlob = null;
  cleanupCaptureObjectUrl();
  els.photoPreview.classList.add("hidden");
  els.cameraVideo.classList.remove("hidden");
  els.retakePhotoButton.classList.add("hidden");
  els.takePhotoButton.classList.remove("hidden");
  startCamera();
  validateCapture();
});

els.refreshGpsButton.addEventListener("click", locateForCapture);

async function locateForCapture() {
  capturedPosition = null;
  els.locationSpinner.className = "spinner";
  els.locationStatus.textContent = "Buscando ubicación…";
  els.locationHelp.textContent = "Puede demorar algunos segundos.";
  els.captureMapLink.classList.add("hidden");
  els.captureMapLink.href = "#";
  validateCapture();

  try {
    const position = await getBestPosition((best) => renderLivePosition(best));
    capturedPosition = normalizePosition(position);
    renderCapturedPosition(capturedPosition);
  } catch (error) {
    els.locationSpinner.className = "spinner error";
    els.locationStatus.textContent = "No se obtuvo la ubicación";
    els.locationHelp.textContent = geolocationMessage(error);
    showToast("GPS no disponible", geolocationMessage(error), "error");
    updateCaptureProgress();
  }
  validateCapture();
}

function getBestPosition(onUpdate) {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Este dispositivo no ofrece geolocalización."));
      return;
    }

    let best = null;
    let watchId = null;
    let settled = false;
    const finish = (error) => {
      if (settled) return;
      settled = true;
      if (watchId !== null) navigator.geolocation.clearWatch(watchId);
      window.clearTimeout(timeoutId);
      if (best) resolve(best); else reject(error || new Error("No se obtuvo una ubicación."));
    };

    const timeoutId = window.setTimeout(() => finish(new Error("Tiempo de espera agotado para el GPS.")), 18000);
    watchId = navigator.geolocation.watchPosition((position) => {
      if (!best || position.coords.accuracy < best.coords.accuracy) {
        best = position;
        onUpdate?.(position);
      }
      if (position.coords.accuracy <= 20) finish();
    }, (error) => finish(error), {
      enableHighAccuracy: true,
      maximumAge: 0,
      timeout: 16000
    });
  });
}

function normalizePosition(position) {
  return {
    latitude: Number(position.coords.latitude),
    longitude: Number(position.coords.longitude),
    accuracy: Number(position.coords.accuracy),
    altitude: Number.isFinite(position.coords.altitude) ? Number(position.coords.altitude) : null,
    capturedAtClient: new Date(position.timestamp || Date.now()).toISOString()
  };
}

function renderLivePosition(position) {
  const normalized = normalizePosition(position);
  els.locationStatus.textContent = "Ubicación detectada";
  els.locationHelp.textContent = normalized.accuracy <= 30 ? "Confirmando la mejor lectura disponible…" : "Mejorando la señal de ubicación…";
}

function renderCapturedPosition(position) {
  els.locationSpinner.className = "spinner done";
  els.locationStatus.textContent = "Ubicación lista";
  els.locationHelp.textContent = "Podés abrirla en el mapa antes de confirmar.";
  els.captureTime.textContent = new Date().toLocaleTimeString("es-UY", { hour: "2-digit", minute: "2-digit" });
  els.captureMapLink.href = mapUrl(position.latitude, position.longitude);
  els.captureMapLink.classList.remove("hidden");
  updateCaptureProgress();
}

function geolocationMessage(error) {
  if (error?.code === 1) return "Permiso de ubicación denegado. Habilítalo en el navegador.";
  if (error?.code === 2) return "El dispositivo no pudo determinar la ubicación. Activa el GPS.";
  if (error?.code === 3) return "El GPS tardó demasiado. Intenta nuevamente en un lugar abierto.";
  return error?.message || "No se pudo obtener la ubicación GPS.";
}

function validateCapture() {
  const ready = Boolean(capturedBlob && capturedPosition && !isSaving);
  els.confirmCaptureButton.disabled = !ready;
  if (!capturedBlob && !capturedPosition) els.captureValidation.textContent = "Debes tomar una fotografía y obtener la ubicación antes de confirmar.";
  else if (!capturedBlob) els.captureValidation.textContent = "La ubicación está lista. Falta tomar la fotografía.";
  else if (!capturedPosition) els.captureValidation.textContent = "La fotografía está lista. Falta obtener la ubicación GPS.";
  else els.captureValidation.textContent = "Todo listo. Podés confirmar la marcación.";
  updateCaptureProgress();
}

function updateCaptureProgress() {
  const photoReady = Boolean(capturedBlob);
  const locationReady = Boolean(capturedPosition);
  const confirmReady = photoReady && locationReady;
  els.captureStepPhoto?.classList.toggle("done", photoReady);
  els.captureStepPhoto?.classList.toggle("active", !photoReady);
  els.captureStepLocation?.classList.toggle("done", locationReady);
  els.captureStepLocation?.classList.toggle("active", photoReady && !locationReady);
  els.captureStepConfirm?.classList.toggle("active", confirmReady);
  els.photoReadyBadge?.classList.toggle("ready", photoReady);
  els.locationReadyBadge?.classList.toggle("ready", locationReady);
  if (els.photoReadyBadge) els.photoReadyBadge.textContent = photoReady ? "Capturada" : "Pendiente";
  if (els.locationReadyBadge) els.locationReadyBadge.textContent = locationReady ? "Obtenida" : "Buscando";
}

els.testGpsButton.addEventListener("click", async () => {
  els.testGpsButton.disabled = true;
  els.testGpsButton.textContent = "Buscando GPS…";
  els.gpsTestResult.classList.remove("hidden");
  els.gpsTestResult.textContent = "Buscando la mejor ubicación disponible…";
  if (els.dashboardMapStatus) els.dashboardMapStatus.textContent = "Obteniendo ubicación…";
  try {
    const position = normalizePosition(await getBestPosition());
    const url = mapUrl(position.latitude, position.longitude);
    els.gpsTestResult.innerHTML = `<div class="gps-ready-copy"><strong>Ubicación disponible</strong><span>El dispositivo obtuvo correctamente la posición.</span></div><a class="gps-map-link" href="${url}" target="_blank" rel="noopener">Ver en el mapa</a>`;
    if (els.dashboardMapStatus) els.dashboardMapStatus.innerHTML = `<a href="${url}" target="_blank" rel="noopener">Ver ubicación en el mapa</a>`;
  } catch (error) {
    els.gpsTestResult.textContent = geolocationMessage(error);
    if (els.dashboardMapStatus) els.dashboardMapStatus.textContent = "No se pudo obtener la ubicación";
  } finally {
    els.testGpsButton.disabled = false;
    els.testGpsButton.textContent = "Comprobar GPS";
  }
});

els.confirmCaptureButton.addEventListener("click", saveCapture);

function createLocalId(prefix = "item") {
  if (crypto?.randomUUID) return `${prefix}-${crypto.randomUUID()}`;
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

async function refreshLocalBreakState() {
  if (!window.OfflineDB || !currentUser?.uid) return;
  localHistoryRecords = await OfflineDB.getBreaks(currentUser.uid);
  const localActive = await OfflineDB.getActiveBreak(currentUser.uid);
  if (localActive) {
    currentBreak = localActive;
    currentBreakId = localActive.id;
  } else if (currentBreak?.syncStatus === "pending") {
    currentBreak = null;
    currentBreakId = null;
  }
  renderMergedHistory();
  renderCurrentBreak();
  await updatePendingSyncUi();
}

async function saveCapture() {
  if (!currentUser || !capturedBlob || !capturedPosition || isSaving) return;
  const savingPartStage = partCaptureStage;
  const savingMode = captureMode;
  isSaving = true;
  validateCapture();
  updateActionButtons();
  showProcessing(
    savingPartStage ? "Guardando evidencia…" : savingMode === "start" ? "Iniciando descanso…" : "Finalizando descanso…",
    navigator.onLine ? "Guardando localmente y preparando sincronización." : "Guardando foto, hora y GPS en este dispositivo."
  );

  try {
    if (savingPartStage) await savePartEvidence(savingPartStage);
    else if (savingMode === "start") await saveBreakStart();
    else await saveBreakEnd();
    closeCapture(true);
    if (savingPartStage) {
      showToast("Evidencia guardada", `${PART_STAGE_CONFIG[savingPartStage].label}: foto y ubicación registradas${navigator.onLine ? "" : " sin conexión"}.`);
    } else {
      showToast(savingMode === "start" ? "Descanso iniciado" : "Descanso finalizado", navigator.onLine
        ? "El registro se guardó y se sincronizará automáticamente."
        : "El registro quedó pendiente en el dispositivo hasta recuperar Internet.");
    }
    if (navigator.onLine) attemptAutomaticSync().catch(() => {});
  } catch (error) {
    console.error(error);
    showToast("No se pudo guardar el registro", error.message || friendlyError(error), "error");
  } finally {
    isSaving = false;
    hideProcessing();
    validateCapture();
    updateActionButtons();
    updateConnectionState();
  }
}

async function saveBreakStart() {
  if (!window.OfflineDB) throw new Error("El almacenamiento offline no está disponible.");
  const uid = currentUser.uid;
  const existingActive = currentBreak?.status === "active" ? currentBreak : await OfflineDB.getActiveBreak(uid);
  if (existingActive) throw new Error("Ya existe un descanso activo para este usuario.");

  const breakId = createLocalId("break");
  const path = `breaks/${uid}/${breakId}/start.jpg`;
  const nowIso = new Date().toISOString();
  const record = {
    id: breakId,
    uid,
    userId: uid,
    userName: currentUser.displayName || "Operador",
    userEmail: currentUser.email || "",
    status: "active",
    startAtClient: nowIso,
    startLocation: capturedPosition,
    startPhotoPath: path,
    startPhotoBlob: capturedBlob,
    createdAtClient: nowIso,
    updatedAtClient: nowIso,
    syncStatus: "pending"
  };

  await OfflineDB.putBreak(record);
  await OfflineDB.enqueue({
    id: `break-start:${uid}:${breakId}`,
    uid,
    type: "break-start",
    breakId,
    createdAt: Date.now()
  });
  currentBreak = record;
  currentBreakId = breakId;
  await refreshLocalBreakState();
}

async function saveBreakEnd() {
  if (!window.OfflineDB) throw new Error("El almacenamiento offline no está disponible.");
  const uid = currentUser.uid;
  const active = currentBreak?.status === "active" ? currentBreak : await OfflineDB.getActiveBreak(uid);
  if (!active?.id) throw new Error("No existe un descanso activo para finalizar.");

  const breakId = active.id;
  const path = `breaks/${uid}/${breakId}/end.jpg`;
  const nowIso = new Date().toISOString();
  const record = {
    ...active,
    uid,
    userId: uid,
    status: "completed",
    endAtClient: nowIso,
    endLocation: capturedPosition,
    endPhotoPath: path,
    endPhotoBlob: capturedBlob,
    updatedAtClient: nowIso,
    syncStatus: "pending"
  };

  await OfflineDB.putBreak(record);
  await OfflineDB.enqueue({
    id: `break-end:${uid}:${breakId}`,
    uid,
    type: "break-end",
    breakId,
    createdAt: Date.now()
  });
  currentBreak = null;
  currentBreakId = null;
  await refreshLocalBreakState();
}

function sanitizeForFirestore(value) {
  if (value === null || value === undefined) return value;
  if (value instanceof Blob) return undefined;
  if (typeof value?.toDate === "function") return value;
  if (Array.isArray(value)) return value.map(sanitizeForFirestore).filter((item) => item !== undefined);
  if (typeof value !== "object") return value;
  const output = {};
  const localOnlyKeys = new Set(["id", "uid", "syncStatus", "updatedAtLocal", "startPhotoBlob", "endPhotoBlob", "localPhotoBlob"]);
  Object.entries(value).forEach(([key, item]) => {
    if (localOnlyKeys.has(key)) return;
    const cleaned = sanitizeForFirestore(item);
    if (cleaned !== undefined) output[key] = cleaned;
  });
  return output;
}

async function ensureRemotePhoto(path, blob, metadata = {}) {
  if (!path) throw new Error("La fotografía no tiene una ruta de destino.");
  const ref = storageRef(storage, path);
  try {
    await getDownloadURL(ref);
    return path;
  } catch (error) {
    if (error?.code && error.code !== "storage/object-not-found") throw error;
  }
  if (!(blob instanceof Blob)) throw new Error(`No se encontró la foto local pendiente: ${path}`);
  await uploadBytes(ref, blob, { contentType: "image/jpeg", customMetadata: metadata });
  return path;
}

async function syncBreakStart(item) {
  const record = await OfflineDB.getBreak(item.breakId);
  if (!record) throw new Error("No se encontró el descanso local de inicio.");
  await ensureRemotePhoto(record.startPhotoPath, record.startPhotoBlob, {
    userId: item.uid,
    breakId: item.breakId,
    mark: "start"
  });

  const breakRef = doc(db, "users", item.uid, "breaks", item.breakId);
  const currentRef = doc(db, "users", item.uid, "current", "break");
  await setDoc(breakRef, {
    userId: item.uid,
    userName: record.userName || "Operador",
    userEmail: record.userEmail || "",
    status: "active",
    startAt: serverTimestamp(),
    startAtClient: record.startAtClient,
    startLocation: record.startLocation,
    startPhotoPath: record.startPhotoPath,
    createdAt: serverTimestamp(),
    createdAtClient: record.createdAtClient || record.startAtClient,
    updatedAt: serverTimestamp(),
    updatedAtClient: record.updatedAtClient || record.startAtClient
  }, { merge: true });
  await setDoc(currentRef, {
    userId: item.uid,
    breakId: item.breakId,
    status: "active",
    startAtClient: record.startAtClient,
    updatedAt: serverTimestamp()
  }, { merge: true });

  record.startSynced = true;
  if (record.status === "active") record.syncStatus = "synced";
  await OfflineDB.putBreak(record);
}

async function syncBreakEnd(item) {
  const record = await OfflineDB.getBreak(item.breakId);
  if (!record) throw new Error("No se encontró el descanso local de finalización.");

  // Si el inicio todavía no llegó al servidor, se crea primero para respetar las reglas de Firestore.
  const breakRef = doc(db, "users", item.uid, "breaks", item.breakId);
  const remote = await getDoc(breakRef);
  if (!remote.exists()) {
    await syncBreakStart({ ...item, type: "break-start" });
  }

  await ensureRemotePhoto(record.endPhotoPath, record.endPhotoBlob, {
    userId: item.uid,
    breakId: item.breakId,
    mark: "end"
  });

  await setDoc(breakRef, {
    userId: item.uid,
    status: "completed",
    endAt: serverTimestamp(),
    endAtClient: record.endAtClient,
    endLocation: record.endLocation,
    endPhotoPath: record.endPhotoPath,
    updatedAt: serverTimestamp(),
    updatedAtClient: record.updatedAtClient || record.endAtClient
  }, { merge: true });
  await deleteDoc(doc(db, "users", item.uid, "current", "break"));

  record.startSynced = true;
  record.endSynced = true;
  record.syncStatus = "synced";
  await OfflineDB.putBreak(record);
}

async function syncPartUpsert(item) {
  const part = await OfflineDB.getPart(item.uid, item.partId);
  if (!part) throw new Error("No se encontró el parte local pendiente.");

  for (const [stageKey, config] of Object.entries(PART_STAGE_CONFIG)) {
    const entry = part?.[config.group]?.[config.key];
    if (!entry?.localPhotoBlob) continue;
    await ensureRemotePhoto(entry.photoPath, entry.localPhotoBlob, {
      userId: item.uid,
      partId: item.partId,
      stage: stageKey
    });
    entry.photoSynced = true;
    entry.syncStatus = "synced";
  }

  const clean = sanitizeForFirestore(part);
  clean.userId = item.uid;
  clean.dateKey = item.partId;
  clean.updatedAt = serverTimestamp();
  if (!clean.createdAtClient) clean.createdAtClient = new Date().toISOString();
  if (clean.status === "completed") clean.completedAt = serverTimestamp();
  await setDoc(doc(db, "users", item.uid, "parts", item.partId), clean, { merge: true });

  part.syncStatus = "synced";
  await OfflineDB.putPart(part);
  currentPart = part;
}

async function processSyncItem(item) {
  if (item.type === "break-start") return syncBreakStart(item);
  if (item.type === "break-end") return syncBreakEnd(item);
  if (item.type === "part-upsert") return syncPartUpsert(item);
  throw new Error(`Tipo de sincronización desconocido: ${item.type}`);
}

async function attemptAutomaticSync(manual = false) {
  if (syncInProgress || !navigator.onLine || !window.OfflineDB || !window.LubaydSyncQueue || !currentUser?.uid) return;
  if (!firebaseReady || !auth || !db || !storage) {
    if (manual) showToast("Firebase aún no está disponible", "Espera unos segundos y vuelve a intentar.", "error");
    return;
  }
  const authenticatedUser = auth.currentUser;
  if (!authenticatedUser || authenticatedUser.uid !== currentUser.uid) {
    if (manual) showToast("Debes validar la sesión online", "Ingresa con correo y contraseña para sincronizar este dispositivo.", "error");
    els.connectionText.textContent = "Conectado; falta validar sesión";
    return;
  }

  const pending = await OfflineDB.countPending(currentUser.uid);
  if (!pending) {
    await updatePendingSyncUi();
    return;
  }

  syncInProgress = true;
  try {
    const result = await LubaydSyncQueue.process({
      uid: currentUser.uid,
      adapter: processSyncItem,
      onProgress: ({ index, total }) => updatePendingSyncUi({ running: true, processed: index - 1, total }),
      onChange: (state) => updatePendingSyncUi(state)
    });
    await loadLocalState(currentUser.uid);
    if (result.processed) showToast("Sincronización completada", `${result.processed} registro${result.processed === 1 ? "" : "s"} enviado${result.processed === 1 ? "" : "s"} a Firebase.`);
    if (result.failed) showToast("Quedaron registros pendientes", "La aplicación volverá a intentar automáticamente.", "error");
  } finally {
    syncInProgress = false;
    await updatePendingSyncUi();
    updateConnectionState();
  }
}

function showProcessing(title, message) {
  els.processingTitle.textContent = title;
  els.processingMessage.textContent = message;
  els.processingOverlay.classList.remove("hidden");
}
function hideProcessing() { els.processingOverlay.classList.add("hidden"); }

els.closeCaptureButton.addEventListener("click", () => closeCapture());
els.captureModal.querySelector(".modal-backdrop").addEventListener("click", () => closeCapture());

function closeCapture(force = false) {
  if (isSaving && !force) return;
  stopCamera();
  cleanupCaptureObjectUrl();
  capturedBlob = null;
  capturedPosition = null;
  partCaptureStage = null;
  els.captureModal.classList.add("hidden");
  document.body.style.overflow = "";
}

window.addEventListener("beforeunload", stopCamera);


async function initializeFirebaseServices() {
  const sdkVersion = "10.14.1";
  try {
    const [appSdk, authSdk, firestoreSdk, storageSdk] = await Promise.all([
      import(`https://www.gstatic.com/firebasejs/${sdkVersion}/firebase-app.js`),
      import(`https://www.gstatic.com/firebasejs/${sdkVersion}/firebase-auth.js`),
      import(`https://www.gstatic.com/firebasejs/${sdkVersion}/firebase-firestore.js`),
      import(`https://www.gstatic.com/firebasejs/${sdkVersion}/firebase-storage.js`)
    ]);

    setPersistence = authSdk.setPersistence;
    browserLocalPersistence = authSdk.browserLocalPersistence;
    createUserWithEmailAndPassword = authSdk.createUserWithEmailAndPassword;
    signInWithEmailAndPassword = authSdk.signInWithEmailAndPassword;
    signOut = authSdk.signOut;
    updateProfile = authSdk.updateProfile;
    onAuthStateChanged = authSdk.onAuthStateChanged;

    doc = firestoreSdk.doc;
    setDoc = firestoreSdk.setDoc;
    getDoc = firestoreSdk.getDoc;
    deleteDoc = firestoreSdk.deleteDoc;
    collection = firestoreSdk.collection;
    query = firestoreSdk.query;
    orderBy = firestoreSdk.orderBy;
    limit = firestoreSdk.limit;
    onSnapshot = firestoreSdk.onSnapshot;
    runTransaction = firestoreSdk.runTransaction;
    serverTimestamp = firestoreSdk.serverTimestamp;
    enableMultiTabIndexedDbPersistence = firestoreSdk.enableMultiTabIndexedDbPersistence;

    storageRef = storageSdk.ref;
    uploadBytes = storageSdk.uploadBytes;
    getDownloadURL = storageSdk.getDownloadURL;

    const firebaseApp = appSdk.initializeApp(firebaseConfig);
    auth = authSdk.getAuth(firebaseApp);
    db = firestoreSdk.getFirestore(firebaseApp);
    storage = storageSdk.getStorage(firebaseApp);

    if (typeof setPersistence === "function" && browserLocalPersistence) {
      setPersistence(auth, browserLocalPersistence).catch((error) => console.warn("Persistencia Auth:", error));
    }
    if (typeof enableMultiTabIndexedDbPersistence === "function") {
      enableMultiTabIndexedDbPersistence(db).catch((error) => {
        if (error?.code !== "failed-precondition" && error?.code !== "unimplemented") {
          console.warn("Persistencia Firestore:", error);
        }
      });
    }

    firebaseReady = true;
    window.__FIREBASE_READY__ = true;
    if (els.startupError) {
      els.startupError.textContent = "";
      els.startupError.classList.add("hidden");
    }
    onAuthStateChanged(auth, handleAuthStateChanged);
  } catch (error) {
    firebaseReady = false;
    window.__FIREBASE_READY__ = false;
    console.error("No se pudo cargar Firebase:", error);
    const offlineAvailable = Boolean(offlineProfile?.offlineAccessEnabled);
    const message = window.location.protocol === "file:"
      ? "Estás abriendo index.html desde una carpeta. La aplicación debe abrirse desde la dirección HTTPS de GitHub Pages."
      : !navigator.onLine && offlineAvailable
        ? "Firebase no está disponible sin conexión. Ingresa con tu PIN offline."
        : "No se pudo cargar Firebase. Actualiza la página y revisa que la red no bloquee www.gstatic.com.";
    if (els.startupError) {
      els.startupError.textContent = message;
      els.startupError.classList.toggle("hidden", !navigator.onLine && offlineAvailable);
    }
    if (!offlineAvailable || navigator.onLine) showAuthMessage(message);
    await renderOfflineAccessPanel();
  }
}

async function ensureFirebaseServices() {
  if (firebaseReady) return true;
  if (!firebaseInitializationPromise) {
    firebaseInitializationPromise = initializeFirebaseServices()
      .catch((error) => {
        console.warn("Inicialización de Firebase:", error);
        return false;
      })
      .finally(() => {
        firebaseInitializationPromise = null;
      });
  }
  await firebaseInitializationPromise;
  return firebaseReady;
}

async function bootApplication() {
  await initializeOfflineAccess();
  await ensureFirebaseServices();
}

bootApplication();
