var request = require('superagent');
var expect = require('expect.js');

var host = 'http://localhost:6100';

describe('Requests for accountant', function(){
  describe('POST /api/accountants', function() {
    it('Create accountant with success', function(done) {
      request.post(host + '/api/accountants')
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
