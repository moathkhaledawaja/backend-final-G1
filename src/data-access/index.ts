import {
  Brand,
  Cart,
  Category,
  Comment,
  Discount,
  Product,
  User,
  Order,
  Wishlist,
} from "../models";
import { CommentRepository } from "./CommentRepository";
import { UserRepository } from "./UserRepository";
import { CategoryRepository } from "./CategoryRepository";
import { CartRepository } from "./CartRepository";
import { ProductRepository } from "./ProductRepository";
import { WishlistRepository } from "./WishListRepository";
import { DiscountRepository } from "./DiscountRepository";
import { BrandRepository } from "./BrandRepository";
import { OrderRepository } from "./OrderRepository";

export const userRepository = new UserRepository(User);
export const cartRepository = new CartRepository(Cart);
export const commentRepository = new CommentRepository(Comment);
export const productRepository = new ProductRepository(Product);
export const categoryRepository = new CategoryRepository(Category);
export const discountCategpry = new DiscountRepository(Discount);
export const brandRepository = new BrandRepository(Brand);
export const orderRepository = new OrderRepository(Order);
export const wishlistRepository = new WishlistRepository(Wishlist);
