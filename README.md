# Asociación Pumamaki

Sitio institucional de la Asociación Pumamaki, organización indígena del Resguardo de Muellamues dedicada al cuidado del territorio, las semillas propias y los conocimientos ancestrales.

**Dirección de publicación:** [alexandercuaspud198.github.io/asopumamaki](https://alexandercuaspud198.github.io/asopumamaki/).

## Estructura

- [frontend](frontend/README.md): aplicación React, estilos Tailwind y recursos públicos; se compila en `frontend/build`.
- [backend](backend/): servicio FastAPI/MongoDB independiente. GitHub Pages no lo ejecuta y la página actual no lo consume.
- [.github/workflows/deploy.yml](.github/workflows/deploy.yml): instalación, compilación, verificación y publicación del frontend.

## Desarrollo local

Requiere Node.js **24.x** y npm **11.x**; el gestor declarado es `npm@11.6.2`.

```powershell
cd frontend
npm ci
npm start
```

Para comprobar la versión que se publicará:

```powershell
npm run build
npm run verify:build
npm run preview
```

Abrir [la vista previa local](http://127.0.0.1:4173/asopumamaki/). Los scripts, rutas y consideraciones técnicas están en la [guía del frontend](frontend/README.md).

## Publicación en GitHub Pages

El workflow verifica los pull requests dirigidos a `main` y los cambios de `main`. Solo publica desde `main`, después de compilar y verificar correctamente. Usa `npm ci`, `CI=true`, el artefacto `frontend/build` y el entorno `github-pages`, con permisos de Pages y autenticación OIDC. También admite ejecución manual desde Actions.

En **Settings → Pages → Build and deployment → Source** debe permanecer **GitHub Actions**. No se necesita una rama `gh-pages` ni subir el directorio `build` al repositorio.

La validación local del **7 de septiembre de 2026** completó `npm install`, una instalación reproducible con `npm ci`, la compilación con `CI=true` y `npm run verify:build` (5 recursos compilados y 8 fotografías locales). También se revisó la configuración del workflow. Comprobar cada publicación en GitHub Actions y en la dirección pública del sitio.

Para publicar, una persona con permisos de escritura debe iniciar sesión con su cuenta autorizada. Desde la raíz del repositorio:

```powershell
gh auth login --hostname github.com
gh auth status
gh api repos/alexandercuaspud198/asopumamaki --jq .permissions
git status
git add README.md .github/workflows/deploy.yml
git add frontend/README.md frontend/package.json frontend/package-lock.json frontend/.npmrc frontend/public/index.html
git add frontend/scripts/verify-build.cjs frontend/scripts/preview.cjs frontend/src/pages/Home.jsx frontend/src/components/Gallery.jsx frontend/src/components/ProductCatalog.jsx
git diff --cached
git commit -m "Configura despliegue de Pumamaki en GitHub Pages"
git push origin main
```

Si `main` está protegida, crear una rama `codex/github-pages` antes del commit, subir esa rama y abrir un pull request. La publicación se ejecutará al integrar los cambios en `main`. Revisar el resultado en **Actions → Publicar Pumamaki en GitHub Pages** y abrir la dirección del sitio cuando el trabajo de publicación termine correctamente.

## Continuidad del proyecto

La historia institucional está en [Home.jsx](frontend/src/pages/Home.jsx), junto con la navegación por secciones. La galería usa fotografías del repositorio. El catálogo contiene datos de referencia: confirmar productos, precios y disponibilidad; sus fotografías siguen pendientes. El logo de Emergent y la imagen principal de Unsplash aún dependen de servicios externos.

Queda pendiente modernizar las dependencias antiguas de CRA y resolver la compatibilidad del calendario antes de utilizarlo. La [guía técnica](frontend/README.md) documenta el estado de seguridad, las rutas y las verificaciones disponibles.
