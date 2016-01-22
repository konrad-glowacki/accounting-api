require('../test_helper');

var app = require('../../server/app');
var request = require('supertest');
var expect = require('expect.js');

describe('Requests for accountant', function() {

  describe('POST /api/accountants', function() {
    it('Create accountant with success', function(done) {
      request(app)
        .post('/api/accountants')
        .send({ name: 'Some Name', email: 'test@example.com', password: 'test123' })
        .end(function(error, res) {
          expect(res.status).to.equal(200);
          expect(res.body._id).not.to.empty();
          expect(res.body.name).to.equal('Some Name');
          expect(res.body.email).to.equal('test@example.com');
          expect(res.body.password).to.be(undefined);
          done();
        });
    });

    it('Create accountant with errors', function(done) {
      request(app)
        .post('/api/accountants')
        .send({ email: 'test', password: 'test123' })
        .end(function(error, res) {
          expect(res.status).to.equal(422);
          expect(res.body.errors.name).not.to.empty();
          expect(res.body.errors.email).not.to.empty();
          done();
        });
    });
  });

  describe('GET /api/accountants/:id', function() {
    it('Return accountant data', function(done) {
      request(app)
        .get('/api/accountants/4ed2b809d7446b9a0e000014')
        .end(function(error, res) {
          expect(res.status).to.equal(200);
          expect(res.body._id).to.equal('4ed2b809d7446b9a0e000014');
          expect(res.body.email).to.equal('hello@tax-minder.com');
          expect(res.body.createdAt).not.to.empty();
          expect(res.body.password).to.be(undefined);
          done();
        });
    });

    it('Return not found accountant', function(done) {
      request(app)
        .get('/api/accountants/1')
        .end(function(error, res) {
          expect(res.status).to.equal(404);
          done();
        });
    });
  });

});
