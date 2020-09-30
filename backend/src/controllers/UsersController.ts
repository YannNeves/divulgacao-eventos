import { Request, Response} from 'express';
import knex from '../database/connection';

class UsersController{

    async login(request: Request, response: Response){
        const { email, password } = request.body;

        const user = await knex('users')       
        .where('email', String(email))
        .where('password', String(password))
        .first();

        if (!user){
            return response.status(404).json({ message: 'Login ou Senha incorretos!' });
        }

        return response.status(200).json({ message: 'Logado com sucesso!', user: user });
    }

    async create(request: Request, response: Response) {
        const {
            name,
            email,
            password
        } = request.body;
    
        const user = {
            name,
            email,
            password
        };

        const trx = await knex.transaction();

        await trx('users').insert(user);
       
        await trx.commit();

        return response.status(200).json('Salvo com sucesso!');
    }
}

export default UsersController;