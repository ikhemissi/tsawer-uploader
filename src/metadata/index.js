'use strict';

const sharp = require('sharp');

function extract(buffer) {
  return sharp(buffer).metadata()
    .then(({ format, width, height, space }) => ({ format, width, height, space, size: buffer.length }));
}

module.exports = {
  extract,
};
