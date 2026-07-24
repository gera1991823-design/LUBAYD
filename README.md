# APP LUBAYD V2.2 — Parte y reparación

## Archivos para reemplazar en GitHub

Reemplazar en la raíz del repositorio:

- `index.html`
- `app.js`
- `styles.css`
- `service-worker.js`
- `manifest.webmanifest`

No reemplazar los archivos de logo e iconos existentes.

## Reglas obligatorias de Firebase

La sección Parte guarda documentos en:

`users/{uid}/parts/{AAAA-MM-DD}`

Las fotografías se guardan en:

`parts/{uid}/{AAAA-MM-DD}/{etapa}-{timestamp}.jpg`

Por eso es obligatorio publicar también:

- `firestore.rules` en Firebase > Firestore > Reglas.
- `storage.rules` en Firebase > Storage > Reglas.

Sin esas reglas, Firebase mostrará `permission-denied` o `storage/unauthorized`.

## Funciones incluidas

- Horómetro inicial: valor, foto y GPS.
- Horómetro descanso: valor, foto y GPS.
- Horómetro post descanso: valor, foto y GPS.
- Horómetro final: valor, foto y GPS.
- Cantidad de Trozo.
- Cantidad de Pulpa.
- Reparación opcional.
- Inicio de reparación: motivo, foto y GPS.
- Finalización de reparación: detalle, foto y GPS.
- Observaciones generales.
- Guardado del parte diario en Firestore.
- Diseño responsive para computadora y celular.

## Después de subir los archivos

1. Hacer Commit en GitHub.
2. Esperar la publicación de GitHub Pages.
3. Abrir `https://gera1991823-design.github.io/LUBAYD/reset.html`.
4. Limpiar la caché y volver a iniciar sesión.
5. Verificar que aparezca `Versión 2.2.0`.
