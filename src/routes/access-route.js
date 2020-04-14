'use strict';

const express = require('express');
const router = express.Router();
const authService = require('../services/auth-service');
//Controller Use
const controller = require('../controllers/access-controller');

router.post('/authenticate',controller.authCustomer);
router.get('/refresh-token',authService.authorize,controller.refreshToken);

module.exports = router;