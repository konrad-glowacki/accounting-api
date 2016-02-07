[![Build Status](https://travis-ci.org/webkrak/accounting-api.svg?branch=master)](https://travis-ci.org/webkrak/accounting-api)
[![Code Climate](https://codeclimate.com/github/webkrak/accounting-api/badges/gpa.svg)](https://codeclimate.com/github/webkrak/accounting-api)
[![Test Coverage](https://codeclimate.com/github/webkrak/accounting-api/badges/coverage.svg)](https://codeclimate.com/github/webkrak/accounting-api/coverage)
[![Issue Count](https://codeclimate.com/github/webkrak/accounting-api/badges/issue_count.svg)](https://codeclimate.com/github/webkrak/accounting-api)

## Accounting Application
RESTful API for accounting small companies implemented in NodeJS.

### Server:
  - express
  - mongodb
  - jade

### Tests
  - mocha
  - superagent
  - expect.js

## API documentation

Available in path /apidoc

Description | Request
--- | ---
Signup accountant | POST `/api/accountants/signup`
Receive Access Token | POST `/api/accountants/authenticate`
Get accountant data | GET `/api/accountants/profile`

### Accountant area

Description | Request
--- | ---
Add customer | POST `/api/accountant/customers`
Get customer data | GET `/api/accountant/customers/:id`
Edit customer | PUT `/api/accountant/customers/:id`
Delete customer | DELETE `/api/accountant/customers/:id`
Send invitation to customer | PUT `/api/accountant/customers/:id/invitation`
