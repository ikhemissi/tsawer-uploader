'use strict';

const config = require('config');
const NodeCouchdb = require('node-couchdb');

const couchdb = new NodeCouchdb({
  host: config.database.host,
  protocol: config.database.protocol,
  port: config.database.port,
  auth: {
    user: config.database.username,
    pass: config.database.password,
  },
});

couchdb.createDatabase(config.database.name)
  .then(() => console.log('Database created', config.database.name))
  .catch((err) => {
    if (err.code === 'EDBEXISTS') {
      return null;
    }

    console.error('Database creation error', err);
    return null;
  });

function insert(id, details) {
  return couchdb.insert(config.database.name, Object.assign({ _id: id }, details))
    .then(({ data }) => data);
}

function fetch(id) {
  return couchdb.get(config.database.name, id)
    .then(({ data }) => data);
}

module.exports = {
  insert,
  fetch,
};
