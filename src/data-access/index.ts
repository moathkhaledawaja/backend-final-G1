import { Cart, Category, Comment, Discount, Product, User } from "../models";
import { CommentRepository } from "./CommentRepository";
import { UserRepository } from "./UserRepository";
import { CategoryRepository } from "./CategoryRepository";
import { CartRepository } from "./CartRepository";
import { ProductRepository } from "./ProductRepository";
import { DiscountRepository } from "./DiscountRepository";


export const userRepository = new UserRepository(User);
export const cartRepository = new CartRepository(Cart);
export const commentRepository = new CommentRepository(Comment);
export const productRepository = new ProductRepository(Product);
export const categoryRepository = new CategoryRepository(Category);
export const discountCategpry = new DiscountRepository(Discount);
