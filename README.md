# APP LUBAYD V3.5

Versión completa con diseño responsive, roles y sincronización offline corregida.

## Qué corrige esta versión

- Mantiene la pantalla de carga hasta restaurar la sesión; evita mostrar el login durante un instante al recargar.
- Cuando el usuario entra con PIN offline y vuelve Internet, intenta recuperar automáticamente la sesión de Firebase y sincronizar.
- Si Firebase no estaba cargado porque la app abrió sin Internet, vuelve a inicializarlo al recuperar la conexión.
- Las fotos se comprimen antes de guardarse para reducir tiempos de subida y uso de almacenamiento.
- La cola de sincronización conserva los errores y reintenta los pendientes.
- Indicador visible de conexión, pendientes y sincronización en computadora y celular.
- El mecánico no tiene acceso a Descanso ni al Parte del operador.
- Combustible queda visible únicamente para Mecánico y Administrador.

## Roles

### operator
- Inicio
- Descanso
- Parte diario y horómetros
- Actividad reciente propia

### mechanic
- Inicio
- Parte de servicio
- Reloj de servicio
- Carga de combustible
- Actividad propia
- No ve Descanso

### admin
- Acceso a todas las secciones
- Usuarios y asignación de roles
- Configuración del tanque principal

## Instalación en GitHub

Subí todos los archivos de esta carpeta a la raíz del repositorio y reemplazá la versión anterior.

Después abrí:

`https://gera1991823-design.github.io/LUBAYD/reset.html`

Presioná **Actualizar y abrir aplicación**. El proceso borra la caché de la interfaz, pero conserva IndexedDB, el PIN offline y los registros pendientes.

## Firebase obligatorio

Publicá los contenidos de:

- `firestore.rules` en Firebase > Firestore > Reglas.
- `storage.rules` en Firebase > Storage > Reglas.

Si usás Firebase CLI, el archivo `firebase.json` ya está incluido.

## Configurar el tanque

Antes de que un mecánico sincronice cargas de combustible, un administrador debe ingresar en **Combustible > Actualizar tanque** y definir:

- Capacidad total.
- Litros disponibles.

## Asignar rol mecánico

Un administrador puede hacerlo desde **Usuarios** dentro de la app. También puede editarse en Firestore:

`users/{UID}/role = "mechanic"`

## Acceso offline

El primer ingreso en cada dispositivo requiere Internet. Después de configurar el PIN de seis números, el usuario puede abrir la app sin conexión. Si cerró completamente la sesión de Firebase o borró los datos del navegador, deberá validar otra vez por Internet antes de sincronizar.
