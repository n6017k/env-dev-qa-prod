import test from 'node:test';
import assert from 'node:assert/strict';
import request from 'supertest';
import { start, stop } from '../index.mjs';
import app from '../index.mjs';

test('GET / returns greeting JSON', async () => {
  const srv = await start(0); // ephemeral port
  const address = srv.address();
  const port = address.port;

  const res = await request(app).get('/').expect(200);
  assert.equal(res.body.message.includes('Hello from basic Node server'), true);

  await stop();
});

test('GET /health returns OK', async () => {
  const srv = await start(0);
  const res = await request(app).get('/health').expect(200);
  assert.equal(res.body.status, 'ok');
  await stop();
});

test('GET /add returns sum of two numbers', async () => {
  const srv = await start(0);
  const res = await request(app).get('/add?a=5&b=7').expect(200);
  assert.equal(res.body.result, 12);
  await stop();
});

test('GET /add with invalid numbers returns 400', async () => {
  const srv = await start(0);
  const res = await request(app).get('/add?a=foo&b=7').expect(400);
  assert.equal(res.body.error, 'Invalid numbers');
  await stop();
});
