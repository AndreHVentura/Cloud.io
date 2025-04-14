"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UserController_1 = __importDefault(require("../controllers/UserController"));
const router = express_1.default.Router();
const userController = new UserController_1.default();
// Rota para cadastrar um novo usuário
router.post('/register', (req, res) => userController.register(req, res));
// Rota para autenticar um usuário
router.post('/login', (req, res) => userController.login(req, res));
exports.default = router;
