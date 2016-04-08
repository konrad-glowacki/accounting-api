'use strict';

require('../../test_helper');

const sinon = require('sinon');
const request = require('supertest');
const expect = require('expect.js');
const jwt = require('jsonwebtoken');

const app = require(__base + 'app');
const mailer = require(__base + '/lib/mailer');
const Customer = require(__base + 'models/customer');

const accountants = require('../../fixtures/accountants').accountants;
const customers = require('../../fixtures/customers').customers;

describe('Requests for customers', function () {

  describe('POST /api/accountant/customers', function () {
    it('Create customer with success', function (done) {
      const accountantId = accountants.taxminder._id.toString();
      const token = jwt.sign(accountantId, app.get('secretKey'));

      request(app)
        .post('/api/accountant/customers')
        .set('x-access-token', token)
        .send({
          name: 'Jan Kowalski', companyName: 'Jankowo', email: 'test@example.com', phone: '100200300',
          taxId: '945-212-168 1', settlementPeriod: 'quarterly', vatPayer: false, socialSecurityPayer: true,
          hasEmployees: false
        }).end(function (error, res) {
          expect(res.status).to.equal(200);
          expect(res.body._id).not.to.empty();
          expect(res.body.accountantId).to.equal(accountantId);
          expect(res.body.name).to.equal('Jan Kowalski');
          expect(res.body.companyName).to.equal('Jankowo');
          expect(res.body.email).to.equal('test@example.com');
          expect(res.body.phone).to.equal('100200300');
          expect(res.body.taxId).to.equal('9452121681');
          expect(res.body.settlementPeriod).to.equal('quarterly');
          expect(res.body.vatPayer).to.equal(false);
          expect(res.body.socialSecurityPayer).to.equal(true);
          expect(res.body.hasEmployees).to.equal(false);
          expect(res.body.createdAt).not.to.empty();
          done();
        });
    });

    it('Errors during create customer', function (done) {
      const token = jwt.sign(accountants.taxminder._id.toString(), app.get('secretKey'));

      request(app)
        .post('/api/accountant/customers')
        .set('x-access-token', token)
        .send({ companyName: 'Jankowo', email: 'test', phone: '100200300', settlementPeriod: 'error' })
        .end(function (error, res) {
          expect(res.status).to.equal(422);
          expect(res.body.errors.email).not.to.empty();
          expect(res.body.errors.name).not.to.empty();
          expect(res.body.errors.taxId).not.to.empty();
          expect(res.body.errors.settlementPeriod).not.to.empty();
          expect(res.body.errors.vatPayer).not.to.empty();
          expect(res.body.errors.socialSecurityPayer).not.to.empty();
          expect(res.body.errors.hasEmployees).not.to.empty();
          done();
        });
    });

    it('Unathorized access to create customer', function (done) {
      request(app)
        .post('/api/accountant/customers')
        .send({})
        .end(function (error, res) {
          expect(res.status).to.equal(403);
          done();
        });
    });
  });

  describe('GET /api/accountant/customers/:id', function () {
    const customer = customers.kowalski;

    it('Get customer data with success', function (done) {
      const accountantId = accountants.taxminder._id.toString();
      const token = jwt.sign(accountantId, app.get('secretKey'));

      request(app)
        .get('/api/accountant/customers/' + customer._id)
        .set('x-access-token', token)
        .end(function (error, res) {
          expect(res.status).to.equal(200);
          expect(res.body._id).to.equal(customer._id.toString());
          expect(res.body.accountantId).to.equal(accountantId);
          expect(res.body.name).to.equal(customer.name);
          expect(res.body.companyName).to.equal(customer.companyName);
          expect(res.body.email).to.equal(customer.email);
          expect(res.body.phone).to.equal(customer.phone);
          expect(res.body.taxId).to.equal(customer.taxId);
          expect(res.body.settlementPeriod).to.equal(customer.settlementPeriod);
          expect(res.body.vatPayer).to.equal(customer.vatPayer);
          expect(res.body.socialSecurityPayer).to.equal(customer.socialSecurityPayer);
          expect(res.body.hasEmployees).to.equal(customer.hasEmployees);
          done();
        });
    });

    it('Getting a customer for another accountant', function (done) {
      const accountantId = accountants.easytax._id.toString();
      const token = jwt.sign(accountantId, app.get('secretKey'));

      request(app)
        .get('/api/accountant/customers/' + customer._id)
        .set('x-access-token', token)
        .end(function (error, res) {
          expect(res.status).to.equal(200);
          expect(res.body).to.be(null);
          done();
        });
    });
  });

  describe('PUT /api/accountant/customers/:id', function () {
    const customer = customers.kowalski;

    it('Update customer with success', function (done) {
      const accountantId = accountants.taxminder._id.toString();
      const token = jwt.sign(accountantId, app.get('secretKey'));

      request(app)
        .put('/api/accountant/customers/' + customer._id)
        .set('x-access-token', token)
        .send({ companyName: 'Changed', email: 'changed@test.com', settlementPeriod: 'monthly' })
        .end(function (error, res) {
          expect(res.status).to.equal(204);
          expect(res.body).to.be.empty();

          Customer.findById(customer._id, function (err, updatedCustomer) {
            expect(updatedCustomer.companyName).to.equal('Changed');
            expect(updatedCustomer.email).to.equal('changed@test.com');
            expect(updatedCustomer.settlementPeriod).to.equal('monthly');
            done();
          });
        });
    });

    it('Unathorized access to update customer', function (done) {
      request(app)
        .put('/api/accountant/customers/' + customer._id)
        .set('x-access-token', 'fake-token')
        .send({ companyName: 'Changed' })
        .end(function (err, res) {
          expect(res.status).to.equal(403);
          done();
        });
    });
  });

  describe('PUT /api/accountant/customers/:id/invitation', function () {
    const customer = customers.kowalski;

    before(function (done) {
      sinon
        .stub(mailer, 'accountantInvitation')
        .yields(null, '250 Message accepted');

      done();
    });

    it('Sent invitation email to customer with success', function (done) {
      const accountantId = accountants.taxminder._id.toString();
      const token = jwt.sign(accountantId, app.get('secretKey'));

      request(app)
        .put('/api/accountant/customers/' + customer._id + '/invitation')
        .set('x-access-token', token)
        .end(function (error, res) {
          expect(res.status).to.equal(204);
          expect(res.body).to.be.empty();
          done();
        });
    });
  });

  describe('DELETE /api/accountant/customers/:id', function () {
    const customer = customers.kowalski;

    it('Delete customer with success', function (done) {
      const accountantId = accountants.taxminder._id.toString();
      const token = jwt.sign(accountantId, app.get('secretKey'));

      request(app)
        .delete('/api/accountant/customers/' + customer._id)
        .set('x-access-token', token)
        .end(function (error, res) {
          expect(res.status).to.equal(204);
          expect(res.body).to.be.empty();

          Customer.findById(customer._id, function (err, deletedCustomer) {
            expect(deletedCustomer).to.be(null);
            done();
          });
        });
    });

    it('Unathorized access to update customer', function (done) {
      request(app)
        .delete('/api/accountant/customers/' + customer._id)
        .set('x-access-token', 'fake-token')
        .end(function (err, res) {
          expect(res.status).to.equal(403);
          done();
        });
    });
  });

});
