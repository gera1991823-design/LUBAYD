APP LUBAYD V5.1 - ADMINISTRADOR EN MODO CONSULTA

CAMBIOS
- El administrador ya no puede iniciar/finalizar descansos.
- El administrador ya no puede crear ni editar Partes.
- El administrador ya no puede iniciar/finalizar servicios.
- El administrador no ve las pantallas de carga de combustible ni Chat.
- El administrador dispone de cuatro secciones operativas de consulta:
  1. Partes
  2. Servicios
  3. Descansos
  4. Reportes
- Se conserva Usuarios para administrar cuentas y roles.

PARTES
- Filtros por fecha, operador, maquina y busqueda.
- Detalle de produccion, horometros, horas operadas, fotos y ubicaciones.
- El boton Ver detalle del reporte abre el Parte correspondiente.

SERVICIOS
- Filtros por fecha, operador, mecanico, maquina, estado y busqueda.
- Muestra motivo, trabajo realizado, inicio, finalizacion, duracion, fotos y mapas.

DESCANSOS
- Filtros por fecha, operador, estado y busqueda.
- Muestra inicio, finalizacion, duracion, foto inicial/final y ubicacion en mapa.

REPORTES
- Total de Partes y horas operadas.
- Partes por maquina y por operador.
- Tabla detallada de Partes.
- Conserva graficos de descansos, servicios y combustible.

ARCHIVOS PARA REEMPLAZAR
- index.html
- app.js
- styles.css
- service-worker.js
- manifest.webmanifest
- reset.html

No es necesario modificar firestore.rules ni storage.rules.

ACTUALIZACION
1. Reemplazar los seis archivos en la raiz del repositorio GitHub.
2. Hacer Commit changes.
3. Esperar la publicacion de GitHub Pages.
4. Abrir https://gera1991823-design.github.io/LUBAYD/reset.html
5. Presionar Actualizar y abrir aplicacion.
6. Ingresar con Internet como administrador.
7. Confirmar que la version visible sea 5.1.0.
