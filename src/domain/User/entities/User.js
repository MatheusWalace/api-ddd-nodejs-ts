"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
class User {
    constructor(name, email, password) {
        this.name = name;
        this.email = email;
        this.password = password;
    }
    static create(name, email, password) {
        if (!name || !email || !password) {
            throw new Error('Todos os campos são obrigatórios');
        }
        return new User(name, email, password);
    }
    static update(name, email, password) {
        if (!name || !email || !password) {
            throw new Error('Todos os campos são obrigatórios');
        }
        return new User(name, email, password);
    }
}
exports.User = User;
