import express from 'express';
import UserController from '../controllers/UserController';

const router = express.Router();
const userController = new UserController();

// Rota para cadastrar um novo usuário
router.post('/register', (req, res) => userController.register(req, res));

// Rota para autenticar um usuário
router.post('/login', (req, res) => userController.login(req, res));

// Rota para buscar usuário por nome
router.get('/user', (req, res) => {
  userController.buscar(req, res);
});
 
// NOVA ROTA: Atualizar usuário por ID
router.put('/user/:id', (req, res) => userController.updateUser(req, res));

// NOVA ROTA: Deletar usuário por ID
router.delete('/user/:id', (req, res) => userController.deleteUser(req, res));

export default router;