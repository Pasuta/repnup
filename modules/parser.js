const parse = require('csv-parse');
const fs = require('fs');
const _ = require('lodash');
const stream = require('stream');
const BatchStream = require('batch-stream');
const insertToDb = require('./db');

module.exports = function (filename) {

  const batch = new BatchStream({ size : 50 });

  filename = __dirname + '/../' + filename;

  const streams = {
    readStream: fs.createReadStream(filename),
    batch: batch,
    csvStream: parse({
      columns: true,
      from: 1
    }),
    insertStream: getInsertStream()
  };

  // error handling
  _.forEach(streams, stream => {
    stream.on('error', err => {
      console.log('parse streams error' , err);
      // close all streams on error
      _.forEach(streams, stream => stream.end());
    });
  });

  streams.readStream
    .pipe(streams.csvStream)
    .pipe(streams.batch)
    .pipe(streams.insertStream);

  function getInsertStream() {
    return new stream.Writable({
      objectMode: true,
      write: insertToDb
    });
  }
};
