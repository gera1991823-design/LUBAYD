APP LUBAYD V6.4 - TANQUE PRINCIPAL Y CIERRE DE SESIÓN MÓVIL

Cambios:
- Administradores y mecánicos pueden abrir la sección Combustible/Tanque.
- Ambos roles pueden registrar cargas al tanque principal.
- La carga se sincroniza mediante transacción para evitar sobreescrituras.
- El administrador conserva el ajuste de capacidad y saldo.
- El mecánico no puede cambiar la capacidad una vez configurada.
- El botón Más aparece para todos los roles en celular.
- El menú móvil mantiene Cerrar sesión visible en el pie.

Archivos a reemplazar:
index.html
app.js
styles.css
service-worker.js
manifest.webmanifest
reset.html
firestore.rules (publicar en Firebase)
