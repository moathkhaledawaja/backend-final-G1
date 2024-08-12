import { Post, Put, Delete, Route, Body, Path, SuccessResponse, Tags, Response } from 'tsoa';
import { CommentService } from '../services';
import { CommentDTO } from '../DTO';
import { Comment } from '../models';
import { injectable, inject } from 'tsyringe';
import { BaseController } from './BaseController/BaseController';
import { Request as Req, Response as Res } from 'express';

@Route('comments')
@Tags('Comment')
@injectable()
export class CommentController extends BaseController {
  constructor(@inject(CommentService) private commentService: CommentService, req: Req, res: Res) {
    super(req, res);
  }

  /**
   * Create a new comment
   * @param commentData - The data for the new comment
   * @returns The created comment
   */
  @Post()
  @SuccessResponse('201', 'Created')
  public async createComment(@Body() commentData: CommentDTO): Promise<CommentDTO | null> {
    try {
      const userId = (this.request as any).user.userId;
      const comment = await this.commentService.createComment(userId, commentData);
      this.setStatus(201);
      return comment;
    } catch (error: any) {
      this.setStatus(400);
      throw new Error(error.message);
    }
  }

  /**
   * Update an existing comment
   * @param id - The ID of the comment to update
   * @param commentData - The new data for the comment
   * @returns The updated comment
   */
  @Put('{id}')
  @SuccessResponse('200', 'Updated')
  @Response('404', 'Not Found')
  public async updateComment(@Path() id: number, @Body() commentData: CommentDTO): Promise<Comment | null> {
    try {
      const userId = (this.request as any).user.id;
      const comment = await this.commentService.updateComment(id, userId, commentData);
      if (!comment) {
        this.setStatus(404);
        throw new Error('Comment not found');
      }
      return comment;
    } catch (error: any) {
      this.setStatus(500);
      throw new Error(error.message);
    }
  }

  /**
   * Delete a comment
   * @param id - The ID of the comment to delete
   * @returns Success status
   */
  @Delete('{id}')
  @SuccessResponse('204', 'No Content')
  @Response('500', 'Server Error')
  public async deleteComment(@Path() id: number): Promise<void> {
    try {
      const userId = (this.request as any).user.id;
      await this.commentService.deleteComment(id, userId);
      this.setStatus(204);
    } catch (error: any) {
      this.setStatus(500);
      throw new Error(error.message);
    }
  }
}
