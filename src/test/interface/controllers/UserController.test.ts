import request from 'supertest';
import express from 'express';
import userRoutes from '../../../interface/routes/userRoutes';

describe('UserController', () => {
    let app: express.Application;

    beforeAll(() => {
        app = express();
        app.use(express.json());
        app.use('/users', userRoutes);
        app.use('/update', userRoutes);
    });

    it('deve cadastrar um usuário com sucesso', async () => {
        const response = await request(app)
            .post('/users/register')
            .send({
                name: 'João Silva',
                email: 'joao.silva@example.com',
                password: 'senha123',
            });

        expect(response.status).toBe(201);
        expect(response.body).toEqual(
            expect.objectContaining({
                message: 'Usuário cadastrado com sucesso',
                user: expect.objectContaining({
                    name: 'João Silva',
                    email: 'joao.silva@example.com',
                    password: 'senha123',
                }),
            })
        );
    });

    it('não deve cadastrar um usuário com email duplicado', async () => {
        // Primeiro cadastro
        await request(app)
            .post('/users/register')
            .send({
                name: 'João Silva',
                email: 'joao.silva@example.com',
                password: 'senha123',
            });

        const response = await request(app)
            .post('/users/register')
            .send({
                name: 'João Silva 2',
                email: 'joao.silva@example.com',
                password: 'senha456',
            });

        expect(response.status).toBe(400);
        expect(response.body).toEqual(
            expect.objectContaining({
                message: 'O email já está em uso',
            })
        );
    });

    it('não deve cadastrar um usuário com dados incompletos', async () => {
        const response = await request(app)
            .post('/users/register')
            .send({
                email: 'joao.silva1@example.com',
                password: 'senha123',
            });

        expect(response.status).toBe(400);
        expect(response.body).toEqual(
            expect.objectContaining({
                message: 'Todos os campos são obrigatórios',
            })
        );
    });
});
