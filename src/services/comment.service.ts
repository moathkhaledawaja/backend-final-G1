import Comment from '../models/comment.model';
import bcrypt from 'bcrypt';

class UserService {

  public static async createComment(data: Partial<Comment>): Promise<Comment> {
    const commentData = { data };
    return await Comment.create(commentData);
  }

  public static async getCommentsByProductId(productId: number): Promise<Comment | null> {
    return await Comment.findAll({ where: { productId } });
  }


  public static async getCommentById(id: number): Promise<Comment | null> {
    return await Comment.findByPk(id);
  }

  public static async updateComment(id: number, data: Partial<Comment>): Promise<Comment | null> {
    const comment = await Comment.findByPk(id);
    if (comment) {
      await comment.update(data);
      return comment;
    }
    return null;
  }

  public static async deleteComment(id: number): Promise<number> {
    return await Comment.destroy({
      where: { id }
    });
  }

}

export default UserService;
