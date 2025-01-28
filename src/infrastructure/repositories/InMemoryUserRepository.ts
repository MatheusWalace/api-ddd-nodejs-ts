import { UserRepository } from '../../domain/User/repositories/UserRepository';
import { User } from '../../domain/User/entities/User';

export class InMemoryUserRepository implements UserRepository {
    private users: User[] = [];

    async save(user: User): Promise<void> {
        this.users.push(user);
    }

    async findByEmail(email: string): Promise<User | null> {
        return this.users.find(user => user.email === email) || null;
    }

    async update(user: User): Promise<void> {
        const index = this.users.findIndex(u => u.email === user.email);
        this.users[index] = user;
    }
}
