'use strict';

const express = require('express');
const multer = require('multer');

const router = express.Router();
const multipartFormParser = multer({ storage: multer.memoryStorage() });

router.get('/', (req, res) => {
  res.send({ hello: 'tsawer' });
});

router.post('/', multipartFormParser.single('image'), (req, res) => {
  const file = req.file;

  res.type(file.mimetype).send(file.buffer);
});

module.exports = router;
