'use strict';
const mongoose = require('mongoose');
const Custumer = require('../models/customerModel');

exports.create = async (customer) => {
    var data = new Custumer(customer);
    await data.save();
}

exports.authenticate = async(data) => {
    const result = await Custumer.findOne({
        email: data.email,
        password: data.password
    });
    return result;
}

exports.getById = async(id) =>{
    const result = await Custumer.findById(id);
    return result;
}