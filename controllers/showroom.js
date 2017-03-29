const views = require('co-views');
const Promise = require('bluebird');
const sqlite3 = require('sqlite3').verbose();
const db = Promise.promisifyAll(new sqlite3.Database('repnuptest.db'));
const render = views('./views', {
  map: { html: 'swig' }
});

module.exports = function *() {
  let rows = [];
  try {
    rows = yield db.allAsync("SELECT * FROM users");
  } catch (e) {
    console.error(e)
  }

  this.body = yield render('showroom', {rows: rows});
};
