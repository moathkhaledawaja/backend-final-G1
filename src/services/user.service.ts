import { User } from "../models";
import { userRepository } from "../data-access";
import { UserDTO } from "../DTO/userDto";

export default class UserService {
  async createUser(userData: UserDTO): Promise<User> {
    try {
      const newUser = new User();
      newUser.name = userData.name;
      newUser.email = userData.email;
      newUser.password = userData.password;
      newUser.address = userData.address;
      newUser.role = userData.role;

      const user = await userRepository.create(newUser);
      if (!user) {
        throw new Error("Failed to create user");
      }
      return user;
    } catch (error: any) {
      throw new Error(`Error creating user: ${error.message}`);
    }
  }

  async getUserById(userId: number): Promise<User | null> {
    try {
      const user = await userRepository.findById(userId);
      return user;
    } catch (error) {
      throw new Error(`Error retrieving user: ${error}`);
    }
  }

  async getUserByEmail(email: string): Promise<User | null> {
    try {
      const user = await userRepository.findByEmail(email);
      if (!user) {
        console.warn(`No user found with email: ${email}`);
      }
      return user;
    } catch (error: any) {
      console.error(`Error retrieving user by email: ${email}`, error);
      throw new Error(`Error retrieving user: ${error.message}`);
    }
  }

  async updateUser(userId: number, userData: UserDTO): Promise<User | null> {
    try {
      const user = await userRepository.findById(userId);
      if (!user) {
        console.log('User not found with ID:', userId);
        throw new Error("User not found");
      }

      console.log('Existing user:', user);
      console.log('New user data:', userData);

      const isDataChanged = this.isUserDataChanged(user, userData);
      if (!isDataChanged) {
        console.log('No changes detected in user data.');
        return user;
      }

      // Convert UserDTO to Partial<User>
      const partialUser: Partial<User> = {
        name: userData.name,
        email: userData.email,
        password: userData.password,
        address: userData.address,
        role: userData.role,
      };

      const updatedUser = await userRepository.updateUser(userId, partialUser);
      console.log('Updated user:', updatedUser);
      return updatedUser;
    } catch (error: any) {
      console.error(`Error updating user: ${error}`);
      throw new Error(`Error updating user: ${error.message}`);
    }
  }

  // Helper function to check if data has changed
  private isUserDataChanged(existingUser: User, newUserData: UserDTO): boolean {
    return (
      existingUser.name !== newUserData.name ||
      existingUser.email !== newUserData.email ||
      existingUser.password !== newUserData.password ||
      existingUser.address !== newUserData.address ||
      existingUser.role !== newUserData.role
    );
  }

  async deleteUser(userId: number): Promise<void> {
    try {
      await userRepository.deleteUser(userId);
    } catch (error) {
      throw new Error(`Error deleting user: ${error}`);
    }
  }

  async getAllUsers(): Promise<User[]> {
    try {
      const users = await userRepository.findAll();
      return users;
    } catch (error) {
      throw new Error(`Error retrieving users: ${error}`);
    }
  }
}
