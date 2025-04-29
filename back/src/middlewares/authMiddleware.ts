import { expressjwt } from 'express-jwt';
import dotenv from 'dotenv';
import User from '../models/User';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET as string;

class AuthMiddleware {
  // Middleware para verificar o token JWT
  static verifyToken() {
    return expressjwt({
      secret: process.env.JWT_SECRET || "fallback_secret",
      algorithms: ['HS256'], // Algoritmo de criptografia
    });
  }
  
  //pegar dados do usuario
  static getUserData(req: any, res: any, next: any) {
    const userId = req.auth?.userId;
    if (!userId) {
      return res.status(403).json({ message: 'Acesso negado' });
    }
    User.findById(userId).then((user) => {
      if (!user) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
      }
      res.locals.user = {
        _id: user._id,
        name: user.name,
        email: user.email,
        city: user.city
      };
      next();
    });
  }


  // Middleware para verificar a role do usuário
  static checkRole(requiredRole: string) {
    return (req: any, res: any, next: any) => {
      const role = req.auth.role; 
      if (role === requiredRole) {

        console.log('Acesso permitido');
        next();
      } else {
        res.status(403).json({ message: 'Acesso negado' });
      }
    };
  }
}

export default AuthMiddleware;