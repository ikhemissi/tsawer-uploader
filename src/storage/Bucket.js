'use strict';

const minio = require('minio');
const promisify = require('es6-promisify');

class Bucket {

  constructor({ name, region, endpoint, port, accessKey, secretKey, proxy }) {
    this.name = name;
    this.proxy = proxy;
    this.endpoint = endpoint;
    this.port = port;
    this.isMinio = !!endpoint;

    this.client = new minio.Client({
      endPoint: this.isMinio ? endpoint : 's3.amazonaws.com',
      port,
      secure: false,
      accessKey,
      secretKey,
    });

    const bucketExists = promisify(this.client.bucketExists, this.client);
    const makeBucket = promisify(this.client.makeBucket, this.client);
    const setBucketPolicy = promisify(this.client.setBucketPolicy, this.client);

    this.init = bucketExists(name)
      .catch((err) => {
        if (err.code !== 'NoSuchBucket') {
          throw err;
        }

        return makeBucket(name, region)
          .then(() => setBucketPolicy(name, '*', minio.Policy.READONLY));
      });

    this._putObject = promisify(this.client.putObject, this.client);
  }

  upload(buffer, key, contentType) {
    return this.init
      .then(() => this._putObject(this.name, key, buffer, buffer.length, contentType))
      .then(() => {
        const host = this.proxy ? this.proxy : `${this.endpoint}:${this.port}`;

        return `http://${host}/${this.name}/${key}`;
      });
  }
}

module.exports = Bucket;
