'use strict';

const func = require('..').handle;
const test = require('tape');

const fixture = { log: { info: console.log } };

test('Unit: handles an HTTP POST', async t => {
  t.plan(1);
  const body = { value: 0 };
  // Invoke the function, which should complete without error.
  const result = await func({ ...fixture, method: 'POST', body }, body);
  t.deepEqual(result, { body });
  t.end();
});

test('Unit: responds with error code if not POST', async t => {
  t.plan(1);
  const result = await func(fixture);
  t.deepEqual(result, { statusCode: 405, statusMessage: 'Method not allowed' });
  t.end();
});
