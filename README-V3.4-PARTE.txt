APP LUBAYD V3.4.0 - CORRECCION DEFINITIVA DE PERMISOS DEL PARTE

PROBLEMA CORREGIDO
- El Parte quedaba Pendiente con el mensaje "Missing or insufficient permissions".
- La version anterior escribia el mismo Parte en dos rutas dentro de un batch.
- Si una de las rutas tenia reglas antiguas, Firebase rechazaba las dos escrituras.

CAMBIO
- operationalParts/{parteId} es ahora la unica fuente canonica.
- El operador puede crear y actualizar solamente su propio Parte.
- Se permite reparar Partes antiguos que no tenian operatorUid.
- La cola offline existente se conserva y se vuelve a intentar al abrir V3.4.

INSTALACION
1. Reemplazar todos los archivos del repositorio con los del ZIP V3.4.
2. Publicar firestore.rules en Firebase > Firestore > Reglas.
3. Publicar storage.rules en Firebase > Storage > Reglas.
4. Abrir /reset.html y pulsar Actualizar y abrir aplicacion.
5. Ingresar con Internet y pulsar Sincronizar.

IMPORTANTE
- Confirmar que el proyecto abierto en Firebase sea APP LUBAYD / app-lubayd.
- No borrar los datos del sitio antes de sincronizar, porque ahi esta el Parte pendiente.
