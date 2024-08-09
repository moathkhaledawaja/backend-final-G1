import { Order, User, Cart } from "../models";
import { UserRepository } from "./UserRepository";
import { OrderRepository } from "./OrderRepository";
import { ICartRepository } from './Interfaces/ICartRepository';
import { IUserRepository } from './Interfaces/IUserRepository';
import { IOrderRepository } from "./Interfaces/IOrderRepository";
import { CartRepository } from "./CartRepository";


export const userRepository = new UserRepository(User);
export const cartRepository = new CartRepository(Cart);
export const orderRepository = new OrderRepository(Order);


export {
    IUserRepository,
    ICartRepository,
    IOrderRepository
}
