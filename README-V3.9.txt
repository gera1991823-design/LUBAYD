APP LUBAYD V3.9 - TROZA Y SERVICIOS MULTIPLES POR PARTE

CAMBIOS

1. PRODUCCION
- El campo "Trozo" ahora se llama "Troza".
- Los Partes nuevos guardan production.troza.
- La aplicacion sigue leyendo production.trozo de registros antiguos para no perder datos.

2. SERVICIOS MULTIPLES
- Cada inicio y finalizacion se guarda como una sesion de servicio independiente.
- Cada sesion queda asociada al mismo Parte mediante partId.
- Un Parte puede tener varios servicios en el mismo dia.
- No se permite iniciar un segundo servicio mientras otro del mismo Parte este activo.
- Al finalizar, aparece el boton "+ Nuevo servicio" para comenzar una nueva sesion.
- Se agrego el historial de servicios asociados al Parte, con numero, estado, horario y duracion.
- Cada servicio tiene un identificador unico y un numero consecutivo dentro del Parte.
- Funciona online y offline y conserva la cola de sincronizacion.

ARCHIVOS A REEMPLAZAR

index.html
app.js
styles.css
service-worker.js
reset.html

No es necesario volver a publicar firestore.rules ni storage.rules, porque la estructura de seguridad no cambia.

ACTUALIZACION

1. Subir los archivos a la raiz del repositorio LUBAYD.
2. Hacer Commit changes.
3. Esperar la publicacion de GitHub Pages.
4. Abrir:
   https://gera1991823-design.github.io/LUBAYD/reset.html
5. Presionar "Actualizar y abrir aplicacion".

IMPORTANTE
No borrar IndexedDB ni los datos del sitio si hay registros pendientes.
