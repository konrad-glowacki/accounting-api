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

### API documentation
Available in path /apidoc

Signup accountant
POST /api/accountants/signup

Receive Access Token
POST /api/accountants/authenticate

Get accountant data
GET /api/accountants/profile

Add customer
POST /api/customers

Edit customer
PUT /api/customers/:id

Delete customer
DELETE /api/customers/:id
