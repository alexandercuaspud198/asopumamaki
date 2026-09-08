const fs = require('node:fs');
const path = require('node:path');
const routes = require('../src/siteRoutes.json');
const build = path.resolve(__dirname, '../build');
// Pages serves a real index.html for each route, including direct visits/reloads.
for (const route of routes) {
  const directory = path.join(build, route.path);
  fs.mkdirSync(directory, { recursive: true });
  if (route.path !== '/') fs.copyFileSync(path.join(build, 'index.html'), path.join(directory, 'index.html'));
}
fs.copyFileSync(path.join(build, 'index.html'), path.join(build, '404.html'));
console.log(`Entradas HTML generadas para ${routes.length} páginas y página 404.`);
