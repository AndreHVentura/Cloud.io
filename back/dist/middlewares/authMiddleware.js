"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_jwt_1 = require("express-jwt");
const dotenv_1 = __importDefault(require("dotenv"));
const User_1 = __importDefault(require("../models/User"));
dotenv_1.default.config();
const JWT_SECRET = process.env.JWT_SECRET;
class AuthMiddleware {
    // Middleware para verificar o token JWT
    static verifyToken() {
        return (0, express_jwt_1.expressjwt)({
            secret: JWT_SECRET,
            algorithms: ['HS256'], // Algoritmo de criptografia
        });
    }
    //pegar dados do usuario
    static getUserData(req, res, next) {
        var _a;
        const userId = (_a = req.auth) === null || _a === void 0 ? void 0 : _a.userId;
        if (!userId) {
            return res.status(403).json({ message: 'Acesso negado' });
        }
        User_1.default.findById(userId).then((user) => {
            if (!user) {
                return res.status(404).json({ message: 'Usuário não encontrado' });
            }
            res.locals.user = {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            };
            next();
        });
    }
    // Middleware para verificar a role do usuário
    static checkRole(requiredRole) {
        return (req, res, next) => {
            const role = req.auth.role;
            if (role === requiredRole) {
                console.log('Acesso permitido');
                next();
            }
            else {
                res.status(403).json({ message: 'Acesso negado' });
            }
        };
    }
}
exports.default = AuthMiddleware;
