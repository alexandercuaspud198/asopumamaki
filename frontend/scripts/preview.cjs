const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");
const { homepage } = require("../package.json");

const build = path.resolve(__dirname, "../build");
const base = new URL(homepage).pathname.replace(/\/$/, "");
const port = Number(process.env.PORT || 4173);
const types = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
};

if (!fs.existsSync(path.join(build, "index.html"))) {
  console.error("Primero ejecuta npm run build.");
  process.exit(1);
}

http.createServer((req, res) => {
  let pathname;
  try {
    pathname = decodeURIComponent(new URL(req.url, "http://localhost").pathname);
  } catch {
    res.writeHead(400).end("Solicitud inválida");
    return;
  }
  if (pathname === "/" || pathname === base) {
    res.writeHead(302, { Location: `${base}/` }).end();
    return;
  }
  let file = path.resolve(build, pathname.slice(base.length + 1) || "index.html");
  if (pathname.startsWith(`${base}/`) && file.startsWith(`${build}${path.sep}`) &&
      fs.existsSync(file) && fs.statSync(file).isDirectory()) {
    if (!pathname.endsWith('/')) {
      res.writeHead(301, { Location: `${pathname}/` }).end();
      return;
    }
    file = path.join(file, 'index.html');
  }
  if (!pathname.startsWith(`${base}/`) || !file.startsWith(`${build}${path.sep}`) ||
      !fs.existsSync(file) || !fs.statSync(file).isFile()) {
    res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
    fs.createReadStream(path.join(build, '404.html')).pipe(res);
    return;
  }
  res.writeHead(200, { "Content-Type": types[path.extname(file).toLowerCase()] || "application/octet-stream" });
  if (req.method === "HEAD") res.end();
  else fs.createReadStream(file).pipe(res);
}).listen(port, "127.0.0.1", () => {
  console.log(`Vista previa: http://127.0.0.1:${port}${base}/`);
});
