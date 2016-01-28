require('../test_helper');

var app = require('../../server/app');
var request = require('supertest');
var expect = require('expect.js');
var jwt = require('jsonwebtoken');
var fixtures = require('../fixtures/accountants');

describe('Requests for customers', function() {

  describe('POST /api/customers', function() {
    it('Create customer with success', function(done) {
      var token = jwt.sign(fixtures.accountants.taxminder._id.toString(), app.get('secret'));

      request(app)
        .post('/api/customers')
        .set('x-access-token', token)
        .send({
          name: 'Jan Kowalski', companyName: 'Jankowo', email: 'test@example.com', phone: '100200300',
          taxId: '945-212-168 1'
        }).end(function(error, res) {
          expect(res.body.id).not.to.empty();
          expect(res.status).to.equal(200);
          expect(res.body.name).to.equal('Jan Kowalski');
          expect(res.body.companyName).to.equal('Jankowo');
          expect(res.body.email).to.equal('test@example.com');
          expect(res.body.phone).to.equal('100200300');
          expect(res.body.taxId).to.equal('9452121681');
          expect(res.body.createdAt).not.to.empty();
          done();
        });
    });

    it('Errors during create customer', function(done) {
      var token = jwt.sign(fixtures.accountants.taxminder._id.toString(), app.get('secret'));

      request(app)
        .post('/api/customers')
        .set('x-access-token', token)
        .send({ companyName: 'Jankowo', email: 'test', phone: '100200300' }).end(function(error, res) {
          expect(res.status).to.equal(422);
          expect(res.body.errors.email).not.to.empty();
          expect(res.body.errors.name).not.to.empty();
          expect(res.body.errors.taxId).not.to.empty();
          done();
        });
    });


    it('Unathorized acces to create customer', function(done) {
      request(app)
        .post('/api/customers')
        .send({})
        .end(function(error, res) {
          expect(res.status).to.equal(403);
          done();
        });
    });
  });

});
