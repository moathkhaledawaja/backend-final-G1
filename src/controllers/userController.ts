import { Request, Response } from 'express';
import { injectable, inject } from 'tsyringe';
import UserService from '../services/user.service';
import { UserDTO } from '../DTO';
import { User } from '../models';

@injectable()
export class UserController {
    constructor(@inject(UserService) private userService: UserService) {

    }


    async createUser(req: Request, res: Response): Promise<User> {
        try {
            const userData: UserDTO = req.body;
            const user = await this.userService.createUser(userData);
            res.status(201).json(user);
            return user;
        } catch (error: any) {
            res.status(400).json({ error: error.message });
            throw error;
        }
    }

    async getUserById(req: Request, res: Response): Promise<User | null> {
        try {
            const userId = parseInt(req.params.id, 10);
            const user = await this.userService.getUserById(userId);
            if (!user) {
                res.status(404).json({ error: 'User not found' });
                return null;
            }
            res.json(user);
            return user;
        } catch (error: any) {
            res.status(500).json({ error: error.message });
            throw error;
        }
    }


    async getUserByEmail(req: Request, res: Response): Promise<User | null> {
        try {
            const email = req.query.email as string;
            const user = await this.userService.getUserByEmail(email);
            if (!user) {
                res.status(404).json({ error: 'User not found' });
                return null;
            }
            res.json(user);
            return user;
        } catch (error: any) {
            res.status(500).json({ error: error.message });
            throw error;
        }
    }

    async updateUser(req: Request, res: Response): Promise<User | null> {
        try {
            const userId = parseInt(req.params.id, 10);
            const userData: UserDTO = req.body;
            const updatedUser = await this.userService.updateUser(userId, userData);
            if (!updatedUser) {
                res.status(404).json({ error: 'User not found' });
                return null;
            }
            res.json(updatedUser);
            return updatedUser;
        } catch (error: any) {
            res.status(400).json({ error: error.message });
            throw error;
        }
    }

    async deleteUser(req: Request, res: Response): Promise<void> {
        try {
            const userId = parseInt(req.params.id, 10);
            await this.userService.deleteUser(userId);
            res.status(204).send();
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    async getAllUsers(req: Request, res: Response): Promise<User[]> {
        try {
            const users = await this.userService.getAllUsers();
            res.json(users);
            return users;
        } catch (error: any) {
            res.status(500).json({ error: error.message });
            throw error;
        }
    }
}