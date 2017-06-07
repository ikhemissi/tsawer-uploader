'use strict';

module.exports = {
  environment: 'default',
  server: {
    port: 9999,
  },
  storage: {
    endpoint: '127.0.0.1',
    port: 9000,
    proxy: null,
    accessKey: 'CTFJGS8LLXJ064ASN71F',
    secretKey: '+54NcHwGof1UPMksTmVL3nOOUjMwyC+Pb6hL3HmK',
    bucketName: 'images',
    bucketRegion: 'us-east-1',
  },
  database: {
    host: '127.0.0.1',
    port: 15984,
    protocol: 'http',
    username: 'root',
    password: 'dbi4eieh',
    name: 'images',
  },
};
