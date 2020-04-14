'use strict';

const ValidationContract = require('../validators/validations');
const repository = require('../repositories/customer-repository');
const md5 = require('md5');
const authService = require('../services/auth-service');

exports.createCustomer = async (req, res, next) => {
    let contract = new ValidationContract();
    contract.hasMinLen(req.body.name, 3, 'O campo name deve conter pelo menos 3 caracteres');
    contract.isEmail(req.body.email, 'O campo email está invalido')
    contract.hasMinLen(req.body.password, 6, 'O campo password deve conter pelo menos 6 caracteres');

    // Se os dados forem inválidos
    if (!contract.isValid()) {
        res.status(500).send(contract.errors()).end();
        return;
    }

    try {

        await repository.create({
            name: req.body.name,
            email: req.body.email,
            password: md5(req.body.password + global.SALT_KEY)
        });

        res.status(201).send({ message: 'Customer cadastrado com sucesso!' });

    } catch (error) {
        res.status(500).send(error);
    }
};