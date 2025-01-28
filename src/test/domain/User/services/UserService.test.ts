import { UserService } from '../../../../domain/User/services/UserService';
import { UserRepository } from '../../../../domain/User/repositories/UserRepository';
import { User } from '../../../../domain/User/entities/User';

describe('UserService', () => {
    let userRepository: jest.Mocked<UserRepository>;
    let userService: UserService;

    beforeEach(() => {
        userRepository = {
            findByEmail: jest.fn(),
            save: jest.fn(),
        } as unknown as jest.Mocked<UserRepository>;

        userService = new UserService(userRepository);
    });

    it('deve cadastrar um novo usuário se o email não estiver em uso', async () => {
        userRepository.findByEmail.mockResolvedValue(null);

        const name = 'John Doe';
        const email = 'john.doe@example.com';
        const password = 'securepassword';

        const user = await userService.register(name, email, password);

        expect(userRepository.findByEmail).toHaveBeenCalledWith(email);
        expect(userRepository.save).toHaveBeenCalledWith(user);

        expect(user.name).toBe(name);
        expect(user.email).toBe(email);
    });

    it('deve lançar um erro se o email já estiver em uso', async () => {
        const existingUser = User.create('Existing User', 'existing@example.com', 'password123');
        userRepository.findByEmail.mockResolvedValue(existingUser);

        const name = 'John Doe';
        const email = 'existing@example.com';
        const password = 'securepassword';

        await expect(userService.register(name, email, password)).rejects.toThrow('O email já está em uso');

        expect(userRepository.save).not.toHaveBeenCalled();
    });
});
