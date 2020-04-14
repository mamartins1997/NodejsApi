'use strict';

const ValidationContract = require('../validators/validations');
const repository = require('../repositories/product-repository');

exports.getById = async (req, res, next) => {
    try {
        var data = await repository.getById(req.params.id);

        res.status(200).send(data);
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.getByTag = async (req, res, next) => {
    try {
        var data = await repository.getByTag(req.params.tag);

        res.status(200).send(data);
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.getAll = async (req, res, next) => {
    try {
        var data = await repository.getAll();

        res.status(200).send(data);
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.createProduct = async (req, res, next) => {
    let contract = new ValidationContract();
    contract.hasMinLen(req.body.title, 3, 'O título deve conter pelo menos 3 caracteres');
    contract.hasMinLen(req.body.slug, 3, 'O slug deve conter pelo menos 3 caracteres');
    contract.hasMinLen(req.body.description, 3, 'a descrição deve conter pelo menos 3 caracteres');

    // Se os dados forem inválidos
    if (!contract.isValid()) {
        res.status(500).send(contract.errors()).end();
        return;
    }

    try {
        
        await repository.create(req.body);

        res.status(201).send({ message: 'Produto cadastrado com sucesso!' });
    
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.updateProduct = async (req, res, next) => {
    try {
        
        await repository.update(req.params.id, req.body);

        var data = await repository.getById(req.params.id);

        res.status(200).send({ message: 'Produto cadastrado com sucesso', data: data });
   
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.deleteProduct = async (req, res, next) => {
    try {
        await repository.delete(req.params.id);

        res.status(204).send();
    } catch (error) {
        res.status(500).send(error);
    }
};