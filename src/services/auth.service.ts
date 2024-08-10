import UserService from './user.service';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { User } from '../models';
import { injectable, inject } from "tsyringe";

const tokenBlacklist: Set<string> = new Set();

@injectable()
export default class AuthService {
    constructor(@inject(UserService) private userService: UserService) { }

    public async login(email: string, password: string): Promise<string> {
        const user = await this.userService.getUserByEmail(email);

        if (!user) {
            throw new Error('Invalid credentials');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error('Invalid credentials');
        }

        const token = jwt.sign(
            { id: user.id, role: user.role },
            process.env.JWT_SECRET || "jwt_secret",
            { expiresIn: '7d' }
        );

        return token;
    }

    public async register(
        name: string,
        email: string,
        address: string,
        password: string,
        role: string
    ): Promise<User> {
        const existingUser = await this.userService.getUserByEmail(email);
        if (existingUser) {
            throw new Error('User already exists');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = { name, email, password: hashedPassword, address, role, }
        return await this.userService.createUser(newUser);
    }

    // Function to logout user
    public async logout(token: string): Promise<void> {
        tokenBlacklist.add(token);
    }

    // Function to remove a token from the blacklist
    public removeFromBlacklist(token: string): void {
        tokenBlacklist.delete(token);
    }

    // Middleware to check if token is blacklisted
    public isTokenBlacklisted(token: string): boolean {
        return tokenBlacklist.has(token);
    }
}