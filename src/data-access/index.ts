import { User, Wishlist, Cart } from "../models";
import { UserRepository } from "./UserRepository";
import { IUserRepository } from './Interfaces/IUserRepository';
import { CartRepository } from "./CartRepository";
import { ICartRepository } from './Interfaces/ICartRepository';
import { WishlistRepository } from "./WishListRepository";
import { IWishlistRepository } from "./Interfaces/IWishListRepository";


export const userRepository = new UserRepository(User);
export const cartRepository = new CartRepository(Cart);
export const wishlistRepository = new WishlistRepository(Wishlist);


export {
    IUserRepository,
    ICartRepository,
    IWishlistRepository
}
