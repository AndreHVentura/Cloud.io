import { expressjwt } from 'express-jwt';
import dotenv from 'dotenv';
import User from '../models/User';
import express, { Request, Response, NextFunction } from 'express';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET as string;

console.log("JWT_SECRET:", JWT_SECRET);

class AuthMiddleware {
  // Middleware para verificar o token JWT
  static verifyToken() {
    return expressjwt({
      secret: JWT_SECRET,
      algorithms: ['HS256'],
      requestProperty: 'auth', // onde o express-jwt vai colocar os dados decodificados
    });
  }

  // Middleware para pegar os dados do usuário
static async getUserData(req: Request & { auth?: { userId?: string, role?: string } }, res: Response, next: NextFunction) {
  try {
    const userId = req.auth?.userId;
    if (!userId) {
      res.status(403).json({ message: 'Acesso negado' });
      return;
    }

    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ message: 'Usuário não encontrado' });
      return;
    }

    res.locals.user = {
      _id: user._id,
      name: user.name,
      email: user.email,
      city: user.city
    };

    next(); // Chamada do próximo middleware
  } catch (error) {
    console.error('Erro ao obter dados do usuário:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
}


  // Middleware para verificar a role do usuário
  static checkRole(requiredRole: string) {
  return (req: any, res: any, next: any) => {
    console.log("Role no token:", req.auth.role);
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