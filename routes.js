const express = require('express');
const routes = express.Router();
const paginaController = require('./src/controllers/paginaController');
const contatoController = require('./src/controllers/contatoController');

//rota home
routes.get('/',paginaController.paginaInicial);
routes.post('/', paginaController.trataPost);


//rota contatos
routes.get('/contatos', contatoController.contatos);
module.exports = routes;