import { User, Wishlist } from "../models";
import { UserRepository } from "./UserRepository";
import { WishlistRepository } from "./WishListRepository";

export const userRepository = new UserRepository(User);
export const wishlistRepository = new WishlistRepository(Wishlist);
