[![Build Status](https://travis-ci.org/webkrak/accounting-api.svg?branch=master)](https://travis-ci.org/webkrak/accounting-api)

## Accounting Application
RESTful API for accounting small companies implemented in NodeJS.

### Server:
  - express
  - mongodb

### Tests
  - mocha
  - superagent
  - expect.js

## API documentation
Available in path /apidoc

Signup accountant
POST /api/accountants/signup

Receive Access Token
POST /api/accountants/authenticate

Get accountant data
GET /api/accountants/profile

### Accountant area

Add customer
POST /api/accountant/customers

Get customer data
GET /api/accountant/customers/:id

Edit customer
PUT /api/accountant/customers/:id

Delete customer
DELETE /api/accountant/customers/:id
