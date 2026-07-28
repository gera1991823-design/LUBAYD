APP LUBAYD V3.8 - NUEVO PARTE Y ACCESO OFFLINE VISIBLE

CAMBIOS PRINCIPALES

1. PARTES DIARIOS POR OPERADOR Y MAQUINA
- Cada Parte queda identificado por operador + fecha + maquina.
- Un mismo operador puede crear varios Partes en el mismo dia, siempre que sean de maquinas diferentes.
- Se agrego el boton "+ Nuevo parte".
- Se agrego el selector "Partes del dia" para abrir y continuar un Parte existente.
- Si se intenta crear otro Parte para la misma maquina y fecha, la aplicacion abre el Parte existente y evita duplicados.
- Los mecanicos continuan viendo los Partes del dia para seleccionar el operador y la maquina en Servicio.

2. INGRESO CON Y SIN INTERNET
- La pantalla de inicio muestra siempre las dos opciones:
  a) Ingresar con Internet mediante correo y contrasena.
  b) Ingresar sin conexion mediante PIN de 6 numeros.
- Si el telefono todavia no esta configurado, la opcion offline se muestra deshabilitada con una explicacion.
- Para habilitarla, el usuario debe ingresar una vez con Internet y configurar el PIN cuando la aplicacion lo solicite.
- Luego puede abrir la app e ingresar con el PIN aunque no tenga Internet.

3. BASE OFFLINE ACTUALIZADA
- IndexedDB se actualiza a la version 3.
- Ahora admite varios Partes del mismo operador en una fecha, diferenciados por maquina.
- Los datos anteriores se conservan durante la actualizacion.

ARCHIVOS QUE DEBEN REEMPLAZARSE EN GITHUB

index.html
app.js
styles.css
offline-db.js
service-worker.js
reset.html

No es necesario volver a publicar las reglas de Firestore ni Storage para estos cambios.

ACTUALIZACION

1. Subir los archivos a la raiz del repositorio LUBAYD.
2. Hacer Commit changes.
3. Esperar la publicacion de GitHub Pages.
4. Abrir:
   https://gera1991823-design.github.io/LUBAYD/reset.html
5. Presionar "Actualizar y abrir aplicacion".

IMPORTANTE
No borrar los datos del sitio ni IndexedDB si hay registros pendientes, porque alli se guardan las fotos y datos offline.
