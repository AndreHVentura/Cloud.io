import { Request, Response } from 'express';
import userService from '../services/UserService';

class UserController {
    // Método para cadastrar um novo usuário
    async register(req: Request, res: Response) {
        const { name, email, password, city, role } = req.body;

        try {
            const result = await userService.createUser({ name, email, password, city, role });
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
            const result = await userService.loginUser(email, password);
            res.status(200).json(result);
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ message: error.message });
            } else {
                res.status(400).json({ message: 'Erro desconhecido' });
            }
        }
    }

    // Método para buscar usuário por nome
    async buscar(req: Request, res: Response) {
        const { name } = req.query;

        if (typeof name !== 'string') {
            return res.status(400).json({ message: 'Parâmetro "name" inválido ou ausente' });
        }

        try {
            const result = await userService.buscar(name);
            res.status(200).json(result);
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ message: error.message });
            } else {
                res.status(400).json({ message: 'Erro desconhecido' });
            }
        }
    }

    // Método para atualizar usuário
    async updateUser(req: Request, res: Response) {
        const { id } = req.params;
        const updateData = req.body;

        try {
            const result = await userService.updateUser(id, updateData);
            res.status(200).json(result);
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ message: error.message });
            } else {
                res.status(400).json({ message: 'Erro desconhecido' });
            }
        }
    }

    // Método para deletar usuário
    async deleteUser(req: Request, res: Response) {
        const { id } = req.params;

        try {
            const result = await userService.deleteUser(id);
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