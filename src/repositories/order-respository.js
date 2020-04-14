'use strict';
const Order = require('../models/orderModel');

exports.create = async (order) => {
    var data = new Order(order);
    await data.save();
    return data._id;
}

exports.getAll = async () => {
    var data = await Order.find({})
        .populate('customer', 'name email roles')
        .populate('items.product', 'title price');
    return data;
}

exports.getById = async (id) => {
    var data = await Order.findById(id)
        .populate('customer', 'name email roles')
        .populate('items.product', 'title price');;
    return data;
}