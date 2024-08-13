import { User } from "../models";
import { IUserRepository } from "./Interfaces/IUserRepository";
import { RepositoryBase } from "./RepositoryBase";

export class UserRepository
  extends RepositoryBase<User>
  implements IUserRepository
{

  async findByEmail(email: string): Promise<User | null> {
    try {
        console.log('Finding user with email:', email);
        const user = await this.model.findOne({ where: { email } });
        if (!user) {
            console.warn(`User not found with email: ${email}`);
        }
        return user;
    } catch (error : any) {
        console.error(`Error finding user by email: ${email}`, error);
        throw new Error(`Error finding user by email: ${error.message}`);
    }
}

  async findByRole(role: string): Promise<User[]> {
    try {
      return await this.model.findAll({ where: { role } });
    } catch (error) {
      throw new Error(`Error finding users by role: ${error}`);
    }
  }

  async findByAddress(address: string): Promise<User[]> {
    try {
      return await this.model.findAll({ where: { address } });
    } catch (error) {
      throw new Error(`Error finding users by address: ${error}`);
    }
  }

  async findByRoleAndAddress(role: string, address: string): Promise<User[]> {
    try {
      return await this.model.findAll({ where: { role, address } });
    } catch (error) {
      throw new Error(`Error finding users by role and address: ${error}`);
    }
  }

  async findByRoleAndEmail(role: string, email: string): Promise<User[]> {
    try {
      return await this.model.findAll({ where: { role, email } });
    } catch (error) {
      throw new Error(`Error finding users by role and email: ${error}`);
    }
  }

  async updateUser(id: number, userData: Partial<User>): Promise<User | null> {
    try {
      console.log('Updating user with ID:', id);
      console.log('User data to update:', userData);
  
      const [affectedRows] = await this.model.update(userData, {
        where: { id },
      });
  
      console.log('Affected rows:', affectedRows);
  
      if (affectedRows === 0) {
        console.log('No rows affected, possibly due to identical data.');
        return null;
      }
  
      // Fetch the updated user
      const updatedUser = await this.model.findByPk(id);
      console.log('Updated user:', updatedUser);
  
      return updatedUser;
    } catch (error: any) {
      console.error('Error in updateUser:', error);
      throw new Error(`Error updating user: ${error.message}`);
    }
  }
  

  async deleteUser(id: number): Promise<boolean> {
    try {
      const deletedRows = await this.model.destroy({ where: { id } });
      return deletedRows > 0;
    } catch (error) {
      throw new Error(`Error deleting user: ${error}`);
    }
  }

 
 
}
