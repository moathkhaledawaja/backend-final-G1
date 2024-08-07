import { Comment, User } from "../models";
import { CommentRepository } from "./CommentRepository";
import { UserRepository } from "./UserRepository";

export const userRepository = new UserRepository(User);
export const commentRepository = new CommentRepository(Comment);
