APP LUBAYD V2.1 - ROL OPERADOR

Reemplazar en GitHub:
- index.html
- app.js
- styles.css
- service-worker.js

Permisos del rol operator:
- Puede iniciar descanso.
- Puede finalizar descanso.
- Puede ver su actividad reciente.
- No puede abrir historial completo.
- No ve resumen, mapa, filtros ni botones de historial.

El rol se lee desde Firestore:
users/{uid}/role

Valor esperado:
operator
