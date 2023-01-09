const express = require('express');
const UserController = require('../api/controllers/user-controller');
const UserRouter = express.Router();

UserRouter.post('/', UserController.CreateUser); // Cria Usuário através do frontEnd
UserRouter.get('/:client_id', UserController.ListUserNoAdm); // Lista Usuários de um determinado cliente
UserRouter.get('/adm/:user_id', UserController.ListAdmAccess);
UserRouter.post('/update', UserController.updateFarmAccess);
UserRouter.get('/list/:client_id', UserController.ListAccessNames);

module.exports = UserRouter;
