const app = require('../app');
const request = require('supertest').agent(app.listen());
const should = require('should');

describe('404', function () {
  
  describe('when GET /unknown', function () {
    it('should return the 404 page', function (done) {
      request
        .get('/unknown')
        .expect(404)
        .expect(/Page Not Found/, done);
    })
  });

  describe('when GET /showroom', function () {
    it('should return the 200 ok', function (done) {
      request
        .get('/showroom')
        .expect(200)
        .end((err, res) => {
          should.not.exist(err);
          done();
        })
    })
  });

  describe('when GET /', function () {
    it('should return the 200 ok', function (done) {
      request
        .get('/')
        .expect(200)
        .end((err, res) => {
          should.not.exist(err);
          done();
        })
    })
  });

  describe('when POST /upload', function () {
    it('should return the 500', function (done) {
      request
        .post('/upload')
        .attach('file', './test/t.txt')
        .end(function(err, res) {
          res.body.error.should.equal('Updloaded file should be .csv');
          done();
        });
    })
  });

  describe('when POST /upload', function () {
    it('should upload file to upload dir', function (done) {
      request
        .post('/upload')
        .attach('file', './test/f.csv')
        .end(function(err, res) {
          res.body.message.should.equal('File has been successfully uploaded. Check /showroom url');
          done();
        });
    })
  });
  
});
