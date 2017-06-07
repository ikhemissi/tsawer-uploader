'use strict';

const shortid = require('shortid');
const mime = require('mime-types');
const metadata = require('../metadata');
const storage = require('../storage');
const database = require('../database');

function generateFilePath(filename, folder, mimetype) {
  const extension = mime.extension(mimetype);

  let fileDirectory = folder;
  if (!fileDirectory) {
    const [year, month, day, hour] = new Date().toISOString().split(/[:T-]/);

    fileDirectory = `${year}/${month}/${day}/${hour}`;
  }

  return `${fileDirectory}/${filename}.${extension}`;
}

function add({ buffer, mimetype, originalname, imageId, folder }) {
  const id = imageId || shortid.generate();
  const fullPath = generateFilePath(id, folder, mimetype);
  const metadataFetching = metadata.extract(buffer);
  const imageUpload = storage.upload(buffer, fullPath, mimetype);

  return Promise.all([metadataFetching, imageUpload])
    .then(([imageMetadata, url]) => Object.assign({}, imageMetadata, { id, url, originalname, mimetype, file: fullPath }))
    .then(details => database.insert(id, details)
      .then(() => details));
}

module.exports = {
  add,
};
