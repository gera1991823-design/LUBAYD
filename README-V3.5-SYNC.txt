APP LUBAYD V3.5.0 - CORRECCION DE COLA PENDIENTE

PROBLEMA
El Parte se guardaba correctamente en Firestore, pero la cola quedaba pendiente porque app.js llamaba a una funcion inexistente: renderDashboard().

CORRECCION
- Se reemplazo renderDashboard() por renderDashboardCards().
- Se aumento la version de cache a 3.5.0 para impedir que Safari/Chrome reutilicen el JavaScript anterior.
- No es necesario volver a publicar las reglas de Firebase si el Parte ya figura como Guardado.

INSTALACION
1. Reemplazar todos los archivos del repositorio por los de este paquete, o al menos index.html, app.js, service-worker.js y reset.html.
2. Hacer Commit changes.
3. Abrir /reset.html y pulsar Actualizar y abrir aplicacion.
4. Iniciar sesion y pulsar Sincronizar.

RESULTADO ESPERADO
El registro pendiente se elimina de la cola local y el estado muestra Todo sincronizado.
