var request = require('superagent');
var expect = require('expect.js');
var helper = require('../helper');
var Accountant = require('../../models/accountant');

describe('Requests for accountant', function(){
  describe('POST /api/accountants', function() {
    it('Create accountant with success', function(done) {
      request.post(helper.apiServer + '/api/accountants')
        .send({ email: 'test@example.com', password: 'test123' })
        .end(function(error, res) {
          expect(res.status).to.equal(201);
          expect(res.body.token).not.to.be.empty();
          expect(error).to.eql(null);
          done();
        });
    });
  });

  afterEach(function(done) {
    Accountant.collection.drop();
    done();
  });
});
