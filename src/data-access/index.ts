import { User } from "../models";
import { UserRepository } from "./UserRepository";
import { IUserRepository } from './Interfaces/IUserRepository';

import { CartRepository} from "./CartRepository";
import { ICartRepository } from './Interfaces/ICartRepository';
import { Cart } from "../models";


export const userRepository = new UserRepository(User);
export const cartRepository = new CartRepository(Cart);


export {
    IUserRepository,
    ICartRepository
}
