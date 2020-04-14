const mongoose = require('mongoose');
const Product = require('../models/productModel');

exports.getById = async (id) => {
    const result = await Product.findById(id, 'title description price slug');
    return result;
};

exports.getByTag = async (tag) => {
    const result = await Product.find({
        active: true,
        tags: tag
    }, 'title description price slug');
    return result;
};

exports.getAll = async () => {
    const result = await Product.find({
        active: true
    }, 'title description price slug');
    return result;
}

exports.create = async (data) => {
    var product = new Product(data);
    await product.save();
}

exports.update = async (id, data) => {
    await Product
        .findByIdAndUpdate(id, {
            $set: {
                title: data.title,
                description: data.description,
                price: data.price,
                slug: data.slug
            }
        });
}

exports.delete = async (id) => {
    await Product
        .findOneAndRemove(id);
}