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
exports.UserController = void 0;
const UserService_1 = require("../../domain/User/services/UserService");
const InMemoryUserRepository_1 = require("../../infrastructure/repositories/InMemoryUserRepository");
const userRepository = new InMemoryUserRepository_1.InMemoryUserRepository();
const userService = new UserService_1.UserService(userRepository);
class UserController {
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, email, password } = req.body;
            try {
                const user = yield userService.register(name, email, password);
                res.status(201).json({ message: 'Usuário cadastrado com sucesso', user });
            }
            catch (error) {
                if (error instanceof Error) {
                    res.status(400).json({ message: error.message });
                }
                else {
                    res.status(500).json({ message: 'Erro interno do servidor' });
                }
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, email, password } = req.body;
            try {
                const user = yield userService.update(name, email, password);
                res.status(200).json({ message: 'Usuário atualizado com sucesso', user });
            }
            catch (error) {
                if (error instanceof Error) {
                    res.status(400).json({ message: error.message });
                }
                else {
                    res.status(500).json({ message: 'Erro interno do servidor' });
                }
            }
        });
    }
}
exports.UserController = UserController;
