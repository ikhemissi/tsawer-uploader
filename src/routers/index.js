'use strict';

const express = require('express');
const multer = require('multer');
const images = require('../images');

const router = express.Router();
const multipartFormParser = multer({ storage: multer.memoryStorage() });

router.post('/', multipartFormParser.single('image'), (req, res) => {
  const { buffer, mimetype, originalname } = req.file;
  const { imageId } = req.body;

  images.add({ buffer, mimetype, originalname, imageId })
    .then(details => res.send(details))
    .catch(err => res.status(500).send(err.message));
});

module.exports = router;
