import { Request, Response } from 'express';
import { injectable, inject } from 'tsyringe';
import { CommentService } from '../services';
import { CommentDTO } from '../DTO';
import { Comment } from '../models';

@injectable()
export class CommentController {
  constructor(@inject(CommentService) private commentService: CommentService) { }

  async createComment(req: Request, res: Response): Promise<CommentDTO | null> {
    try {
      const userId = (req as any).user.userId;
      const commentData: CommentDTO = req.body;

      const comment = await this.commentService.createComment(userId, commentData);
      res.status(201).json(comment);
      return comment;
    } catch (error: any) {
      res.status(400).json({ error: error.message });
      throw error;
    }
  }



  async updateComment(req: Request, res: Response): Promise<Comment | null> {
    const userId = (req as any).user.id;
    const id = req.params.id;
    const commentData: CommentDTO = req.body;
    try {
      const comment = await this.commentService.updateComment(id, userId, commentData);
      if (!comment) {
        res.status(404).json({ error: 'Comment not found' });
        return null;
      }
      res.json(comment);
      return comment;
    } catch (error: any) {
      res.status(500).json({ error: error.message });
      throw error;
    }
  }

  async deleteComment(req: Request, res: Response): Promise<boolean> {
    try {
      const id = req.params.id;
      const userId = (req as any).user.id;
      const isDeleted = await this.commentService.deleteComment(id, userId);
      res.status(204).send(isDeleted);
      return isDeleted;
    } catch (error: any) {
      res.status(500).json({ error: error.message });
      throw error;
    }
  }

}