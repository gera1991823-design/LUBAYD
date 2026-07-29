APP LUBAYD V5.0 - TODOS LOS REGISTROS PARA ADMINISTRADOR

CAMBIOS
- El administrador ve Partes de todos los operadores.
- El administrador ve descansos de todos los operadores.
- El administrador ve servicios de todos los mecanicos.
- El administrador ve todas las cargas de combustible.
- La pestaña Actividad del administrador incluye filtros por tipo, usuario, fecha y texto.
- Se agrego la coleccion canonica operationalBreaks para actualizacion en tiempo real.
- Los descansos antiguos se migran automaticamente desde users/{uid}/breaks.

ARCHIVOS A REEMPLAZAR EN GITHUB
index.html
app.js
styles.css
offline-db.js
service-worker.js
manifest.webmanifest
reset.html

FIREBASE
Publicar nuevamente firestore.rules porque se agrega operationalBreaks.

ACTUALIZACION
Abrir https://gera1991823-design.github.io/LUBAYD/reset.html y presionar Actualizar y abrir aplicacion.
