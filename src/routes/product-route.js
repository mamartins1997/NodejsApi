'use strict';

const express = require('express');
const router = express.Router();
//Auth
const auth = require('../services/auth-service');
//Controller Use
const controller = require('../controllers/product-controller');

router.get('/get-by-id/:id',controller.getById)
router.get('/get-by-tag/:tag',controller.getByTag)
router.get('/get-all-products',controller.getAll)
router.post('/create-product', auth.isAdmin, controller.createProduct);
router.put('/update-product/:id',auth.isAdmin,controller.updateProduct);
router.delete('/delete-product/:id',auth.isAdmin,controller.deleteProduct);

module.exports = router;