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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const express_1 = __importDefault(require("express"));
const userRoutes_1 = __importDefault(require("../../../interface/routes/userRoutes"));
describe('UserController', () => {
    let app;
    beforeAll(() => {
        app = (0, express_1.default)();
        app.use(express_1.default.json());
        app.use('/users', userRoutes_1.default);
    });
    it('deve cadastrar um usuário com sucesso', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app)
            .post('/users/register')
            .send({
            name: 'João Silva',
            email: 'joao.silva@example.com',
            password: 'senha123',
        });
        expect(response.status).toBe(201);
        expect(response.body).toEqual(expect.objectContaining({
            message: 'Usuário cadastrado com sucesso',
            user: expect.objectContaining({
                name: 'João Silva',
                email: 'joao.silva@example.com',
                password: 'senha123',
            }),
        }));
    }));
    it('não deve cadastrar um usuário com email duplicado', () => __awaiter(void 0, void 0, void 0, function* () {
        // Primeiro cadastro
        yield (0, supertest_1.default)(app)
            .post('/users/register')
            .send({
            name: 'João Silva',
            email: 'joao.silva@example.com',
            password: 'senha123',
        });
        // Segundo cadastro com o mesmo email
        const response = yield (0, supertest_1.default)(app)
            .post('/users/register')
            .send({
            name: 'João Silva 2',
            email: 'joao.silva@example.com',
            password: 'senha456',
        });
        expect(response.status).toBe(400);
        expect(response.body).toEqual(expect.objectContaining({
            message: 'O email já está em uso',
        }));
    }));
    it('não deve cadastrar um usuário com dados incompletos', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app)
            .post('/users/register')
            .send({
            email: 'joao.silva1@example.com',
            password: 'senha123',
        });
        expect(response.status).toBe(400);
        expect(response.body).toEqual(expect.objectContaining({
            message: 'Todos os campos são obrigatórios',
        }));
    }));
});
