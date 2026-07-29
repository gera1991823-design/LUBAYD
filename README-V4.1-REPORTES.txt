APP LUBAYD V4.1 - PANEL ADMINISTRATIVO

ARCHIVOS A REEMPLAZAR EN GITHUB
- index.html
- app.js
- styles.css
- service-worker.js
- reset.html

NO HACE FALTA CAMBIAR
- firestore.rules
- storage.rules
- offline-db.js
- sync-manager.js
- manifest.webmanifest
- logo-original.png
- icon-192.png
- icon-512.png

NUEVA SECCION: REPORTES
Visible solamente para usuarios con role: "admin".

Incluye:
- Filtro por fecha desde/hasta.
- Filtro por operador.
- Filtro por maquina para combustible y servicio.
- Cantidad de descansos.
- Horas totales y promedio de descanso.
- Litros de combustible por dia, operador y maquina.
- Horas de servicio por maquina.
- Tabla detallada de servicios con operador, mecanico y duracion.
- Ultimos datos guardados disponibles cuando el administrador queda sin conexion.

PASOS
1. Descomprimir el ZIP.
2. Reemplazar los cinco archivos en la raiz del repositorio LUBAYD.
3. Hacer Commit changes.
4. Esperar a que GitHub Pages publique la actualizacion.
5. Abrir https://gera1991823-design.github.io/LUBAYD/reset.html
6. Presionar "Actualizar y abrir aplicacion".
7. Ingresar con un usuario cuyo campo en Firestore sea role: "admin".
8. Abrir la opcion Reportes.

La primera carga del panel requiere Internet para descargar los datos de Firebase.
Luego queda disponible la ultima consulta guardada en ese dispositivo.
