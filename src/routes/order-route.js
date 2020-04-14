'use strict';

const express = require('express');
const router = express.Router();
//Auth use
const auth = require('../services/auth-service');
//Controller Use
const controller = require('../controllers/order-controller');

router.post('/create-order',auth.authorize,controller.createOrder);
router.get('/get-all',auth.authorize,controller.getAll)

module.exports = router;