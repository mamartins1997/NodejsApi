'use strict';

const ValidationContract = require('../validators/validations');
const repository = require('../repositories/customer-repository');
const md5 = require('md5');
const authService = require('../services/auth-service');

exports.authCustomer = async (req, res, next) => {
    let contract = new ValidationContract();
    contract.isEmail(req.body.email, 'O campo email está invalido')
    contract.hasMinLen(req.body.password, 6, 'O campo password deve conter pelo menos 6 caracteres');

    // Se os dados forem inválidos
    if (!contract.isValid()) {
        res.status(500).send(contract.errors()).end();
        return;
    }

    try {

        const customer = await repository.authenticate({
            email: req.body.email,
            password: md5(req.body.password + global.SALT_KEY)
        });

        if (!customer) {
            res.status(404).send({
                message: 'Email e/ou senha invalida'
            });
            return;
        }

        const tokenResult = await authService.generateToken({
            id: customer._id,
            email: customer.email,
            name: customer.name,
            role: customer.role
        });

        res.status(200).send({
            token: tokenResult,
            data: {
                email: customer.email,
                name: customer.name,
                role: customer.role
            }
        });

    } catch (error) {
        res.status(500).send(error);
    }
};


exports.refreshToken = async (req, res, next) => {
    try {
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        const data = await authService.decodeToken(token);

        const customer = await repository.getById(data.id);

        if (!customer) {
            res.status(404).send({
                message: 'Cliente não encontrado'
            });
            return;
        }

        const tokenData = await authService.generateToken({
            id: customer._id,
            email: customer.email,
            name: customer.name,
            role: customer.role
        });

        res.status(201).send({
            token: tokenData,
            data: {
                email: customer.email,
                name: customer.name,
                role:customer.role
            }
        });
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
};
