import User, { IUser } from '../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET as string;

class UserService{
    //cria usuario
    async createUser({name,email,password}: IUser){
        //verificando se o usuario ja existe
        try {
            const existingUser = await User.findOne({email});
            if(existingUser){
                throw new Error('Usuário já existe');
            }

            //criando um novo usuario
            const user = new User({name,email,password});
            await user.save();

            //agora vai gerar o token JWT para o usuario para autenticacao
            const token = jwt.sign({userId: user._id},JWT_SECRET,{expiresIn: '1h'});
            return {user, token};
        } catch (error) {
            if (error instanceof Error) {
                throw new Error("Erro: " + error.message);
            } else {
                throw new Error('Erro desconhecido');
            }
        }
    }

    //autencação do usuario - login
    async loginUser(email: string, password: string){
        try {
            //verifica se o usuario existe
            const user = await User.findOne({email});
            if(!user){              
                throw new Error('Usuário não encontrado');
            }

            //verifica se a senha esta correta
            const isPasswordCorrect = await bcrypt.compare(password, user.password);
            if(!isPasswordCorrect){
                throw new Error('Senha incorreta');
            }

            //gera o token JWT para o usuario
            const token = jwt.sign({userId: user._id},JWT_SECRET,{expiresIn: '1h'});
            
            //retorna o usuario e o token
            const userResponse = {
                _id: user._id,
                name: user.name,
                email: user.email,
                // role: user.role
            }
            return {user: userResponse, token};
        } catch (error) {
            if (error instanceof Error) {
                throw new Error("Erro: " + error.message);
            } else {
                throw new Error('Erro desconhecido');
            }
        }
    }
}

export default UserService;