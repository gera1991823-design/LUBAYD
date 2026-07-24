"use strict";

// APP LUBAYD v1.6.0
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
  logoutButton: $("#logoutButton"),
  userName: $("#userName"),
  userEmail: $("#userEmail"),
  userAvatar: $("#userAvatar"),
  connectionDot: $("#connectionDot"),
  connectionText: $("#connectionText"),
  offlineWarning: $("#offlineWarning"),
  liveClock: $("#liveClock"),
  liveDate: $("#liveDate"),
  dashboardGreeting: $("#dashboardGreeting"),
  dashboardDate: $("#dashboardDate"),
  todayBreakCount: $("#todayBreakCount"),
  todayBreakTotal: $("#todayBreakTotal"),
  pageTitle: $("#pageTitle"),
  dashboardSection: $("#dashboardSection"),
  historySection: $("#historySection"),
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
  closePhotoViewerButton: $("#closePhotoViewerButton")
};

let currentUser = null;
let currentBreak = null;
let currentBreakId = null;
let unsubscribeCurrent = null;
let unsubscribeHistory = null;
let timerInterval = null;
let cameraStream = null;
let captureMode = "start";
let capturedBlob = null;
let capturedPosition = null;
let captureObjectUrl = null;
let isSaving = false;
let lastHistoryRecords = [];
const photoUrlCache = new Map();

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

els.loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  clearAuthMessage();
  if (!firebaseReady || !auth) {
    showAuthMessage("Firebase todavía no terminó de cargar. Espera unos segundos y vuelve a intentar.");
    return;
  }
  const email = $("#loginEmail").value.trim();
  const password = $("#loginPassword").value;
  setBusy(els.loginButton, true, "Ingresando…");
  try {
    await signInWithEmailAndPassword(auth, email, password);
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

    clearAuthMessage();
    showToast("Usuario creado", "La cuenta quedó registrada correctamente.");
  } catch (error) {
    const message = friendlyError(error);
    showAuthMessage(message);
    showToast("No se pudo crear el usuario", message, "error");
    console.error("Firebase Auth registro:", error);
  } finally {
    setBusy(els.registerButton, false);
  }
});

els.logoutButton.addEventListener("click", async () => {
  if (!firebaseReady || !auth) return;
  try {
    await signOut(auth);
  } catch (error) {
    showToast("No se pudo cerrar la sesión", friendlyError(error), "error");
  }
});

function updateConnectionState() {
  const online = navigator.onLine;
  els.connectionDot.classList.toggle("offline", !online);
  els.connectionText.textContent = online ? "Conexión disponible" : "Sin conexión";
  els.offlineWarning.classList.toggle("hidden", online);
  updateActionButtons();
}
window.addEventListener("online", updateConnectionState);
window.addEventListener("offline", updateConnectionState);
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
  const isDashboard = section === "dashboard";
  els.dashboardSection.classList.toggle("active", isDashboard);
  els.historySection.classList.toggle("active", !isDashboard);
  els.pageTitle.textContent = isDashboard ? "Descanso" : "Historial";
  $$(".nav-item").forEach((button) => button.classList.toggle("active", button.dataset.section === section));
  els.sidebar.classList.remove("open");
}
$$('.nav-item').forEach((button) => button.addEventListener("click", () => showSection(button.dataset.section)));
$$('[data-go-history]').forEach((button) => button.addEventListener("click", () => showSection("history")));
els.mobileMenuButton.addEventListener("click", () => els.sidebar.classList.toggle("open"));

document.addEventListener("click", (event) => {
  if (window.innerWidth <= 820 && els.sidebar.classList.contains("open") && !els.sidebar.contains(event.target) && event.target !== els.mobileMenuButton) {
    els.sidebar.classList.remove("open");
  }
});

async function handleAuthStateChanged(user) {
  clearSubscriptions();
  currentUser = user;
  if (!user) {
    clearAuthMessage();
    currentBreak = null;
    currentBreakId = null;
    els.authView.classList.remove("hidden");
    els.appView.classList.add("hidden");
    stopTimer();
    return;
  }

  els.authView.classList.add("hidden");
  els.appView.classList.remove("hidden");
  els.userName.textContent = user.displayName || "Operador";
  els.userEmail.textContent = user.email || "—";
  els.userAvatar.textContent = getInitials(user.displayName || user.email || "U");
  if (els.dashboardGreeting) {
    const hour = new Date().getHours();
    const greeting = hour < 12 ? "Buenos días" : hour < 19 ? "Buenas tardes" : "Buenas noches";
    const operatorName = (user.displayName || "Operador").trim().split(/\s+/)[0];
    els.dashboardGreeting.textContent = `${greeting}, ${operatorName}`;
  }

  try {
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
    }
  } catch (error) {
    console.warn("Perfil:", error);
  }

  subscribeCurrentBreak(user.uid);
  subscribeHistory(user.uid);
}

function getInitials(value) {
  const pieces = String(value).trim().split(/\s+/).filter(Boolean);
  return (pieces.slice(0, 2).map((part) => part[0]).join("") || "U").toUpperCase();
}

function clearSubscriptions() {
  if (unsubscribeCurrent) unsubscribeCurrent();
  if (unsubscribeHistory) unsubscribeHistory();
  unsubscribeCurrent = null;
  unsubscribeHistory = null;
}

function subscribeCurrentBreak(uid) {
  const currentRef = doc(db, "users", uid, "current", "break");
  unsubscribeCurrent = onSnapshot(currentRef, async (snapshot) => {
    if (!snapshot.exists()) {
      currentBreak = null;
      currentBreakId = null;
      renderCurrentBreak();
      return;
    }

    const pointer = snapshot.data();
    if (!pointer.breakId) {
      currentBreak = null;
      currentBreakId = null;
      renderCurrentBreak();
      return;
    }

    currentBreakId = pointer.breakId;
    const breakSnap = await getDoc(doc(db, "users", uid, "breaks", pointer.breakId));
    currentBreak = breakSnap.exists() ? { id: breakSnap.id, ...breakSnap.data() } : null;
    renderCurrentBreak();
  }, (error) => showToast("No se pudo leer el descanso", friendlyError(error), "error"));
}

function subscribeHistory(uid) {
  const historyQuery = query(collection(db, "users", uid, "breaks"), orderBy("startAtClient", "desc"), limit(50));
  unsubscribeHistory = onSnapshot(historyQuery, (snapshot) => {
    const records = snapshot.docs.map((item) => ({ id: item.id, ...item.data() }));
    lastHistoryRecords = records;
    renderHistory(records);
    renderRecent(records.slice(0, 4));
    updateDailySummary(records);
  }, (error) => {
    els.historyList.innerHTML = `<div class="empty-state">No se pudo cargar el historial: ${escapeHtml(friendlyError(error))}</div>`;
    els.recentList.innerHTML = `<div class="empty-state">No se pudo cargar la actividad reciente.</div>`;
  });
}

function renderCurrentBreak() {
  const active = Boolean(currentBreak && currentBreak.status === "active");
  els.breakStatusTitle.textContent = active ? "Descanso en curso" : "Sin descanso activo";
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
    els.breakStartDescription.textContent = "Todavía no se inició un descanso.";
  }
  updateActionButtons();
}

function updateActionButtons() {
  const online = navigator.onLine;
  const active = Boolean(currentBreak && currentBreak.status === "active");
  els.startBreakButton.disabled = !currentUser || active || !online || isSaving;
  els.endBreakButton.disabled = !currentUser || !active || !online || isSaving;
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
  if (!els.todayBreakCount || !els.todayBreakTotal) return;
  const today = new Date();
  const sameDay = (date) => date.getFullYear() === today.getFullYear()
    && date.getMonth() === today.getMonth()
    && date.getDate() === today.getDate();

  const todaysRecords = records.filter((record) => sameDay(parseDate(record.startAtClient)));
  const totalSeconds = todaysRecords.reduce((sum, record) => {
    const duration = durationForRecord(record);
    return sum + (duration?.seconds || 0);
  }, 0);

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  els.todayBreakCount.textContent = String(todaysRecords.length);
  els.todayBreakTotal.textContent = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
}

function renderRecent(records) {
  if (!records.length) {
    els.recentList.innerHTML = `<div class="empty-state">Aún no hay descansos registrados.</div>`;
    return;
  }

  els.recentList.innerHTML = records.map((record) => {
    const start = parseDate(record.startAtClient);
    const end = record.endAtClient ? parseDate(record.endAtClient) : null;
    const dayLabel = start.toLocaleDateString("es-UY", { weekday: "short" }).replace(".", "");
    const dateLabel = start.toLocaleDateString("es-UY", { day: "2-digit", month: "short" });
    return `<article class="record-row">
      <div class="record-date">
        <span>${escapeHtml(dayLabel)}</span>
        <strong>${escapeHtml(dateLabel)}</strong>
      </div>
      <div class="record-times">
        <div><span>Inicio</span><strong>${escapeHtml(start.toLocaleTimeString("es-UY", { hour: "2-digit", minute: "2-digit" }))}</strong></div>
        <div><span>Finalización</span><strong>${end ? escapeHtml(end.toLocaleTimeString("es-UY", { hour: "2-digit", minute: "2-digit" })) : "En curso"}</strong></div>
      </div>
      <span class="badge ${record.status === "active" ? "active" : "complete"} record-status">${record.status === "active" ? "Activo" : "Completado"}</span>
    </article>`;
  }).join("");
}

function renderHistory(records) {
  if (!records.length) {
    els.historyList.innerHTML = `<div class="empty-state">Aún no hay descansos registrados.</div>`;
    return;
  }

  els.historyList.innerHTML = records.map((record) => {
    const start = parseDate(record.startAtClient);
    const end = record.endAtClient ? parseDate(record.endAtClient) : null;
    const duration = durationForRecord(record);
    const startLocation = record.startLocation;
    const endLocation = record.endLocation;
    const dateLong = start.toLocaleDateString("es-UY", { day: "2-digit", month: "long", year: "numeric" });
    const weekday = start.toLocaleDateString("es-UY", { weekday: "long" });
    const startTime = start.toLocaleTimeString("es-UY", { hour: "2-digit", minute: "2-digit" });
    const endTime = end ? end.toLocaleTimeString("es-UY", { hour: "2-digit", minute: "2-digit" }) : "En curso";
    const durationLabel = duration ? duration.label.slice(0, 5) : "En curso";

    const startPhoto = record.startPhotoPath
      ? historyPhotoTile(record.startPhotoPath, "Foto de inicio", "Inicio")
      : historyPhotoPlaceholder("Sin foto inicial");
    const endPhoto = record.endPhotoPath
      ? historyPhotoTile(record.endPhotoPath, "Foto de finalización", "Final")
      : historyPhotoPlaceholder(record.status === "active" ? "Pendiente" : "Sin foto final");

    return `<article class="history-card enterprise-history-card">
      <header class="history-card-head enterprise-history-head">
        <div class="history-date-block">
          <span class="history-calendar-icon" aria-hidden="true">▣</span>
          <div><strong>${escapeHtml(dateLong)}</strong><small>${escapeHtml(weekday)}</small></div>
        </div>
        <span class="badge ${record.status === "active" ? "active" : "complete"}">${record.status === "active" ? "Activo" : "Completado"}</span>
      </header>

      <div class="history-metrics-grid">
        <div><span>Inicio</span><strong>${escapeHtml(startTime)}</strong></div>
        <div><span>Finalización</span><strong>${escapeHtml(endTime)}</strong></div>
        <div><span>Duración</span><strong>${escapeHtml(durationLabel)}</strong></div>
      </div>

      <div class="history-location-row">
        <div><span class="resource-icon" aria-hidden="true">⌖</span><strong>Ubicación</strong></div>
        <div class="history-map-actions">
          ${startLocation ? `<a href="${mapUrl(startLocation.latitude, startLocation.longitude)}" target="_blank" rel="noopener">Ver inicio</a>` : `<span>Sin inicio</span>`}
          ${endLocation ? `<a href="${mapUrl(endLocation.latitude, endLocation.longitude)}" target="_blank" rel="noopener">Ver final</a>` : ""}
        </div>
      </div>

      <div class="history-photo-section">
        <div class="history-photo-heading"><strong>Fotografías</strong><small>Tocá una imagen para ampliarla</small></div>
        <div class="history-photo-grid">${startPhoto}${endPhoto}</div>
      </div>
    </article>`;
  }).join("");

  hydrateHistoryPhotos();
}

function historyPhotoTile(path, alt, label) {
  return `<button class="history-photo-tile is-loading" type="button" data-photo-open="${escapeHtml(path)}" data-photo-label="${escapeHtml(label)}">
    <span class="history-photo-label">${escapeHtml(label)}</span>
    <span class="history-photo-loader"><span class="mini-loader">…</span></span>
    <img data-photo-path="${escapeHtml(path)}" alt="${escapeHtml(alt)}" loading="lazy" decoding="async">
  </button>`;
}

function historyPhotoPlaceholder(message) {
  return `<div class="history-photo-tile history-photo-empty"><span>${escapeHtml(message)}</span></div>`;
}

async function resolvePhotoUrl(path) {
  if (photoUrlCache.has(path)) return photoUrlCache.get(path);
  const url = await getDownloadURL(storageRef(storage, path));
  photoUrlCache.set(path, url);
  return url;
}

function hydrateHistoryPhotos() {
  $$('[data-photo-open]').forEach((button) => {
    const path = button.dataset.photoOpen;
    const image = button.querySelector('img[data-photo-path]');
    if (!image || !path) return;

    resolvePhotoUrl(path).then((url) => {
      image.src = url;
      button.dataset.photoUrl = url;
      image.addEventListener("load", () => button.classList.remove("is-loading"), { once: true });
      image.addEventListener("error", () => {
        button.classList.remove("is-loading");
        button.classList.add("has-error");
      }, { once: true });
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
  if (!navigator.onLine) {
    showToast("Sin conexión", "Recupera internet para subir la fotografía a Firebase.", "error");
    return;
  }
  captureMode = mode;
  capturedBlob = null;
  capturedPosition = null;
  isSaving = false;
  cleanupCaptureObjectUrl();
  resetCaptureUi();

  const isStart = mode === "start";
  els.captureEyebrow.textContent = isStart ? "INICIO DEL DESCANSO" : "FIN DEL DESCANSO";
  els.captureTitle.textContent = isStart ? "Fotografía de inicio" : "Fotografía de finalización";
  els.captureSubtitle.textContent = isStart ? "Toma una foto actual y espera la ubicación GPS." : "Toma la foto final para cerrar el descanso.";
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
}

els.testGpsButton.addEventListener("click", async () => {
  els.testGpsButton.disabled = true;
  els.testGpsButton.textContent = "Buscando GPS…";
  els.gpsTestResult.classList.remove("hidden");
  els.gpsTestResult.textContent = "Buscando la mejor ubicación disponible…";
  try {
    const position = normalizePosition(await getBestPosition());
    els.gpsTestResult.innerHTML = `<div class="gps-ready-copy"><strong>Ubicación disponible</strong><span>El teléfono obtuvo correctamente la ubicación.</span></div><a class="gps-map-link" href="${mapUrl(position.latitude, position.longitude)}" target="_blank" rel="noopener">Ver en el mapa</a>`;
  } catch (error) {
    els.gpsTestResult.textContent = geolocationMessage(error);
  } finally {
    els.testGpsButton.disabled = false;
    els.testGpsButton.textContent = "Comprobar ubicación";
  }
});

els.confirmCaptureButton.addEventListener("click", saveCapture);

async function saveCapture() {
  if (!currentUser || !capturedBlob || !capturedPosition || isSaving) return;
  if (!navigator.onLine) {
    showToast("Sin conexión", "No se puede subir la fotografía en este momento.", "error");
    return;
  }

  isSaving = true;
  validateCapture();
  updateActionButtons();
  showProcessing(captureMode === "start" ? "Iniciando descanso…" : "Finalizando descanso…", "Subiendo fotografía y guardando GPS.");

  try {
    if (captureMode === "start") await saveBreakStart();
    else await saveBreakEnd();
    closeCapture();
    showToast(captureMode === "start" ? "Descanso iniciado" : "Descanso finalizado", "La fotografía, la hora y la ubicación quedaron guardadas.");
  } catch (error) {
    console.error(error);
    showToast("No se pudo guardar el registro", friendlyError(error), "error");
  } finally {
    isSaving = false;
    hideProcessing();
    validateCapture();
    updateActionButtons();
  }
}

async function saveBreakStart() {
  const uid = currentUser.uid;
  const breakRef = doc(collection(db, "users", uid, "breaks"));
  const currentRef = doc(db, "users", uid, "current", "break");
  const path = `breaks/${uid}/${breakRef.id}/start.jpg`;

  await uploadBytes(storageRef(storage, path), capturedBlob, {
    contentType: "image/jpeg",
    customMetadata: { userId: uid, breakId: breakRef.id, mark: "start" }
  });

  const nowIso = new Date().toISOString();
  await runTransaction(db, async (transaction) => {
    const currentSnapshot = await transaction.get(currentRef);
    if (currentSnapshot.exists() && currentSnapshot.data().status === "active") {
      throw new Error("Ya existe un descanso activo para este usuario.");
    }

    transaction.set(breakRef, {
      userId: uid,
      userName: currentUser.displayName || "Operador",
      userEmail: currentUser.email || "",
      status: "active",
      startAt: serverTimestamp(),
      startAtClient: nowIso,
      startLocation: capturedPosition,
      startPhotoPath: path,
      createdAt: serverTimestamp(),
      createdAtClient: nowIso,
      updatedAt: serverTimestamp()
    });

    transaction.set(currentRef, {
      userId: uid,
      breakId: breakRef.id,
      status: "active",
      startAtClient: nowIso,
      updatedAt: serverTimestamp()
    });
  });
}

async function saveBreakEnd() {
  const uid = currentUser.uid;
  const currentRef = doc(db, "users", uid, "current", "break");
  const currentSnapshot = await getDoc(currentRef);
  if (!currentSnapshot.exists() || !currentSnapshot.data().breakId) throw new Error("No existe un descanso activo para finalizar.");

  const breakId = currentSnapshot.data().breakId;
  const breakRef = doc(db, "users", uid, "breaks", breakId);
  const path = `breaks/${uid}/${breakId}/end.jpg`;

  await uploadBytes(storageRef(storage, path), capturedBlob, {
    contentType: "image/jpeg",
    customMetadata: { userId: uid, breakId, mark: "end" }
  });

  const nowIso = new Date().toISOString();
  await runTransaction(db, async (transaction) => {
    const pointerSnapshot = await transaction.get(currentRef);
    const breakSnapshot = await transaction.get(breakRef);
    if (!pointerSnapshot.exists() || pointerSnapshot.data().breakId !== breakId) throw new Error("El descanso activo cambió. Actualiza la pantalla.");
    if (!breakSnapshot.exists() || breakSnapshot.data().status !== "active") throw new Error("El descanso ya no está activo.");

    transaction.update(breakRef, {
      status: "completed",
      endAt: serverTimestamp(),
      endAtClient: nowIso,
      endLocation: capturedPosition,
      endPhotoPath: path,
      updatedAt: serverTimestamp()
    });
    transaction.delete(currentRef);
  });
}

function showProcessing(title, message) {
  els.processingTitle.textContent = title;
  els.processingMessage.textContent = message;
  els.processingOverlay.classList.remove("hidden");
}
function hideProcessing() { els.processingOverlay.classList.add("hidden"); }

els.closeCaptureButton.addEventListener("click", closeCapture);
els.captureModal.querySelector(".modal-backdrop").addEventListener("click", closeCapture);

function closeCapture() {
  if (isSaving) return;
  stopCamera();
  cleanupCaptureObjectUrl();
  capturedBlob = null;
  capturedPosition = null;
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
    const message = window.location.protocol === "file:"
      ? "Estás abriendo index.html desde una carpeta. La aplicación debe abrirse desde la dirección HTTPS de GitHub Pages."
      : "No se pudo cargar Firebase. Actualiza con Ctrl+F5 y revisa que la red no bloquee www.gstatic.com.";
    if (els.startupError) {
      els.startupError.textContent = message;
      els.startupError.classList.remove("hidden");
    }
    showAuthMessage(message);
  }
}

initializeFirebaseServices();
