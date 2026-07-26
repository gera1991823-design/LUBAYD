# APP LUBAYD V3.0

Version con permisos por rol, servicio mecanico, carga de combustible y funcionamiento offline.

## Cambios principales

### Recarga sin parpadeo de inicio de sesion

La aplicacion muestra una pantalla de carga mientras Firebase restaura la sesion. No muestra primero el acceso y luego el panel del usuario.

### Roles

- `operator`: Inicio, Descanso, Parte y Actividad.
- `mechanic`: Inicio, Servicio, Combustible y Actividad.
- `admin`: acceso a todas las secciones y gestion de roles.

Los usuarios nuevos se crean como `operator`.

### Parte del operador

- Establecimiento.
- Maquina.
- Horometro inicial, descanso, post descanso y final.
- Foto y ubicacion obligatorias en cada horometro.
- Cantidades de Trozo y Pulpa.
- Guardado local y sincronizacion automatica.

### Servicio del mecanico

- Seleccion del parte, operador y maquina.
- Inicio de reparacion con motivo, foto y GPS.
- Reloj de servicio en tiempo real.
- Finalizacion con detalle, foto y GPS.
- El mecanico no modifica los horometros ni la produccion del operador.

### Combustible

- Acceso exclusivo para mecanicos y administradores.
- Tanque principal con capacidad y litros disponibles.
- Maquina, operador relacionado, litros y turno diurno/nocturno.
- Foto obligatoria.
- Descuento del tanque al sincronizar sin duplicar cargas.

### Sin conexion

- Acceso mediante PIN local de 6 numeros.
- Descansos, partes, servicios y cargas se guardan en IndexedDB.
- Las fotografias se almacenan como archivos Blob.
- Cuando vuelve Internet se suben primero las fotos y luego los datos.
- Un mecanico puede trabajar offline sobre partes que hayan sido descargados previamente en ese dispositivo.

## Archivos para reemplazar en GitHub

Subir todos los archivos de este paquete a la raiz del repositorio:

- `index.html`
- `styles.css`
- `app.js`
- `offline-db.js`
- `sync-manager.js`
- `service-worker.js`
- `manifest.webmanifest`
- `reset.html`
- `logo.svg`
- `icon-192.png`
- `icon-512.png`

Los archivos `firestore.rules` y `storage.rules` se publican en Firebase, no es necesario que GitHub Pages los utilice.

## Reglas obligatorias

1. Firebase > Firestore > Reglas.
2. Reemplazar todo por el contenido de `firestore.rules`.
3. Publicar.
4. Firebase > Storage > Reglas.
5. Reemplazar todo por el contenido de `storage.rules`.
6. Publicar.

## Crear el primer administrador

Por seguridad, los usuarios no pueden convertirse a si mismos en administradores.

1. Crear o iniciar sesion con el usuario elegido.
2. Firebase > Firestore > Datos > `users`.
3. Abrir el documento con el UID correspondiente.
4. Cambiar el campo `role` de `operator` a `admin`.
5. Cerrar y volver a ingresar en la aplicacion.

A partir de ese momento, el administrador puede entrar a **Usuarios** y asignar roles desde la app.

## Inicializar el tanque principal

El administrador debe entrar en **Combustible > Actualizar tanque** y cargar:

- capacidad total;
- litros disponibles iniciales.

Los mecanicos pueden registrar cargas y descontar litros, pero no pueden aumentar ni redefinir la capacidad.

## Actualizacion del navegador

Despues de subir los archivos, abrir:

`https://gera1991823-design.github.io/LUBAYD/reset.html`

Presionar **Actualizar y abrir aplicacion**. El proceso limpia la cache visual, pero conserva el PIN y los registros pendientes de IndexedDB.

## Restricciones offline

- El primer ingreso en cada dispositivo requiere Internet.
- Crear usuarios y cambiar permisos requiere Internet.
- Para seleccionar un parte estando offline, el mecanico debe haber abierto la app con Internet previamente para descargar la lista de partes del dia.
- Si se borran los datos del navegador, tambien se elimina el PIN y la cola local.
