'use strict';

const config = require('config');
const express = require('express');
const compression = require('compression');

const app = express();

app
  .disable('x-powered-by')
  .disable('etag')
  .use(compression());

app
  .use('/images', require('./routers/index'));

app.listen(config.server.port, (err) => {
  if (err) {
    console.error('Server failed to start', err);
  } else {
    console.info('Server started', {
      environment: config.environment,
      port: config.server.port,
    });
  }
});

process.on('SIGINT', () => {
  process.exit(2);
});

module.exports = app;
