# APP LUBAYD V2.3 — PIN y funcionamiento offline

Esta versión permite abrir la aplicación, ingresar con un PIN local y registrar descansos y Partes sin conexión. Las fotografías y los datos quedan en el dispositivo y se sincronizan automáticamente con Firebase cuando vuelve Internet.

## Archivos para reemplazar o agregar en GitHub

Subir todos estos archivos a la raíz del repositorio `LUBAYD`:

### Reemplazar

- `index.html`
- `app.js`
- `styles.css`
- `service-worker.js`
- `manifest.webmanifest`
- `reset.html`

### Agregar

- `offline-db.js`
- `sync-manager.js`

### Conservar o reemplazar si faltan

- `logo.svg`
- `icon-192.png`
- `icon-512.png`

Los archivos deben quedar directamente en la raíz del repositorio, no dentro de otra carpeta.

## Primera configuración del usuario

La primera vez en cada teléfono o computadora se necesita Internet:

1. Abrir la app desde GitHub Pages.
2. Iniciar sesión con correo y contraseña de Firebase.
3. Crear un PIN offline de exactamente 6 números.
4. Esperar a que la app indique `Todo sincronizado`.

A partir de ese momento el usuario puede bloquear o cerrar la aplicación y volver a ingresar con el PIN aunque no tenga Internet.

## Cómo funciona sin conexión

Sin Internet, el usuario puede:

- ingresar con su PIN local;
- iniciar y finalizar un descanso;
- tomar las fotografías obligatorias;
- obtener la ubicación GPS;
- completar horómetros;
- registrar Trozo y Pulpa;
- registrar inicio y finalización de una reparación;
- guardar el Parte.

Los registros muestran el estado `Pendiente`. Al volver Internet, la aplicación:

1. valida la sesión conservada de Firebase;
2. sube las fotografías;
3. guarda los documentos en Firestore;
4. elimina cada elemento de la cola local cuando termina correctamente.

Si Firebase solicita validar nuevamente la sesión, se debe ingresar una vez con correo y contraseña estando conectado. Los registros locales no se eliminan.

## Prueba offline recomendada

1. Ingresar online y configurar el PIN.
2. Presionar `Bloquear aplicación`.
3. Activar modo avión.
4. Volver a abrir la app.
5. Ingresar con el PIN.
6. Crear un descanso o Parte de prueba.
7. Confirmar que aparece como pendiente.
8. Desactivar modo avión y mantener la app abierta.
9. Confirmar que el indicador cambia a `Todo sincronizado`.

## Cuidados importantes

- No usar navegación privada o incógnito.
- No borrar los datos del sitio mientras existan registros pendientes.
- El primer uso de cada dispositivo requiere Internet.
- Crear usuarios nuevos requiere Internet.
- El PIN solo habilita el dispositivo en el que fue configurado.
- La contraseña de Firebase no se guarda en la base offline.
- El archivo `reset.html` limpia archivos en caché, pero conserva IndexedDB, el PIN y los registros pendientes.

## Firebase

Las reglas incluidas son las mismas que utiliza la versión 2.2 y contemplan:

- `users/{uid}/breaks/{breakId}`
- `users/{uid}/parts/{dateKey}`
- fotografías en `breaks/{uid}/...`
- fotografías en `parts/{uid}/...`

Si las reglas de la versión 2.2 ya fueron publicadas, no es necesario volver a cambiarlas. Si todavía no fueron publicadas, usar:

- `firestore.rules`
- `storage.rules`

## Diseño móvil

La interfaz se adapta a pantallas pequeñas con:

- una sola columna;
- botones al ancho disponible;
- menú inferior con área segura para iPhone;
- captura de foto y GPS a pantalla completa;
- tarjetas de Parte compactas;
- sin desplazamiento horizontal;
- barra de guardado visible al final del Parte.

Versión: `2.3.0`
