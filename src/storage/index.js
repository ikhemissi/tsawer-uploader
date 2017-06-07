'use strict';

const config = require('config');
const Bucket = require('./Bucket');

const bucket = new Bucket({
  name: config.storage.bucketName,
  region: config.storage.bucketRegion,
  endpoint: config.storage.endpoint,
  port: config.storage.port,
  accessKey: config.storage.accessKey,
  secretKey: config.storage.secretKey,
});

module.exports = bucket;
