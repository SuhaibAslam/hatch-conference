const fs = require('fs');
const http = require('http');
const os = require('os');
const path = require('path');

const repositoryRoot = path.resolve(__dirname, '..');
const siteRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'workshop-site-'));
const contentRoot = path.join(siteRoot, 'content');

fs.mkdirSync(contentRoot, { recursive: true });
for (const file of ['index.html', 'styles.css', 'app.js', 'content.generated.js']) {
  fs.copyFileSync(path.join(repositoryRoot, 'site', file), path.join(siteRoot, file));
}
for (const directory of ['workshop', 'skills', 'tool-setup', 'references']) {
  fs.cpSync(path.join(repositoryRoot, directory), path.join(contentRoot, directory), { recursive: true });
}
for (const file of ['README.md', 'AGENTS.md', 'LICENSE']) {
  fs.copyFileSync(path.join(repositoryRoot, file), path.join(contentRoot, file));
}

const routes = [
  '/',
  '/styles.css',
  '/app.js',
  '/content.generated.js',
  '/content/tool-setup/prompt--workshop-context.md',
  '/content/workshop/01-orient/prompt--thinking-partner.md',
  '/content/workshop/02-coordinate/prompt--thinking-partner.md',
  '/content/workshop/03-specify/prompt--thinking-partner.md',
  '/content/workshop/04-encode/00-start-here.md',
  '/content/workshop/04-encode/template--agent-skill.md',
  '/content/workshop/04-encode/prompt--draft-guidance.md',
  '/content/workshop/05-evaluate/00-start-here.md',
  '/content/workshop/05-evaluate/prompt--run-and-review.md',
  '/content/workshop/05-evaluate/comparison-desk.html',
  '/content/skills/create-and-improve-skills/SKILL.md',
  '/content/skills/run-skill-trial/SKILL.md'
];

function contentType(file) {
  if (file.endsWith('.html')) return 'text/html; charset=utf-8';
  if (file.endsWith('.css')) return 'text/css; charset=utf-8';
  if (file.endsWith('.js')) return 'text/javascript; charset=utf-8';
  if (file.endsWith('.md')) return 'text/markdown; charset=utf-8';
  return 'application/octet-stream';
}

const server = http.createServer((request, response) => {
  const requested = request.url === '/' ? '/index.html' : request.url.split('?')[0];
  const file = path.resolve(siteRoot, `.${requested}`);
  if (!file.startsWith(siteRoot) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) {
    response.writeHead(404);
    response.end('Not found');
    return;
  }
  response.writeHead(200, { 'Content-Type': contentType(file) });
  fs.createReadStream(file).pipe(response);
});

server.listen(0, '127.0.0.1', async () => {
  const port = server.address().port;
  try {
    for (const route of routes) {
      const response = await fetch(`http://127.0.0.1:${port}${route}`);
      if (!response.ok) throw new Error(`${route} returned ${response.status}`);
      const body = await response.text();
      if (!body.trim()) throw new Error(`${route} returned an empty body`);
    }
    console.log(`Served and verified ${routes.length} production routes from ${siteRoot}.`);
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  } finally {
    server.close();
  }
});
