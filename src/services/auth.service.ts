// authService.ts

import UserService from './user.service'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { User } from '../models'
import { injectable, inject } from 'tsyringe'
import { addToBlacklist, isTokenBlacklisted } from '../helpers/tokenBlacklist'

@injectable()
export default class AuthService {
<<<<<<< HEAD
    constructor(@inject(UserService) private userService: UserService) { }
=======
  constructor(@inject(UserService) private userService: UserService) {}
>>>>>>> 1f8bb9c4819c5d54b0eccbea6d806dc8fce1c0e9

  public async login(email: string, password: string): Promise<string> {
    const user = await this.userService.getUserByEmail(email)

    if (!user) {
      throw new Error('Invalid credentials')
    }

<<<<<<< HEAD
    public async register(
        name: string,
        email: string,
        password: string,
    ): Promise<User> {
        const existingUser = await this.userService.getUserByEmail(email);
        if (existingUser) {
            throw new Error('User already exists');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = { name, email, address: "put address", password: hashedPassword, role: 'user' };
        return await this.userService.createUser(newUser);
=======
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      throw new Error('Invalid credentials')
>>>>>>> 1f8bb9c4819c5d54b0eccbea6d806dc8fce1c0e9
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET || 'jwt_secret',
      { expiresIn: '7d' }
    )

    return token
  }

  public async register(
    name: string,
    email: string,
    address: string,
    password: string
  ): Promise<User> {
    const existingUser = await this.userService.getUserByEmail(email)
    if (existingUser) {
      throw new Error('User already exists')
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = {
      name,
      email,
      password: hashedPassword,
      address,
      role: 'user',
    }
    return await this.userService.createUser(newUser)
  }

  public async logout(token: string): Promise<void> {
    if (!isTokenBlacklisted(token)) {
      addToBlacklist(token)
    }
  }
}
