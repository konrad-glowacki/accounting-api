require('../test_helper');

var app = require('../../server/app');
var request = require('supertest');
var expect = require('expect.js');

describe('Requests for accountant', function() {

  describe('POST /api/accountants', function() {
    it('Create accountant with success', function(done) {
      request(app)
        .post('/api/accountants')
        .send({ email: 'test@example.com', password: 'test123' })
        .end(function(error, res) {
          expect(res.status).to.equal(201);
          expect(res.body.token).not.to.be.empty();
          expect(error).to.eql(null);
          done();
        });
    });
  });
});
