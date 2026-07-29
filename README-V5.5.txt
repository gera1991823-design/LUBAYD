APP LUBAYD V5.5.0 - CHAT DIRECTO ENTRE USUARIOS
=================================================

CAMBIOS PRINCIPALES
-------------------
1. Se reemplaza el chat general por mensajería privada entre usuarios.
2. Operadores, mecánicos y administradores pueden acceder al Chat.
3. Se agrega buscador por nombre, correo y rol.
4. Cada conversación muestra:
   - Nombre y fotografía del destinatario.
   - Rol del usuario.
   - Historial privado.
   - Hora de cada mensaje.
   - Estado Pendiente, Enviado o Leído.
5. Los mensajes se actualizan en tiempo real con Firestore.
6. Sin conexión, el mensaje se guarda en IndexedDB y queda pendiente para sincronizarse.
7. En celular, la vista funciona como una aplicación de mensajería:
   - Lista de contactos.
   - Conversación a pantalla completa.
   - Botón para volver a contactos.
   - Barra de escritura compacta.
8. Se agregan contadores de mensajes no leídos.
9. El administrador también puede utilizar el chat sin obtener funciones operativas adicionales.

ARCHIVOS PARA REEMPLAZAR EN GITHUB
----------------------------------
- index.html
- app.js
- styles.css
- service-worker.js
- manifest.webmanifest
- reset.html

REGLA OBLIGATORIA EN FIREBASE
-----------------------------
También debe publicarse el archivo:
- firestore.rules

Ruta en Firebase:
Firestore Database > Reglas

La nueva regla habilita:
- Lectura del directorio interno de usuarios activos.
- Colección directMessages.
- Lectura exclusiva para remitente y destinatario.
- Envío validado por usuario autenticado.
- Actualización segura del estado Leído.

No es necesario modificar storage.rules.

ACTUALIZACIÓN
-------------
1. Reemplazar los archivos indicados en el repositorio LUBAYD.
2. Confirmar con Commit changes.
3. Publicar firestore.rules en Firebase.
4. Esperar la publicación de GitHub Pages.
5. Abrir:
   https://gera1991823-design.github.io/LUBAYD/reset.html
6. Presionar "Actualizar y abrir aplicación".
7. Verificar que aparezca Version 5.5.0.

PRUEBA RECOMENDADA
------------------
1. Ingresar con un operador.
2. Abrir Chat y buscar al mecánico o administrador.
3. Enviar un mensaje.
4. Ingresar con el destinatario desde otro navegador o dispositivo.
5. Abrir Chat y confirmar que el mensaje aparece en tiempo real.
6. Responder y comprobar que el estado cambia a Leído.

NOTA DE PRIVACIDAD
------------------
Los mensajes nuevos se guardan en directMessages y solo pueden ser leídos por los dos usuarios incluidos en la conversación. Los mensajes antiguos del chat general no se muestran en esta versión.
