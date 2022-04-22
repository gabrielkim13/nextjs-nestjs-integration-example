const { createServer, get } = require('http');
const { parse } = require('url');

const next = require('next');

const hostname = 'localhost';
const port = +process.env.PORT || 3000;

const app = next({ 
    customServer: true, 
    dev: false, 
    dir: __dirname,
    hostname,
    port,
});

const handle = app.getRequestHandler();

app.prepare().then(() => {
  // noinspection JSCheckFunctionSignatures
  createServer((req, res) => handle(req, res, parse(req.url, true)))
    .listen(port, err => {
      if (err) throw err;

      console.log(`> Ready on http://${hostname}:${port}`);

      get(`http://${hostname}:${port}/api/health-check`);
    });
});
