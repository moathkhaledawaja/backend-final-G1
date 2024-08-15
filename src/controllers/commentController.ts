import { CommentService } from "../services";
import { CommentDTO } from "../Types/DTO";
import { Comment } from "../models";
import { injectable, inject } from "tsyringe";
import { Request as Req, Request, Response as Res, Response } from "express";

@injectable()
export class CommentController {
  constructor(@inject(CommentService) private commentService: CommentService) {}

  public async createComment(
    req: Request,
    res: Response
  ): Promise<CommentDTO | null> {
    try {
      const commentData: CommentDTO = req.body;
      const userId = (req as any).user.userId;
      const comment = await this.commentService.createComment(
        userId,
        commentData
      );
      if (!comment) {
        res.status(404).send("product not found");
        return null;
      }
      res.status(201).json(comment);
      return comment;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async updateComment(
    req: Request,
    res: Response
  ): Promise<Comment | null> {
    try {
      const id = parseInt(req.params.id);
      const commentData: CommentDTO = req.body;
      const userId = (req as any).user.id;
      const comment = await this.commentService.updateComment(
        id,
        userId,
        commentData
      );
      if (!comment) {
        res.status(404);
        // to be implemented
        throw new Error("Comment not found");
      }
      return comment;
    } catch (error: any) {
      res.status(500);
      throw new Error(error.message);
    }
  }

  public async deleteComment(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);

      const userId = (req as any).user.id;
      await this.commentService.deleteComment(id, userId);
      res.status(204);
    } catch (error: any) {
      res.status(500);
      throw new Error(error.message);
    }
  }
}
