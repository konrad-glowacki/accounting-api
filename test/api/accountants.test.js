var request = require('superagent');
var expect = require('expect.js');

describe('Requests for accountant', function(){
  describe('POST /api/accountants', function() {
    it('Create accountant with success', function(done) {
      request.post('http://localhost:5100/api/accountants')
      .send({ email: 'test@example.com', password: 'test123' })
      .end(function(error, res) {
        expect(error).to.eql(null);
        expect(res.status).to.equal(200);
        expect(res.body.token).not.to.be.empty();
        done();
      });
    });
  });
});
