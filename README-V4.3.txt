APP LUBAYD V4.3 — INTERFAZ FLUIDA, FOTO DE PERFIL Y LIMPIEZA ADMINISTRATIVA

CAMBIOS
- Cerrar sesión siempre visible en el menú lateral, encabezado de PC y encabezado móvil.
- Se eliminan del menú lateral el nombre de prueba y el correo electrónico.
- Foto circular junto al saludo del usuario.
- Cada usuario puede cambiar su propia foto.
- El administrador puede cargar la foto de cualquier usuario desde Usuarios.
- Navegación lateral con desplazamiento independiente y pie siempre visible.
- Tarjetas, espacios, animaciones y formularios más fluidos.
- Herramienta administrativa para limpiar Partes, Servicios y Cargas de combustible.
- Opción independiente para reiniciar el saldo del tanque a 0 L conservando la capacidad.
- Señal global de limpieza: los otros dispositivos eliminan sus copias locales antiguas al volver a conectarse.

ARCHIVOS A REEMPLAZAR EN GITHUB
index.html
styles.css
app.js
offline-db.js
service-worker.js
manifest.webmanifest
reset.html

REGLAS A PUBLICAR EN FIREBASE
firestore.rules
storage.rules

IMPORTANTE SOBRE LA LIMPIEZA
La limpieza no se ejecuta automáticamente al instalar el código. Para evitar una eliminación accidental:
1. Ingresar con un usuario role = admin.
2. Abrir Usuarios.
3. Ir a Limpiar datos de prueba.
4. Mantener seleccionados Partes, Servicios y Cargas de combustible.
5. Marcar Reiniciar tanque a 0 L únicamente si también se desea vaciar el saldo.
6. Escribir ELIMINAR.
7. Presionar Limpiar datos seleccionados.

La limpieza no elimina usuarios, roles, acceso offline, PIN ni mensajes del chat.

ACTUALIZACIÓN
Después de subir los archivos, abrir:
https://gera1991823-design.github.io/LUBAYD/reset.html

Presionar Actualizar y abrir aplicación.
