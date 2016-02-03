require('../test_helper');

var Customer = require('../../server/models/customer');
var accountants = require('../fixtures/accountants').accountants;
var customers = require('../fixtures/customers').customers;
var app = require('../../server/app');
var request = require('supertest');
var expect = require('expect.js');
var jwt = require('jsonwebtoken');

describe('Requests for customers', function() {

  describe('POST /api/customers', function() {
    it('Create customer with success', function(done) {
      var accountant_id = accountants.taxminder._id.toString();
      var token = jwt.sign(accountant_id, app.get('secret_key'));

      request(app)
        .post('/api/customers')
        .set('x-access-token', token)
        .send({
          name: 'Jan Kowalski', company_name: 'Jankowo', email: 'test@example.com', phone: '100200300',
          tax_id: '945-212-168 1', settlement_period: 'quarterly', vat_payer: false, social_security_payer: true,
          has_employees: false
        }).end(function(error, res) {
          expect(res.status).to.equal(200);
          expect(res.body._id).not.to.empty();
          expect(res.body.accountant_id).to.equal(accountant_id);
          expect(res.body.name).to.equal('Jan Kowalski');
          expect(res.body.company_name).to.equal('Jankowo');
          expect(res.body.email).to.equal('test@example.com');
          expect(res.body.phone).to.equal('100200300');
          expect(res.body.tax_id).to.equal('9452121681');
          expect(res.body.settlement_period).to.equal('quarterly');
          expect(res.body.vat_payer).to.equal(false);
          expect(res.body.social_security_payer).to.equal(true);
          expect(res.body.has_employees).to.equal(false);
          expect(res.body.created_at).not.to.empty();
          done();
        });
    });

    it('Errors during create customer', function(done) {
      var token = jwt.sign(accountants.taxminder._id.toString(), app.get('secret_key'));

      request(app)
        .post('/api/customers')
        .set('x-access-token', token)
        .send({ company_name: 'Jankowo', email: 'test', phone: '100200300', settlement_period: 'error' })
        .end(function(error, res) {
          expect(res.status).to.equal(422);
          expect(res.body.errors.email).not.to.empty();
          expect(res.body.errors.name).not.to.empty();
          expect(res.body.errors.tax_id).not.to.empty();
          expect(res.body.errors.settlement_period).not.to.empty();
          expect(res.body.errors.vat_payer).not.to.empty();
          expect(res.body.errors.social_security_payer).not.to.empty();
          expect(res.body.errors.has_employees).not.to.empty();
          done();
        });
    });

    it('Unathorized access to create customer', function(done) {
      request(app)
        .post('/api/customers')
        .send({})
        .end(function(error, res) {
          expect(res.status).to.equal(403);
          done();
        });
    });
  });

  describe('GET /api/customers/:id', function() {
    var customer = customers.kowalski;

    it('Get customer data with success', function(done) {
      var accountant_id = accountants.taxminder._id.toString();
      var token = jwt.sign(accountant_id, app.get('secret_key'));

      request(app)
        .get('/api/customers/' + customer._id)
        .set('x-access-token', token)
        .end(function(error, res) {
          expect(res.status).to.equal(200);
          expect(res.body._id).to.equal(customer._id.toString());
          expect(res.body.accountant_id).to.equal(accountant_id);
          expect(res.body.name).to.equal(customer.name);
          expect(res.body.company_name).to.equal(customer.company_name);
          expect(res.body.email).to.equal(customer.email);
          expect(res.body.phone).to.equal(customer.phone);
          expect(res.body.tax_id).to.equal(customer.tax_id);
          expect(res.body.settlement_period).to.equal(customer.settlement_period);
          expect(res.body.vat_payer).to.equal(customer.vat_payer);
          expect(res.body.social_security_payer).to.equal(customer.social_security_payer);
          expect(res.body.has_employees).to.equal(customer.has_employees);
          expect(res.body.created_at).not.to.empty();
          done();
        });
    });

    it('Getting a customer for another accountant', function(done) {
      var accountant_id = accountants.easytax._id.toString();
      var token = jwt.sign(accountant_id, app.get('secret_key'));

      request(app)
        .get('/api/customers/' + customer._id)
        .set('x-access-token', token)
        .end(function(error, res) {
          expect(res.status).to.equal(200);
          expect(res.body).to.be(null);
          done();
        });
    });
  });

  describe('PUT /api/customers/:id', function() {
    var customer = customers.kowalski;

    it('Update customer with success', function(done) {
      var accountant_id = accountants.taxminder._id.toString();
      var token = jwt.sign(accountant_id, app.get('secret_key'));

      request(app)
        .put('/api/customers/' + customer._id)
        .set('x-access-token', token)
        .send({ company_name: 'Changed', email: 'changed@test.com', settlement_period: 'monthly' })
        .end(function(error, res) {
          expect(res.status).to.equal(204);
          expect(res.body).to.be.empty();

          Customer.findById(customer._id, function(err, updated_customer) {
            expect(updated_customer.company_name).to.equal('Changed');
            expect(updated_customer.email).to.equal('changed@test.com');
            expect(updated_customer.settlement_period).to.equal('monthly');
            done();
          });
        });
    });

    it('Unathorized access to update customer', function(done) {
      request(app)
        .put('/api/customers/' + customer._id)
        .set('x-access-token', 'fake-token')
        .send({ company_name: 'Changed' })
        .end(function(err, res) {
          expect(res.status).to.equal(403);
          done();
        });
    });
  });

  describe('DELETE /api/customers/:id', function() {
    var customer = customers.kowalski;

    it('Delete customer with success', function(done) {
      var accountant_id = accountants.taxminder._id.toString();
      var token = jwt.sign(accountant_id, app.get('secret_key'));

      request(app)
        .delete('/api/customers/' + customer._id)
        .set('x-access-token', token)
        .end(function(error, res) {
          expect(res.status).to.equal(204);
          expect(res.body).to.be.empty();

          Customer.findById(customer._id, function(err, deleted_customer) {
            expect(deleted_customer).to.be(null);
            done();
          });
        });
    });

    it('Unathorized access to update customer', function(done) {
      request(app)
        .delete('/api/customers/' + customer._id)
        .set('x-access-token', 'fake-token')
        .end(function(err, res) {
          expect(res.status).to.equal(403);
          done();
        });
    });
  });

});
