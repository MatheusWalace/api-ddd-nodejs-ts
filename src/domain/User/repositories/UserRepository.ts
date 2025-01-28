import { User } from '../entities/User';

export interface UserRepository {
    save(user: User): Promise<void>;
    findByEmail(email: string): Promise<User | null>;
    update(user: User): Promise<void>;
}