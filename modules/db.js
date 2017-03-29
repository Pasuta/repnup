const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('repnuptest.db');
const _ = require('lodash');

module.exports = function (chunk, encoding, cb) {
  db.serialize(function () {
    db.run("create table if not exists users (FirstName TEXT, LastName TEXT, Email TEXT)");
    const values = _.map(chunk, e => `('${e.FirstName}', '${e.LastName}', '${e.Email}')`).join(',');
    db.run(`INSERT INTO users (FirstName, LastName, Email) VALUES ${values}`);
    return cb();
  });
};
