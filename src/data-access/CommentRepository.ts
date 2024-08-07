import { Comment } from "../models";
import { ICommentRepository } from "./Interfaces/ICommentRepository";
import { RepositoryBase } from "./RepositoryBase";

export class CommentRepository
  extends RepositoryBase<Comment>
  implements ICommentRepository {
  async findByProductId(productId: number): Promise<Comment[] | null> {
    return await Comment.findAll({ where: { productId } });
  }
  async findAll(): Promise<Comment[]> {
    // to be implemented...
    throw new Error("NOT IMPLEMENTED YET.");
  }
}
