const parse = require('co-busboy');
const fs = require('fs');
const os = require('os');
const path = require('path');
const parser = require('../modules/parser');

module.exports = function *() {

  if ('POST' != this.method) return yield next;

  const parts = parse(this);
  let file;
  let part;

  while (part = yield parts) {

    if (part.mimeType != 'text/csv') {
      this.status = 500;
      this.type = 'json';
      this.body = {error: 'Updloaded file should be .csv'};
      return;
    }
    
    file = path.join('uploaded', getRandomInt(1000, 9999).toString() + part.filename);
    const stream = fs.createWriteStream(file);
    part.pipe(stream);
    // console.log('uploading %s -> %s', part.filename, stream.path);
  }

  parser(file);

  this.status = 200;
  this.type = 'json';
  this.body = {message: 'File has been successfully uploaded. Check /showroom url'};
};

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
