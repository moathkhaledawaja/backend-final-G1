import { CommentService } from "../services";
import { CommentDTO } from "../Types/DTO";
import { injectable, inject } from "tsyringe";
import { Request, Response } from "express";

@injectable()
export class CommentController {
  constructor(@inject(CommentService) private commentService: CommentService) {}

  public async createComment(req: Request, res: Response) {
    try {
      const commentData: CommentDTO = req.body;
      const { id } = req.user;

      const comment = await this.commentService.createComment(id, commentData);
      if (!comment) {
        return res.status(404).send("product not found");
      }
      return res.status(201).json(comment);
    } catch (error: any) {
      return res
        .status(500)
        .json({ error: "Internal server error, please try again alter" });
    }
  }

  public async updateComment(req: Request, res: Response) {
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

  public async deleteComment(req: Request, res: Response) {
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
