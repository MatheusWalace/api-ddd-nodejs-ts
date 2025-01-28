import { UserRepository } from '../repositories/UserRepository';
import { User } from '../entities/User';

export class UserService {
    constructor(private userRepository: UserRepository) {}

    async register(
        name: string,
        email: string,
        password: string
    ): Promise<User>
    {
        const existingUser = await this.userRepository.findByEmail(email);
        if (existingUser) {
            throw new Error('O email já está em uso');
        }

        const user = User.create(name, email, password);

        await this.userRepository.save(user);

        return user;
    }

    async update(
        name: string,
        email: string,
        password: string
    ): Promise<User>
    {
        const existingUser = await this.userRepository.findByEmail(email);
        if (!existingUser) {
            throw new Error('Usuário não encontrado');
        }

        const user = User.update(name, email, password);

        await this.userRepository.update(user);

        return user;
    }
}
