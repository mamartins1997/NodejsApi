'use strict';

const express = require('express');
const router = express.Router();

//Controller Use
const controller = require('../controllers/customer-controller');

router.post('/create-customer',controller.createCustomer);

module.exports = router;