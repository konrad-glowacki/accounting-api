require('../test_helper');

var app = require('../../server/app');
var request = require('supertest');
var expect = require('expect.js');
var jwt = require('jsonwebtoken');
var fixtures = require('../fixtures/accountants');

describe('Requests for accountant', function() {

  describe('POST /api/accountants/signup', function() {
    it('Create accountant with success', function(done) {
      request(app)
        .post('/api/accountants/signup')
        .send({ email: 'test@example.com', password: 'test123' })
        .end(function(error, res) {
          expect(res.status).to.equal(201);
          done();
        });
    });

    it('Create accountant with errors', function(done) {
      request(app)
        .post('/api/accountants/signup')
        .send({ email: 'test', password: 'test123' })
        .end(function(error, res) {
          expect(res.status).to.equal(422);
          expect(res.body.errors.email).not.to.empty();
          done();
        });
    });
  });

  describe('POST /api/accountants/authenticate', function() {
    it('Login fake accountant with error', function(done) {
      request(app)
        .post('/api/accountants/authenticate')
        .send({ email: 'test2@example.com', password: 'test123' })
        .end(function(error, res) {
          expect(res.status).to.equal(200);
          expect(res.body.message).not.to.empty();
          done();
        });
    });

    it('Login accountant with success', function(done) {
      request(app)
        .post('/api/accountants/authenticate')
        .send({ email: 'test@example.com', password: 'test123' })
        .end(function(error, res) {
          expect(res.status).to.equal(200);
          expect(res.body.token).not.to.empty();
          done();
        });
    });
  });

  describe('GET /api/accountants/profile', function() {
    it('Return accountant data', function(done) {
      var token = jwt.sign(fixtures.accountants.taxminder._id.toString(), app.get('secret'));

      request(app)
        .get('/api/accountants/profile')
        .set('x-access-token', token)
        .end(function(error, res) {
          expect(res.status).to.equal(200);
          expect(res.body.name).to.equal(fixtures.accountants.taxminder.name);
          expect(res.body.email).to.equal(fixtures.accountants.taxminder.email);
          expect(res.body.createdAt).not.to.empty();
          expect(res.body.password).to.be(undefined);
          done();
        });
    });
  });

});
