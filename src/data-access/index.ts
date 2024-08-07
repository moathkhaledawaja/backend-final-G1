import { Order, User } from "../models";
import { UserRepository } from "./UserRepository";
import { OrderRepository } from "./OrderRepository";
export const userRepository = new UserRepository(User);
export const orderRepository = new OrderRepository(Order);
