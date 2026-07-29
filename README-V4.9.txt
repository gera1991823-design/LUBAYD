APP LUBAYD V4.9 - PARTES VISIBLES PARA ADMINISTRADOR

Archivos que se deben reemplazar:
- index.html
- app.js
- styles.css
- offline-db.js
- service-worker.js
- reset.html

Correcciones:
- El administrador tiene una pantalla propia en Parte para ver todos los Partes de todos los operadores.
- Lee operationalParts y también la ruta heredada users/{uid}/parts.
- Migra automáticamente Partes heredados a operationalParts cuando el administrador entra con Internet.
- Los Partes aparecen en tiempo real.
- El operador recibe confirmación explícita cuando Firebase verificó el documento.
- Se guarda una copia heredada sin bloquear la escritura canónica.
- Incluye filtros por operador, fecha, máquina y búsqueda.
- Muestra producción, horómetros, fotos y mapas.

No es necesario cambiar reglas si ya están publicadas las reglas V4.3 o posteriores.
