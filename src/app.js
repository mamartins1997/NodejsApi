'use strict';

const express = require('express');
const bodyparser = require('body-parser');
const moongose = require('mongoose');
const config = require('./config');

const app = express();
const router = express.Router();

//Conecta Mongo
moongose.connect(config.connectionString, { 
    useNewUrlParser: true , 
    useCreateIndex: true
});

//API Config
app.use(bodyparser.json({limit: '5mb'}));
app.use(bodyparser.urlencoded({extends : false}));

// Habilita o CORS
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

//Carrega as rotas
const indexRoute = require('./routes/index-route');
const productRoute = require('./routes/product-route');
const customerRoute = require('./routes/customer-route');
const orderRoute = require('./routes/order-route');
const accessRoute = require('./routes/access-route');

app.use('/',indexRoute);
app.use('/v1/products',productRoute);
app.use('/v1/customers',customerRoute);
app.use('/v1/orders',orderRoute);
app.use('/v1/access',accessRoute);

module.exports = app;