# Frontend de Pumamaki

Aplicación institucional estática de una sola página. La historia y secciones principales se editan en [src/pages/Home.jsx](src/pages/Home.jsx); la galería y el catálogo están en [src/components](src/components/).

## Tecnología e instalación

El [package-lock.json](package-lock.json) fija React/React DOM **19.2.0**, React Router DOM **7.18.3**, CRACO **7.1.0**, `react-scripts` **5.0.1** y Tailwind **3.4.18**. Se conserva Create React App con personalizaciones mediante [craco.config.js](craco.config.js), incluido el alias `@` hacia `src`. Tailwind utiliza la configuración existente; no se reemplazó el sistema de build.

Usar Node.js **24.x** y npm **11.x** (`packageManager: npm@11.6.2`). Desde este directorio:

```powershell
npm ci
```

`npm ci` instala el árbol fijado en el lockfile. Usar `npm install` cuando se modifican dependencias y revisar conjuntamente `package.json` y `package-lock.json`.

[.npmrc](.npmrc) establece `legacy-peer-deps=true` para reproducir la instalación local y en CI. Conserva un conflicto preexistente: `react-day-picker` 8 declara compatibilidad con versiones anteriores de React y `date-fns`, mientras el proyecto usa React 19 y `date-fns` 4. El calendario no forma parte de la página actual. Esta opción permite instalar; no demuestra compatibilidad del calendario, que debe actualizarse y validarse antes de usarlo.

## Comandos

| Comando | Función |
| --- | --- |
| `npm start` | Servidor de desarrollo de CRACO. |
| `npm run build` | Compilación optimizada en `build/`. |
| `npm run verify:build` | Comprueba subruta, bundles, estilos, manifiesto, imágenes locales y atributo de idioma. |
| `npm run preview` | Sirve el build en `http://127.0.0.1:4173/asopumamaki/`. |
| `npm test` | Inicia el runner de CRA mediante CRACO; todavía no hay una suite de pruebas del frontend. |

Para reproducir la compilación de CI en PowerShell:

```powershell
npm ci
$env:CI = 'true'
npm run build
npm run verify:build
Remove-Item Env:CI
npm run preview
```

La vista previa utiliza un servidor estático sin fallback de rutas: un recurso inexistente devuelve 404. Comprobar portada, navegación por secciones, fotografías, ampliación de galería, filtros y diálogo de productos.

La validación local del **7 de septiembre de 2026** completó `npm install`, `npm ci`, `npm run build` con `CI=true` y `npm run verify:build`: 5 recursos compilados y 8 fotografías locales verificados. El YAML y la configuración de las acciones también se revisaron. Estos resultados verifican la preparación local; cada publicación debe comprobarse también en GitHub Actions y en el sitio público.

## Rutas y recursos

`homepage` ya estaba configurado como `https://alexandercuaspud198.github.io/asopumamaki`, y [src/App.js](src/App.js) ya utilizaba `BrowserRouter` con `basename="/asopumamaki"`. Se conservan ambos valores. Solo existe la ruta React `/`; los botones de navegación desplazan la página a secciones, sin crear rutas adicionales.

Las imágenes de [public/images](public/images/) usan `${process.env.PUBLIC_URL}/images/...` en JSX. Respetar las mayúsculas exactas de los nombres, como `paramo.JPG`, y evitar referencias absolutas como `/images/foto.jpg`, que omiten `/asopumamaki/`. Los imports de código y estilos se resuelven durante el build; no deben incluir la subruta del sitio.

No se añadió un `404.html` de redirección. Si se incorporan rutas como `/historia`, `basename` por sí solo no permitirá recargarlas directamente en GitHub Pages: deberá definirse y comprobarse una estrategia de enrutamiento compatible antes de publicarlas. Consultar la [documentación de despliegue de CRA](https://create-react-app.dev/docs/deployment/#notes-on-client-side-routing).

## CI/CD

El [workflow de Pages](../.github/workflows/deploy.yml) ejecuta `npm ci`, `npm run build` con `CI=true` y `npm run verify:build` desde `frontend`. Los pull requests verifican la compilación; los cambios de `main` publican `frontend/build` después de superarla. Los pasos de publicación usan el entorno `github-pages`, `pages: write` e `id-token: write`.

La configuración de Pages y los pasos de autenticación, commit y push están en el [README principal](../README.md#publicación-en-github-pages). Para subir cambios se requiere una cuenta con permiso de escritura. No versionar `node_modules/` ni `build/`.

Los plugins de [plugins](plugins/) para edición visual y comprobación de salud son opcionales y se activan expresamente mediante variables de entorno; no se necesitan para la publicación estática. El backend FastAPI/MongoDB no se publica en Pages ni es consumido por la página actual.

## Pendientes conocidos

- La actualización compatible mediante `npm audit fix`, sin `--force`, redujo los hallazgos de 63 a **33** el 7 de septiembre de 2026: 11 bajos, 8 moderados y 14 altos, sin críticos. Ejecutar `npm audit` para consultar el estado vigente y planificar la modernización de CRA y dependencias; la compilación correcta no elimina estos hallazgos.
- Validar el calendario y su compatibilidad antes de incorporarlo; no confundir `legacy-peer-deps` con una solución funcional del conflicto.
- Confirmar el contenido del catálogo y sustituir «Fotografía pendiente» por fotografías aprobadas. Los precios y productos actuales son referencias.
- El logo de Emergent y la imagen principal de Unsplash siguen siendo externos; la galería utiliza las ocho fotografías locales.
- Incorporar pruebas de comportamiento al añadir funcionalidades. El verificador de build comprueba archivos y rutas, pero no sustituye pruebas de interacción ni una comprobación del sitio publicado.
