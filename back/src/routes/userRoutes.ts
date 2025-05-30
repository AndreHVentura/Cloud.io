import express from 'express';
import UserController from '../controllers/UserController';

const router = express.Router();
const userController = new UserController();

// Rota para cadastrar um novo usuário
router.post('/register', (req, res) => userController.register(req, res));

// Rota para autenticar um usuário
router.post('/login', (req, res) => userController.login(req, res));
router.get('/user', async (req, res) => {
  await userController.buscar(req, res);
});
  

export default router;