import express from 'express';
import os from 'os';

const app = express();

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.json({
    message: 'Hello from basic Node server (ESM)',
    hostname: os.hostname(),
    pid: process.pid,
  });
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok', uptime: process.uptime() });
});

app.get('/env', (req, res) => {
  res.json({ env: process.env.NODE_ENV || 'development' });
});

let server;
export function start(port = PORT) {
  return new Promise((resolve) => {
    server = app.listen(port, () => {
      // eslint-disable-next-line no-console
      console.log(`Server listening on port ${port}`);
      resolve(server);
    });
  });
}

export function stop() {
  return new Promise((resolve) => {
    if (!server) return resolve();
    server.close(() => resolve());
  });
}

if (process.argv[1] && process.argv[1].endsWith('index.mjs')) {
  // started directly
  start();
}

export default app;
