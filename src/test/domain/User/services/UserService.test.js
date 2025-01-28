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
Object.defineProperty(exports, "__esModule", { value: true });
const UserService_1 = require("../../../../domain/User/services/UserService");
const User_1 = require("../../../../domain/User/entities/User");
describe('UserService', () => {
    let userRepository;
    let userService;
    beforeEach(() => {
        userRepository = {
            findByEmail: jest.fn(),
            save: jest.fn(),
        };
        userService = new UserService_1.UserService(userRepository);
    });
    it('deve cadastrar um novo usuário se o email não estiver em uso', () => __awaiter(void 0, void 0, void 0, function* () {
        userRepository.findByEmail.mockResolvedValue(null);
        const name = 'John Doe';
        const email = 'john.doe@example.com';
        const password = 'securepassword';
        const user = yield userService.register(name, email, password);
        expect(userRepository.findByEmail).toHaveBeenCalledWith(email);
        expect(userRepository.save).toHaveBeenCalledWith(user);
        expect(user.name).toBe(name);
        expect(user.email).toBe(email);
    }));
    it('deve lançar um erro se o email já estiver em uso', () => __awaiter(void 0, void 0, void 0, function* () {
        const existingUser = User_1.User.create('Existing User', 'existing@example.com', 'password123');
        userRepository.findByEmail.mockResolvedValue(existingUser);
        const name = 'John Doe';
        const email = 'existing@example.com';
        const password = 'securepassword';
        yield expect(userService.register(name, email, password)).rejects.toThrow('O email já está em uso');
        expect(userRepository.save).not.toHaveBeenCalled();
    }));
});
