'use strict';

const express = require('express');
const multer = require('multer');
const images = require('../images');
const database = require('../database');

const router = express.Router();
const multipartFormParser = multer({ storage: multer.memoryStorage() });

router.get('/:id', (req, res) => {
  database.fetch(req.params.id)
    .then(details => res.send(Object.assign(details, {
      _id: undefined,
      _rev: undefined,
    })))
    .catch(err => res.status(500).send(err.message));
});

router.post('/', multipartFormParser.single('image'), (req, res) => {
  const { buffer, mimetype, originalname } = req.file;
  const { imageId } = req.body;

  images.add({ buffer, mimetype, originalname, imageId })
    .then(details => res.send(details))
    .catch(err => res.status(500).send(err.message));
});

module.exports = router;
