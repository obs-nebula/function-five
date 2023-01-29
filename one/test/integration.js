'use strict';

const { start } = require('faas-js-runtime');
const request = require('supertest');

const func = require('..').handle;
const test = require('tape');

const errHandler = t => err => {
  t.error(err);
  t.end();
};

test('Integration: handles an HTTP POST', t => {
  start(func).then(server => {
    t.plan(2);
    request(server)
      .post('/')
      .send({ value: 0 })
      .expect(200)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        t.error(err, 'No error');
        t.deepEqual(res.body, { value: 1 });
        t.end();
        server.close();
      });
  }, errHandler(t));
});

test('Integration: responds with error code if not POST', t => {
  start(func).then(server => {
    t.plan(1);
    request(server)
      .put('/')
      .send({ value: 0 })
      .expect(200)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        t.deepEqual(res.body, { message: 'Route PUT:/ not found', error: 'Not Found', statusCode: 404 });
        t.end();
        server.close();
      });
  }, errHandler(t));
});
