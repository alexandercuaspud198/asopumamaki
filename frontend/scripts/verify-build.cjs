const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const { homepage } = require("../package.json");

const build = path.resolve(__dirname, "../build");
const base = `${new URL(homepage).pathname.replace(/\/$/, "")}/`;
const html = fs.readFileSync(path.join(build, "index.html"), "utf8");
const manifest = JSON.parse(fs.readFileSync(path.join(build, "asset-manifest.json"), "utf8"));
const files = new Set(fs.readdirSync(build, { recursive: true }).map(file => file.replaceAll("\\", "/")));

function verifyAsset(url) {
  assert.ok(url.startsWith(base), `Recurso fuera de ${base}: ${url}`);
  const relativePath = decodeURIComponent(url.slice(base.length));
  assert.ok(files.has(relativePath), `Falta el recurso (revisar mayúsculas): ${relativePath}`);
  assert.ok(fs.statSync(path.join(build, relativePath)).isFile(), `No es un archivo: ${relativePath}`);
}

const scripts = [...html.matchAll(/<script\b[^>]*\bsrc="([^"]+)"/g)];
const styles = [...html.matchAll(/<link\b[^>]*\bhref="([^"]+\.css)"/g)];
assert.ok(scripts.length > 0, "index.html no contiene el bundle React");
assert.ok(styles.length > 0, "index.html no contiene los estilos compilados");
for (const [, url] of [...scripts, ...styles]) verifyAsset(url);
for (const url of Object.values(manifest.files)) verifyAsset(url);

// Check public images referenced by the gallery and home, including filename case.
const pages = ['GalleryPage.jsx', 'Home.jsx'].map(page => fs.readFileSync(path.resolve(__dirname, '../src/pages', page), 'utf8')).join('\n');
const images = [...pages.matchAll(/\$\{process\.env\.PUBLIC_URL\}\/([^`]+)`/g)];
assert.ok(images.length > 0, "No se encontraron las imágenes locales de la página");
for (const [, image] of images) verifyAsset(`${base}${image}`);
const timeline = require('../src/data/historyTimeline.json');
for (const event of timeline.events) {
  assert.ok(event.image && event.imageAlt, `Falta la foto o su descripción: ${event.id}`);
  verifyAsset(`${base}${event.image}`);
}
const variants = require('../src/data/imageVariants.json');
for (const image of [...images.map(([, source]) => source), ...timeline.events.map(event => event.image)]) {
  assert.ok(variants[image]?.length, `Faltan versiones optimizadas de ${image}`);
}
for (const [original, versions] of Object.entries(variants)) {
  verifyAsset(`${base}${original}`);
  let previousWidth = 0;
  for (const version of versions) {
    verifyAsset(`${base}${version.src}`);
    assert.ok(version.width > previousWidth && version.height > 0, `Dimensiones incorrectas: ${version.src}`);
    const bytes = fs.readFileSync(path.join(build, version.src));
    assert.equal(bytes.toString('ascii', 0, 4), 'RIFF', `WebP incorrecto: ${version.src}`);
    assert.equal(bytes.toString('ascii', 8, 12), 'WEBP', `WebP incorrecto: ${version.src}`);
    previousWidth = version.width;
  }
}
const layout = fs.readFileSync(path.resolve(__dirname, '../src/components/SiteLayout.jsx'), 'utf8');
const logos = [...layout.matchAll(/\$\{process\.env\.PUBLIC_URL\}\/([^`]+)`/g)];
assert.equal(logos.length, 2, 'Comprobar los logos locales del menú y el pie de página');
for (const [, logo] of logos) verifyAsset(`${base}${logo}`);
assert.ok(html.includes('lang="es"'), "Falta el idioma español del documento");
for (const route of require('../src/siteRoutes.json')) {
  const entry = path.join(build, route.path, 'index.html');
  assert.equal(fs.readFileSync(entry, 'utf8'), html, `Entrada incorrecta para ${route.path}`);
}
assert.equal(fs.readFileSync(path.join(build, '404.html'), 'utf8'), html);
console.log(`Build verificado: ${base}, ${Object.keys(manifest.files).length} recursos compilados, ${Object.keys(variants).length} fotografías optimizadas, ${timeline.events.length} fotos en la línea del tiempo y 2 logos locales.`);
