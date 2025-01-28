export class User {
    constructor(
        public name: string,
        public email: string,
        public password: string
    ) {}

    static create(
        name: string,
        email: string,
        password: string
    ): User
    {
        if (!name || !email || !password) {
            throw new Error('Todos os campos são obrigatórios');
        }
        return new User(name, email, password);
    }

    static update(
        name: string,
        email: string,
        password: string
    ): User
    {
        if (!name || !email || !password) {
            throw new Error('Todos os campos são obrigatórios');
        }
        return new User(name, email, password);
    }
}
