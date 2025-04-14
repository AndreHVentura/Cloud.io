"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../models/User"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const JWT_SECRET = process.env.JWT_SECRET;
class UserService {
    //cria usuario
    createUser(_a) {
        return __awaiter(this, arguments, void 0, function* ({ name, email, password, role }) {
            //verificando se o usuario ja existe
            try {
                const existingUser = yield User_1.default.findOne({ email });
                if (existingUser) {
                    throw new Error('Usuário já existe');
                }
                //criando um novo usuario
                const user = new User_1.default({ name, email, password, role });
                yield user.save();
                //agora vai gerar o token JWT para o usuario para autenticacao
                const token = jsonwebtoken_1.default.sign({ userId: user._id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
                return { user, token };
            }
            catch (error) {
                if (error instanceof Error) {
                    throw new Error("Erro: " + error.message);
                }
                else {
                    throw new Error('Erro desconhecido');
                }
            }
        });
    }
    //autencação do usuario - login
    loginUser(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //verifica se o usuario existe
                const user = yield User_1.default.findOne({ email });
                if (!user) {
                    throw new Error('Usuário não encontrado');
                }
                //verifica se a senha esta correta
                const isPasswordCorrect = yield bcryptjs_1.default.compare(password, user.password);
                if (!isPasswordCorrect) {
                    throw new Error('Senha incorreta');
                }
                //gera o token JWT para o usuario
                const token = jsonwebtoken_1.default.sign({ userId: user._id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
                //retorna o usuario e o token
                const userResponse = {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role
                };
                return { user: userResponse, token };
            }
            catch (error) {
                if (error instanceof Error) {
                    throw new Error("Erro: " + error.message);
                }
                else {
                    throw new Error('Erro desconhecido');
                }
            }
        });
    }
}
exports.default = UserService;
