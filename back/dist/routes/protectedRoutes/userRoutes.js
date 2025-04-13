"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = __importDefault(require("../../middlewares/authMiddleware"));
const protectedUserRouter = express_1.default.Router();
// Rota protegida para usuários autenticados
protectedUserRouter.get('/user', authMiddleware_1.default.verifyToken(), authMiddleware_1.default.getUserData, authMiddleware_1.default.checkRole('user'), (req, res) => {
    const user = res.locals.user; // Acessa os dados do usuário
    res.json({ message: 'Bem-vindo ao seu perfil', user });
});
// Rota protegida para administradores
protectedUserRouter.get('/admin', authMiddleware_1.default.verifyToken(), authMiddleware_1.default.getUserData, authMiddleware_1.default.checkRole('admin'), (req, res) => {
    const user = res.locals.user; // Acessa os dados do usuário
    res.json({ message: 'Bem-vindo, administrador', user });
});
exports.default = protectedUserRouter;
