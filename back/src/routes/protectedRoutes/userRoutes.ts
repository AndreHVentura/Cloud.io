import express from 'express';
import AuthMiddleware from '../../middlewares/authMiddleware';


const protectedUserRouter = express.Router();

// Rota protegida para usuários autenticados
protectedUserRouter.get('/user', AuthMiddleware.verifyToken(),AuthMiddleware.getUserData ,AuthMiddleware.checkRole('user'), (req, res) => {
    const user = res.locals.user; // Acessa os dados do usuário
    
    res.json({ message: 'Bem-vindo ao seu perfil', user});
});

// Rota protegida para administradores
protectedUserRouter.get('/admin', AuthMiddleware.verifyToken(), AuthMiddleware.getUserData, AuthMiddleware.checkRole('admin'), (req, res) => {
    const user = res.locals.user; // Acessa os dados do usuário
  res.json({ message: 'Bem-vindo, administrador', user });
});

export default protectedUserRouter;