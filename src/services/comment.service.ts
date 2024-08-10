import { ICommentRepository } from '../data-access/Interfaces/ICommentRepository';
import { Comment } from '../models';
import { CommentDTO } from '../DTO/commentDto';

class CommentService {
  private commentRepository: ICommentRepository

  constructor(commentRepository: ICommentRepository) {
    this.commentRepository = commentRepository;
  }


  public async createComment(data: CommentDTO): Promise<CommentDTO | null> {
    const { userId, content, productId } = data;
    const newComment = new Comment();
    newComment.userId = userId;
    newComment.content = content;
    newComment.productId = productId;
    try {
      await this.commentRepository.create(newComment);
      return data;
    }
    catch (error: any) {
      throw new Error(`Could not create a new Comment ${error.message}`);
    }
  }

  public async getCommentsByProductId(productId: number): Promise<CommentDTO[] | null> {
    try {
      const comments = await this.commentRepository.findByProductId(productId);
      if (!comments) {
        return null;
      }
      const commentsJSON = comments.map((comment) => comment.toJSON());
      const commentsDTO: CommentDTO[] = commentsJSON;
      return commentsDTO;
    }
    catch (error: any) {
      throw new Error(`Could not create a retrieve the Comments ${error.message}`);

    }
  }


  public async getCommentById(id: number): Promise<CommentDTO | null> {
    try {
      const comment = await this.commentRepository.findById(id);
      if (!comment) {
        return null;
      }
      const comm: CommentDTO = comment.toJSON();
      return comm;
    }
    catch (error: any) {
      throw new Error(`Could not create a retrieve the Comments ${error.message}`);

    }
  }

  public async updateComment(id: number, data: Partial<CommentDTO>): Promise<Comment | null> {
    const comment = new Comment();
    comment.id = id;
    Object.keys(data).forEach((key) => {
      // @ts-ignore
      comment[key] = data[key];
    });
    try {
      const updatedComment = await this.commentRepository.update(comment);
      if (!updatedComment) {
        return null;
      }
      const commentJson = updatedComment.toJSON();
      return commentJson;
    }
    catch (error: any) {
      throw new Error(`Could not create a update the Comment ${error.message}`);

    }
  }

  public async deleteComment(id: number): Promise<boolean> {
    try {
      return await this.commentRepository.delete(id);
    }
    catch (error: any) {
      throw new Error(`Could not create a update the Comment ${error.message}`);

    }
  }

}

export default CommentService;
