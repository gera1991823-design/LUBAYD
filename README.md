# APP LUBAYD V3.1 - Concepto A

Esta version mantiene las funciones de la V3.0 y reemplaza la interfaz por el diseno Concepto A aprobado.

## Incluye

- Interfaz responsive para computadora y celular.
- Roles: operador, mecanico y administrador.
- Descanso con foto y GPS.
- Parte diario con horometros, produccion y trabajo offline.
- Parte de servicio con reloj, inicio/final, foto, GPS y motivo.
- Carga de combustible para mecanicos y administradores.
- Tanque principal, litros, maquina, operador, turno diurno/nocturno y foto.
- PIN offline, IndexedDB y sincronizacion posterior.
- Pantalla de carga al restaurar sesion para evitar el salto visual al login.

## Archivos para GitHub

Sube todos los archivos de esta carpeta a la raiz del repositorio.

## Firebase

Conserva la configuracion del proyecto `app-lubayd`. Publica `firestore.rules` y `storage.rules` si todavia no utilizas las reglas de la V3.0.

## Permisos

- `operator`: Inicio, Descanso, Parte y Actividad.
- `mechanic`: Inicio, Servicio, Combustible y Actividad.
- `admin`: acceso completo.

Si un usuario no ve Combustible, revisa en Firestore que su campo `role` sea `mechanic` o `admin`.

## Actualizacion

Despues del commit, abre `reset.html`, pulsa Actualizar y vuelve a iniciar la aplicacion. La limpieza conserva IndexedDB, el PIN y los trabajos pendientes.
