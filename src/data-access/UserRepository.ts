import { User } from "../models";
import { IUserRepository } from "./Interfaces/IUserRepository";
import { RepositoryBase } from "./RepositoryBase";

export class UserRepository
  extends RepositoryBase<User>
  implements IUserRepository {

  async findByEmail(email: string): Promise<User | null> {
    console.log('Finding user with email:', email);
    const user = await this.model.findOne({ where: { email } });
    if (!user) {
      console.warn(`User not found with email: ${email}`);
    }
    return user;
  }

  async findByRole(role: string): Promise<User[]> {

    return await this.model.findAll({ where: { role } });

  }

  async findByAddress(address: string): Promise<User[]> {

    return await this.model.findAll({ where: { address } });

  }

  async findByRoleAndAddress(role: string, address: string): Promise<User[]> {
    return await this.model.findAll({ where: { role, address } });

  }

  async findByRoleAndEmail(role: string, email: string): Promise<User[]> {

    return await this.model.findAll({ where: { role, email } });
  }

  async updateUser(id: number, userData: Partial<User>): Promise<User | null> {

    const [affectedRows] = await this.model.update(userData, {
      where: { id },
    });

    if (affectedRows === 0) {
      console.log('No rows affected, possibly due to identical data.');
      return null;
    }
    const updatedUser = await this.model.findByPk(id);
    return updatedUser;
  }


  async deleteUser(id: number): Promise<boolean> {
    const deletedRows = await this.model.destroy({ where: { id } });
    return deletedRows > 0;
  }



}
