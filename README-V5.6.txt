APP LUBAYD V5.6 - GPS OPCIONAL Y SINCRONIZACION OFFLINE

CAMBIOS
- La ubicacion GPS ya no bloquea Partes, Descansos ni Servicios.
- La fotografia continua siendo obligatoria en los flujos que ya la requerian.
- Se intenta obtener GPS preciso durante 45 segundos.
- Si falla, se intenta una ubicacion aproximada o guardada recientemente.
- Si tampoco se obtiene, el usuario puede guardar sin ubicacion.
- El registro y la foto quedan en IndexedDB como pendientes.
- Cuando vuelve Internet, se suben a Firebase mediante la cola de sincronizacion.
- Se guarda locationStatus para distinguir: captured, skipped, unavailable o not-required.
- Las pantallas de evidencia muestran Sin ubicacion GPS cuando corresponda.

ARCHIVOS PARA REEMPLAZAR
index.html
app.js
styles.css
service-worker.js
manifest.webmanifest
reset.html

NO REQUIERE CAMBIOS EN FIRESTORE.RULES NI STORAGE.RULES.

PUBLICACION
1. Subir los seis archivos a la raiz del repositorio.
2. Confirmar el commit.
3. Abrir /reset.html y actualizar.
4. Verificar Version 5.6.0.
