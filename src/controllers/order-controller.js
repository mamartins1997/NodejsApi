'use strict';

const ValidationContract = require('../validators/validations');
const repository = require('../repositories/order-respository');
const authService = require('../services/auth-service');
const guid = require('guid');

//Endpoints-Controllers
exports.createOrder = async (req, res, next) => {
    //Valida os campos
    let contract = new ValidationContract();
    contract.isRequired(req.body.items, 'Campo items é obrigatório!')

    // Se os dados forem inválidos
    if (!contract.isValid()) {
        res.status(400).send(contract.errors()).end();
        return;
    }

    try {
        //Recuperar Token
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        //Decodifica Token
        const data = authService.decodeToken(token);
        
        //Cria Order
        const id = await repository.create({
            customer: data.id,
            number: guid.raw().substring(0, 6),
            items: req.body.items
        });

        const order = await repository.getById(id);
        res.status(201).send({ message: 'Order cadastrado com sucesso!', data: order});
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