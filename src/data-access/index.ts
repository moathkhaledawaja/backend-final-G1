import { User, UserRating } from "../models";
import { UserRepository } from "./UserRepository";
import { IUserRepository } from './Interfaces/IUserRepository';

import { CartRepository } from "./CartRepository";
import { ICartRepository } from './Interfaces/ICartRepository';
import { Cart } from "../models";
import { UserRatingRepository } from "./UserRatingRepository";
import { IUserRatingRepository } from './Interfaces/IUserRatingRepository';


export const userRepository = new UserRepository(User);
export const cartRepository = new CartRepository(Cart);
export const userRatingRepository = new UserRatingRepository(UserRating);

export {
    IUserRepository,
    ICartRepository,
    IUserRatingRepository
}
