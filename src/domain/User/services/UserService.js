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
exports.UserService = void 0;
const User_1 = require("../entities/User");
class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    register(name, email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingUser = yield this.userRepository.findByEmail(email);
            if (existingUser) {
                throw new Error('O email já está em uso');
            }
            const user = User_1.User.create(name, email, password);
            yield this.userRepository.save(user);
            return user;
        });
    }
    update(name, email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingUser = yield this.userRepository.findByEmail(email);
            if (!existingUser) {
                throw new Error('Usuário não encontrado');
            }
            const user = User_1.User.update(name, email, password);
            yield this.userRepository.update(user);
            return user;
        });
    }
}
exports.UserService = UserService;
