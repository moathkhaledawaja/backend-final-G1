import User from '../models/user.model';
import bcrypt from 'bcrypt';

class UserService {
    
    public static async createUser(data: Partial<User>): Promise<User> {
        const hashedPassword = await bcrypt.hash(data.password as string, 10);
        const userData = { ...data, password: hashedPassword };
        return await User.create(userData);
    }

    public static async getUserByEmail(email: string): Promise<User | null> {
        return await User.findOne({ where: { email } });
    }

    public static async getUsers(): Promise<User[]> {
        return await User.findAll({
            attributes: { exclude: ['password'] }
        });
    }

    public static async getUserById(id: number): Promise<User | null> {
        return await User.findByPk(id);
    }

    public static async updateUser(id: number, data: Partial<User>): Promise<User | null> {
        const user = await User.findByPk(id);
        if (user) {
            if (data.password) {
                data.password = await bcrypt.hash(data.password as string, 10);
            }
            await user.update(data);
            return user;
        }
        return null;
    }

    public static async deleteUser(id: number): Promise<number> {
        return await User.destroy({
            where: { id }
        });
    }

    public static async getUser(key: 'email' | 'username', value: string): Promise<User | null> {
        return await User.findOne({ where: { [key]: value } });
    }

    public static async verifyUser(email: string, password: string): Promise<User | null> {
        const user = await User.findOne({ where: { email } });
        if (user && await bcrypt.compare(password, user.password)) {
            return user;
        }
        return null;
    }
}

export default UserService;
