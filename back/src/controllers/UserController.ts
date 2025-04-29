import { Request, Response } from 'express';
import UserService from '../services/UserService';

class UserController {
  private userService: UserService;

    constructor() {
        this.userService = new UserService();
    }
    // Método para cadastrar um novo usuário
    async register(req: Request, res: Response) {
        const { name, email, password, city } = req.body;

        try {
            const result = await this.userService.createUser({name, email, password,city});
            res.status(201).json(result);
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ message: error.message });
            } else {
                res.status(400).json({ message: 'Erro desconhecido' });
            }
        }
    }

    // Método para autenticar um usuário
    async login(req: Request, res: Response) {
        const { email, password } = req.body;

        try {
            const result = await this.userService.loginUser(email, password);
            res.status(200).json(result);
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ message: error.message });
            } else {
                res.status(400).json({ message: 'Erro desconhecido' });
            }
        }
    }
}

export default UserController;