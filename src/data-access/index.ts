import { User } from "../models";
import { UserRepository } from "./UserRepository";

export const userRepository = new UserRepository(User);
