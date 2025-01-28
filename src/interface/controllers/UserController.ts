import { Request, Response } from 'express';
import { UserService } from '../../domain/User/services/UserService';
import { InMemoryUserRepository } from '../../infrastructure/repositories/InMemoryUserRepository';

const userRepository = new InMemoryUserRepository();
const userService = new UserService(userRepository);

export class UserController {
    async register(req: Request, res: Response): Promise<void> {
        const { name, email, password } = req.body;

        try {
            const user = await userService.register(name, email, password);
            res.status(201).json({ message: 'Usuário cadastrado com sucesso', user });
        } catch (error: unknown) {
            if (error instanceof Error) {
                res.status(400).json({ message: error.message });
            } else {
                res.status(500).json({ message: 'Erro interno do servidor' });
            }
        }
    }

    async update(req: Request, res: Response): Promise<void> {
        const { name, email, password } = req.body;

        try {
            const user = await userService.update(name, email, password);
            res.status(200).json({ message: 'Usuário atualizado com sucesso', user });
        } catch (error: unknown) {
            if (error instanceof Error) {
                res.status(400).json({ message: error.message });
            } else {
                res.status(500).json({ message: 'Erro interno do servidor' });
            }
        }

    }
}
