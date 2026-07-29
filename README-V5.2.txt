APP LUBAYD V5.2.0 - REPORTES POR TURNO Y EXPERIENCIA MOVIL

CAMBIOS PRINCIPALES
1. Reportes sin indicadores ni graficos de Partes.
2. Se elimino la tarjeta Total descansos.
3. Nuevo grafico Combustible por turno: Diurno y Nocturno.
4. Nuevo filtro de turno en Reportes.
5. Los selectores de turno muestran solamente Diurno y Nocturno, sin horarios.
6. Nuevos iconos SVG profesionales para combustible, servicio, maquinas y turnos.
7. Nuevo indicador Turno predominante.
8. Interfaz movil optimizada para Reportes, Partes, Servicios y Descansos.
9. Tabla de servicios convertida en tarjetas legibles en pantallas pequenas.
10. Navegacion movil del administrador con acceso directo a Descanso, Parte, Servicio y Reportes.

ARCHIVOS A REEMPLAZAR
- index.html
- app.js
- styles.css
- service-worker.js
- manifest.webmanifest
- reset.html

NO ES NECESARIO MODIFICAR
- firestore.rules
- storage.rules
- offline-db.js
- sync-manager.js
- logo-original.png

ACTUALIZACION
1. Subir los seis archivos a la raiz del repositorio GitHub.
2. Confirmar los cambios.
3. Esperar la publicacion de GitHub Pages.
4. Abrir https://gera1991823-design.github.io/LUBAYD/reset.html
5. Presionar Actualizar y abrir aplicacion.
6. Verificar la version 5.2.0.

NOTA TECNICA
El grafico por turno utiliza el campo shift de las cargas de combustible. Los registros day se muestran como Diurno y los night como Nocturno.
