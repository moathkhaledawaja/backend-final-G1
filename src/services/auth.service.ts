import UserService from './user.service';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'
import User from '../models/user.model';

const tokenBlacklist: Set<string> = new Set();

class AuthService {
    public static async login(email: string, password: string) {
        const user = await UserService.getUserByEmail(email);

        if (!user) {
            throw new Error('Invalid credentials');
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error('Invalid credentials');
        }
        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET || "jwt_secret" as string, { expiresIn: '7d' });
        return token;
    }

    public static async register(username: string, email: string, password: string, role: string): Promise<User> {
        const user = await UserService.getUserByEmail(email);
        if (user) {
            throw new Error('User already exists');
        }
        return await UserService.createUser({ username, email, password, role });
    }

    // Function to logout user
    public static async logout(token: string) {
        tokenBlacklist.add(token);
    }

    // Function to remove a token from the blacklist
    public static removeFromBlacklist(token: string) {
        tokenBlacklist.delete(token);
    }


    // Middleware to check if token is blacklisted
    public static isTokenBlacklisted(token: string): boolean {
        return tokenBlacklist.has(token);
    }
}

export default AuthService;
