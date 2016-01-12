var request = require('superagent');
var expect = require('expect.js');

describe('Requests for accountant', function(){
  describe('POST /api/accountants', function() {
    it('Create accountant with success', function(done) {
      request
      .post('/api/accountants')
      .send({ email: 'test@example.com', password: 'test123' })
      .end(function(error, res) {
        expect(error).to.eql(null);
      });
    });
  });
});
