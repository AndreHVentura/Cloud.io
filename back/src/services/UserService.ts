import User, { IUser } from '../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET as string;

// Objeto com os métodos do serviço (não é mais uma classe)
const userService = {
    // Cria usuário
    async createUser({name, email, password, city, role}: IUser) {
        try {
            const existingUser = await User.findOne({email});
            if(existingUser) {
                throw new Error('Usuário já existe');
            }

            const user = new User({name, email, password, city, role});
            await user.save();

            const token = jwt.sign({userId: user._id, role: user.role}, JWT_SECRET, {expiresIn: '1h'});
            return {user, token};
        } catch (error) {
            handleError(error);
        }
    },

    // Autenticação do usuário - login
    async loginUser(email: string, password: string) {
        try {
            const user = await User.findOne({email});
            if(!user) {              
                throw new Error('Usuário não encontrado');
            }

            const isPasswordCorrect = await bcrypt.compare(password, user.password);
            if(!isPasswordCorrect) {
                throw new Error('Senha incorreta');
            }

            const token = jwt.sign({userId: user._id, role: user.role}, JWT_SECRET, {expiresIn: '1h'});
            
            const userResponse = {
                _id: user._id,
                name: user.name,
                email: user.email,
                city: user.city,
                role: user.role
            };
            return {user: userResponse, token};
        } catch (error) {
            handleError(error);
        }
    },

    // Busca usuário por nome
    async buscar(name: string) {
        try {
            const user = await User.findOne({name: name}).select("-password");
            if(!user) {
                throw new Error("Usuário não encontrado");
            }
            return {user};
        } catch (error) {
            handleError(error);
        }
    },

    // Atualiza usuário
    async updateUser(userId: string, updateData: Partial<IUser>) {
        try {
            // Se estiver atualizando a senha, faz o hash
            if (updateData.password) {
                updateData.password = await bcrypt.hash(updateData.password, 10);
            }

            const updatedUser = await User.findByIdAndUpdate(
                userId,
                updateData,
                { 
                    new: true,         // Retorna o documento atualizado
                    runValidators: true // Valida os dados antes de atualizar
                }
            ).select("-password");

            if (!updatedUser) {
                throw new Error('Usuário não encontrado');
            }

            return { user: updatedUser };
        } catch (error) {
            handleError(error);
        }
    },

    // Deleta usuário
    async deleteUser(userId: string) {
        try {
            const deletedUser = await User.findByIdAndDelete(userId).select("-password");
            
            if (!deletedUser) {
                throw new Error('Usuário não encontrado');
            }

            return { 
                message: 'Usuário deletado com sucesso', 
                user: deletedUser 
            };
        } catch (error) {
            handleError(error);
        }
    }
};

// Função de tratamento de erros (não é mais um método privado)
function handleError(error: unknown): never {
    if (error instanceof Error) {
        throw new Error(error.message);
    }
    throw new Error('Erro desconhecido');
}

export default userService;