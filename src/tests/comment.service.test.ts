import 'reflect-metadata';
import { CommentService } from '../services/comment.service';
import { CommentRepository } from '../data-access/CommentRepository';
import { CommentDTO } from '../DTO/commentDto';
import { Comment } from '../models';

jest.mock('../data-access/CommentRepository');

describe('CommentService', () => {
  let commentService: CommentService;
  let commentRepository: jest.Mocked<CommentRepository>;

  beforeEach(() => {
    commentRepository = new CommentRepository() as jest.Mocked<CommentRepository>;
    commentService = new CommentService(commentRepository);
  });

  describe('createComment', () => {
    it('should create a new comment and return the data', async () => {
      const userId = 1;
      const data: CommentDTO = { content: 'Test Comment', productId: 1 };
      commentRepository.create.mockResolvedValue(new Comment());

      const result = await commentService.createComment(userId, data);

      expect(commentRepository.create).toHaveBeenCalledWith(expect.any(Comment));
      expect(result).toEqual(data);
    });

    it('should throw an error if creation fails', async () => {
      const userId = 1;
      const data: CommentDTO = { content: 'Test Comment', productId: 1 };
      commentRepository.create.mockRejectedValue(new Error('Creation failed'));

      await expect(commentService.createComment(userId, data)).rejects.toThrow('Could not create a new Comment Creation failed');
    });
  });

  describe('getCommentsByProductId', () => {
    it('should return a list of comments for a product', async () => {
      const productId = 1;
      const comments = [new Comment()];
      commentRepository.findByProductId.mockResolvedValue(comments);
      comments[0].toJSON = jest.fn().mockReturnValue({ content: 'Test Comment', productId: 1 });

      const result = await commentService.getCommentsByProductId(productId);

      expect(commentRepository.findByProductId).toHaveBeenCalledWith(productId);
      expect(result).toEqual([{ content: 'Test Comment', productId: 1 }]);
    });

    it('should return null if no comments found', async () => {
      const productId = 1;
      commentRepository.findByProductId.mockResolvedValue(null);

      const result = await commentService.getCommentsByProductId(productId);

      expect(result).toBeNull();
    });

    it('should throw an error if retrieval fails', async () => {
      const productId = 1;
      commentRepository.findByProductId.mockRejectedValue(new Error('Retrieval failed'));

      await expect(commentService.getCommentsByProductId(productId)).rejects.toThrow('Could not create a retrieve the Comments Retrieval failed');
    });
  });

  describe('getCommentById', () => {
    it('should return a comment by id', async () => {
      const id = 1;
      const comment = new Comment();
      comment.toJSON = jest.fn().mockReturnValue({ content: 'Test Comment', productId: 1 });
      commentRepository.findById.mockResolvedValue(comment);

      const result = await commentService.getCommentById(id);

      expect(commentRepository.findById).toHaveBeenCalledWith(id);
      expect(result).toEqual({ content: 'Test Comment', productId: 1 });
    });

    it('should return null if no comment found', async () => {
      const id = 1;
      commentRepository.findById.mockResolvedValue(null);

      const result = await commentService.getCommentById(id);

      expect(result).toBeNull();
    });

    it('should throw an error if retrieval fails', async () => {
      const id = 1;
      commentRepository.findById.mockRejectedValue(new Error('Retrieval failed'));

      await expect(commentService.getCommentById(id)).rejects.toThrow('Could not create a retrieve the Comments Retrieval failed');
    });
  });

  describe('updateComment', () => {
    it('should update a comment and return the updated comment', async () => {
      const id = 1;
      const userId = 1;
      const data: Partial<CommentDTO> = { content: 'Updated Comment' };
      const updatedComment = new Comment();
      updatedComment.toJSON = jest.fn().mockReturnValue({ content: 'Updated Comment', productId: 1 });
      commentRepository.update.mockResolvedValue(updatedComment);

      const result = await commentService.updateComment(id, userId, data);

      expect(commentRepository.update).toHaveBeenCalledWith(expect.any(Comment));
      expect(result).toEqual({ content: 'Updated Comment', productId: 1 });
    });

    it('should return null if the update fails', async () => {
      const id = 1;
      const userId = 1;
      const data: Partial<CommentDTO> = { content: 'Updated Comment' };
      commentRepository.update.mockResolvedValue(null);

      const result = await commentService.updateComment(id, userId, data);

      expect(result).toBeNull();
    });

    it('should throw an error if update fails', async () => {
      const id = 1;
      const userId = 1;
      const data: Partial<CommentDTO> = { content: 'Updated Comment' };
      commentRepository.update.mockRejectedValue(new Error('Update failed'));

      await expect(commentService.updateComment(id, userId, data)).rejects.toThrow('Could not create a update the Comment Update failed');
    });
  });

  describe('deleteComment', () => {
    it('should delete a comment and return true', async () => {
      const id = 1;
      const userId = 1;
      commentRepository.delete.mockResolvedValue(true);

      const result = await commentService.deleteComment(id, userId);

      expect(commentRepository.delete).toHaveBeenCalledWith(id);
      expect(result).toBe(true);
    });

    it('should throw an error if deletion fails', async () => {
      const id = 1;
      const userId = 1;
      commentRepository.delete.mockRejectedValue(new Error('Deletion failed'));

      await expect(commentService.deleteComment(id, userId)).rejects.toThrow('Could not create a update the Comment Deletion failed');
    });
  });
});
