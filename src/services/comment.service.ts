import { ICommentRepository } from '../data-access/Interfaces/ICommentRepository';
import { Comment } from '../models';
import { commentRepository } from '../data-access';

class CommentService {
  static comment: ICommentRepository = commentRepository
  public static async createComment(data: Comment): Promise<Comment | null> {
    return await CommentService.comment.create(data);
  }

  public static async getCommentsByProductId(productId: number): Promise<Comment[] | null> {
    return await CommentService.comment.findByProductId(productId);
  }


  public static async getCommentById(id: number): Promise<Comment | null> {
    return await CommentService.comment.findById(id);
  }

  public static async updateComment(id: number, data: Partial<Comment>): Promise<Comment | null> {
    return await CommentService.comment.update(id, data)
  }

  public static async deleteComment(id: number): Promise<boolean> {
    return await CommentService.comment.delete(id);
  }

}

export default CommentService;
