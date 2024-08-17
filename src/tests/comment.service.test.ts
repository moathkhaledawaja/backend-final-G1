import { CommentService } from "../services";
import { CommentRepository } from "../data-access/CommentRepository";
import { CommentDTO } from "../Types/DTO/commentDto";
import { Comment } from "../models";
import { mock, MockProxy } from "jest-mock-extended";

jest.mock("../models/Comment.model.ts");

describe("CommentService", () => {
  let commentService: CommentService;
  let commentRepository: MockProxy<CommentRepository>;
  let MockedComment: jest.Mocked<typeof Comment>;

  beforeEach(() => {
    commentRepository = mock<CommentRepository>();
    commentService = new CommentService();
    MockedComment = Comment as jest.Mocked<typeof Comment>;
  });

  describe("createComment", () => {
    // it("should create a new comment and return the data", async () => {
    //   const userId = 1;
    //   const data: CommentDTO = { content: "Test comment", productId: 123 };
    //   const result = await commentService.createComment(userId, data);
    //   expect(result).toEqual(data);
    // });
    // it("should throw an error if the comment cannot be created", async () => {
    //   const userId = 1;
    //   const data: CommentDTO = { content: "Test comment", productId: 123 };
    //   commentRepository.create.mockRejectedValue(new Error("Database error"));
    //   await expect(commentService.createComment(userId, data)).rejects.toThrow(
    //     "Could not create a new Comment Database error"
    //   );
    // });
  });

  describe("getCommentsByProductId", () => {
    it("should return comments for a given productId", async () => {
      const productId = 123;
      const comments = [
        { toJSON: jest.fn().mockReturnValue({}) } as unknown as Comment,
        { toJSON: jest.fn().mockReturnValue({}) } as unknown as Comment,
      ];

      commentRepository.findByProductId.mockResolvedValue(comments);

      const result = await commentService.getCommentsByProductId(productId);

      expect(commentRepository.findByProductId).toHaveBeenCalledWith(productId);
      expect(result).toEqual(comments.map((comment) => comment.toJSON()));
    });

    // it("should return null if no comments are found", async () => {
    //   const productId = 123;

    //   commentRepository.findByProductId.mockResolvedValue(null);

    //   const result = await commentService.getCommentsByProductId(productId);

    //   expect(result).toBeNull();
    // });

    it("should throw an error if there is an issue retrieving comments", async () => {
      const productId = 123;

      commentRepository.findByProductId.mockRejectedValue(
        new Error("Database error")
      );

      await expect(
        commentService.getCommentsByProductId(productId)
      ).rejects.toThrow(
        "Could not create a retrieve the Comments Database error"
      );
    });
  });

  describe("getCommentById", () => {
    it("should return a comment by id", async () => {
      const commentId = 1;
      const comment = {
        toJSON: jest.fn().mockReturnValue({}),
      } as unknown as Comment;

      commentRepository.findById.mockResolvedValue(comment);

      const result = await commentService.getCommentById(commentId);

      expect(commentRepository.findById).toHaveBeenCalledWith(commentId);
      expect(result).toEqual(comment.toJSON());
    });

    it("should return null if the comment is not found", async () => {
      const commentId = 1;

      commentRepository.findById.mockResolvedValue(null);

      const result = await commentService.getCommentById(commentId);

      expect(result).toBeNull();
    });

    it("should throw an error if there is an issue retrieving the comment", async () => {
      const commentId = 1;

      commentRepository.findById.mockRejectedValue(new Error("Database error"));

      await expect(commentService.getCommentById(commentId)).rejects.toThrow(
        "Could not create a retrieve the Comments Database error"
      );
    });
  });

  describe("updateComment", () => {
    it("should update a comment and return the updated comment", async () => {
      const commentId = 1;
      const userId = 1;
      const data: Partial<CommentDTO> = { content: "Updated comment" };
      const updatedComment = {
        toJSON: jest.fn().mockReturnValue({}),
      } as unknown as Comment;

      commentRepository.update.mockResolvedValue(updatedComment);

      const result = await commentService.updateComment(
        commentId,
        userId,
        data
      );

      expect(commentRepository.update).toHaveBeenCalledWith(
        expect.any(Comment)
      );
      expect(result).toEqual(updatedComment.toJSON());
    });

    it("should return null if the comment cannot be updated", async () => {
      const commentId = 1;
      const userId = 1;
      const data: Partial<CommentDTO> = { content: "Updated comment" };

      commentRepository.update.mockResolvedValue(null);

      const result = await commentService.updateComment(
        commentId,
        userId,
        data
      );

      expect(result).toBeNull();
    });

    it("should throw an error if there is an issue updating the comment", async () => {
      const commentId = 1;
      const userId = 1;
      const data: Partial<CommentDTO> = { content: "Updated comment" };

      commentRepository.update.mockRejectedValue(new Error("Database error"));

      await expect(
        commentService.updateComment(commentId, userId, data)
      ).rejects.toThrow("Could not create a update the Comment Database error");
    });
  });

  describe("deleteComment", () => {
    it("should delete a comment and return true if successful", async () => {
      const commentId = 1;
      commentRepository.delete.mockResolvedValue(true);

      const result = await commentService.deleteComment(commentId, 1);

      expect(commentRepository.delete).toHaveBeenCalledWith(commentId);
      expect(result).toBe(true);
    });

    it("should return false if the comment cannot be deleted", async () => {
      const commentId = 1;
      commentRepository.delete.mockResolvedValue(false);

      const result = await commentService.deleteComment(commentId, 1);

      expect(result).toBe(false);
    });

    it("should throw an error if there is an issue deleting the comment", async () => {
      const commentId = 1;

      commentRepository.delete.mockRejectedValue(new Error("Database error"));

      await expect(commentService.deleteComment(commentId, 1)).rejects.toThrow(
        "Could not create a update the Comment Database error"
      );
    });
  });
});
