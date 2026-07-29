APP LUBAYD V4.0 - CHAT GENERAL

ARCHIVOS QUE DEBES REEMPLAZAR EN GITHUB
- index.html
- app.js
- styles.css
- offline-db.js
- service-worker.js
- reset.html

ARCHIVO QUE DEBES PUBLICAR EN FIREBASE
- firestore.rules

CAMBIOS
- Se agrega Chat general para Operadores, Mecanicos y Administradores.
- Los mensajes se actualizan en tiempo real cuando hay Internet.
- Sin Internet, los mensajes se guardan como Pendientes y se sincronizan al reconectar.
- Los ultimos mensajes quedan disponibles en el dispositivo.
- Se corrige el texto visible Contrasena por Contraseña.

IMPORTANTE
No reemplaces storage.rules. El chat de esta version es solo de texto y no necesita cambios en Storage.
