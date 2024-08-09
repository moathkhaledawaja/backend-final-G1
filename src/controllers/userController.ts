import { Request, Response } from 'express';
import { injectable, inject } from 'tsyringe';
import UserService from '../services/user.service';
import { UserDTO } from '../DTO';

@injectable()
export class UserController {
    constructor(@inject(UserService) private userService: UserService) { }

    async createUser(req: Request, res: Response): Promise<void> {
        try {
            const userData: UserDTO = req.body;
            const user = await this.userService.createUser(userData);
            res.status(201).json(user);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    async getUserById(req: Request, res: Response): Promise<void> {
        try {
            const userId = parseInt(req.params.id, 10);
            const user = await this.userService.getUserById(userId);
            if (!user) {
                res.status(404).json({ error: 'User not found' });
                return;
            }
            res.json(user);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    async getUserByEmail(req: Request, res: Response): Promise<void> {
        try {
            const email = req.query.email as string;
            const user = await this.userService.getUserByEmail(email);
            if (!user) {
                res.status(404).json({ error: 'User not found' });
                return;
            }
            res.json(user);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    async updateUser(req: Request, res: Response): Promise<void> {
        try {
            const userId = parseInt(req.params.id, 10);
            const userData: UserDTO = req.body;
            const updatedUser = await this.userService.updateUser(userId, userData);
            if (!updatedUser) {
                res.status(404).json({ error: 'User not found' });
                return;
            }
            res.json(updatedUser);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
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

    async getAllUsers(req: Request, res: Response): Promise<void> {
        try {
            const users = await this.userService.getAllUsers();
            res.json(users);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }
}
