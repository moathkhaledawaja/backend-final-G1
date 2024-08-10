import { Router } from "express";
import { container } from "tsyringe";
import { CommentController } from "../controllers";

const commentRouter = Router();
const commentController = container.resolve(CommentController);

commentRouter.post("/", commentController.createComment.bind(commentController));
commentRouter.put("/:id", commentController.updateComment.bind(commentController));
commentRouter.delete("/:id", commentController.deleteComment.bind(commentController));

export default commentRouter;