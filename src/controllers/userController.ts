import { Request, Response } from 'express';
import { injectable, inject } from 'tsyringe';
import UserService from '../services/user.service';
import { UserDTO } from '../Types/DTO';
import { User } from '../models';

@injectable()
export class UserController {
  constructor(@inject(UserService) private userService: UserService) {}

  async createUser(req: Request, res: Response): Promise<User> {
    try {
      const userData: UserDTO = req.body;
      const user = await this.userService.createUser(userData);
      res.status(201).json(user);
      return user;
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(400).json({ error: 'An unknown error occurred' });
      }
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
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'An unknown error occurred' });
      }
      throw error;
    }
  }

  async getUserByEmail(req: Request, res: Response): Promise<User | null> {
    try {
      const email = String(req.params.email);
      console.log(`Fetching user with email: ${email}`);

      const user = await this.userService.getUserByEmail(email);
      if (!user) {
        console.warn(`User not found with email: ${email}`);
        res.status(404).json({ error: `User not found: ${email}` });
        return null;
      }

      console.log(`User found: ${email}`);
      res.json(user);
      return user;
    } catch (error) {
      if (error instanceof Error) {
        console.error(`Error retrieving user with email: ${req.params.email}`, error);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        res.status(500).json({ error: 'An unknown error occurred' });
      }
      throw error;
    }
  }

  async updateUser(req: Request, res: Response): Promise<User | null> {
    try {
      const userId = parseInt(req.params.id, 10);
      const userData: UserDTO = req.body;

      console.log('Request to update user with ID:', userId);
      console.log('Request body data:', userData);

      const updatedUser = await this.userService.updateUser(userId, userData);
      if (!updatedUser) {
        res.status(404).json({ error: 'User not found or no changes made' });
        return null;
      }

      res.json(updatedUser);
      return updatedUser;
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error in updateUser controller:', error);
        res.status(400).json({ error: error.message });
      } else {
        res.status(400).json({ error: 'An unknown error occurred' });
      }
      return null; // Ensure the function completes
    }
  }

  async deleteUser(req: Request, res: Response): Promise<void> {
    try {
      const userId = parseInt(req.params.id, 10);
      await this.userService.deleteUser(userId);
      res.status(204).send();
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'An unknown error occurred' });
      }
    }
  }

  async getAllUsers(req: Request, res: Response): Promise<User[]> {
    try {
      const users = await this.userService.getAllUsers();
      res.json(users);
      return users;
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'An unknown error occurred' });
      }
      throw error;
    }
  }

  async editUserPassword(req: Request, res: Response): Promise<Response> {
    const userId = parseInt(req.params.id, 10);
    const { oldPassword, newPassword } = req.body;

    try {
      const result = await this.userService.editUserPassword(userId, oldPassword, newPassword);
      return res.status(200).json({ message: result });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message || 'An error occurred' });
      } else {
        return res.status(400).json({ error: 'An unknown error occurred' });
      }
    }
  }

  async changeRole(req: Request, res: Response): Promise<User | null> {
    try {
      console.log(`Changing role of user with ID: ${req.params.id}`);

      const userId = parseInt(req.params.id, 10);
      const role = req.body.role;

      console.log('Request to change role of user with ID:', userId);
      console.log('Request body data:', role);

      const updatedUser = await this.userService.changeRole(userId, role);
      if (!updatedUser) {
        res.status(404).json({ error: 'User not found or no changes made' });
        return null;
      }

      // Remove the password from the response
      updatedUser.password = '****************';

      res.json(updatedUser);
      return updatedUser;
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error in changeRole controller:', error);
        res.status(400).json({ error: error.message });
      } else {
        res.status(400).json({ error: 'An unknown error occurred' });
      }
      return null; // Ensure the function completes
    }
  }
}
