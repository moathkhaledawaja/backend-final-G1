import { Comment } from "../models";
import { CommentDTO } from "../Types/DTO/commentDto";
import { injectable } from "tsyringe";
import { commentRepository, productRepository } from "../data-access";
import { InternalServerError } from "../Errors/InternalServerError";
@injectable()
export default class CommentService {
  /**
   *
   * @param {number} userId Id of the user creating the comment.
   * @param {CommentDTO} data data associated with the comment.
   * @returns {Comment} when it successfully creates a comment.
   * @returns {null} null when the product isn't found.
   * @throws {InternalServerError} InternalServerError when fails to continue the request.
   */
  public async createComment(
    userId: number,
    data: CommentDTO
  ): Promise<CommentDTO | null> {
    try {
      const { content, productId } = data;

      const status = await productRepository.GetProduct(productId);
      if (!status) return null;

      const newComment = new Comment();
      newComment.userId = userId;
      newComment.content = content;
      newComment.productId = productId;

      return await commentRepository.create(newComment);
    } catch (error: any) {
      throw new InternalServerError("an error occured, please try again later");
    }
  }

  public async getCommentsByProductId(
    productId: number
  ): Promise<CommentDTO[] | null> {
    try {
      const comments = await commentRepository.findByProductId(productId);
      if (!comments) {
        return null;
      }
      const commentsJSON = comments.map((comment) => comment.toJSON());
      const commentsDTO: CommentDTO[] = commentsJSON;
      return commentsDTO;
    } catch (error: any) {
      throw new Error(
        `Could not create a retrieve the Comments ${error.message}`
      );
    }
  }

  public async getCommentById(id: number): Promise<CommentDTO | null> {
    try {
      const comment = await commentRepository.findById(id);
      if (!comment) {
        return null;
      }
      const comm: CommentDTO = comment.toJSON();
      return comm;
    } catch (error: any) {
      throw new Error(
        `Could not create a retrieve the Comments ${error.message}`
      );
    }
  }

  public async updateComment(
    id: number,
    userId: number,
    data: Partial<CommentDTO>
  ): Promise<Comment | null> {
    const comment = new Comment();
    comment.id = id;
    comment.userId = id;
    if (data.content) comment.content = data.content;
    try {
      const updatedComment = await commentRepository.update(comment);
      if (!updatedComment) {
        return null;
      }
      const commentJson = updatedComment.toJSON();
      return commentJson;
    } catch (error: any) {
      throw new Error(`Could not create a update the Comment ${error.message}`);
    }
  }

  public async deleteComment(id: number, userId: number): Promise<boolean> {
    try {
      return await commentRepository.delete(id);
    } catch (error: any) {
      throw new Error(`Could not create a update the Comment ${error.message}`);
    }
  }
}
