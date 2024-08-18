import { UserRatingService } from '../services/userRating.service';
import { UserRatingRepository } from '../data-access/UserRatingRepository';
import { UserRatingDTO } from '../Types/DTO';
import { mock, MockProxy } from 'jest-mock-extended';
import { UserRating } from '../models';

jest.mock('../models/UserRating.model.ts');

describe('UserRatingService', () => {
  let userRatingService: UserRatingService;
  let userRatingRepository: MockProxy<UserRatingRepository>;

  beforeEach(() => {
    userRatingRepository = mock<UserRatingRepository>();
    userRatingService = new UserRatingService(userRatingRepository);
  });

  describe('createUserRating', () => {
    it('should create and return a user rating', async () => {
      const userId = 1;
      const productId = 123;
      const ratingData: UserRatingDTO = { rating: 5 };
      const userRating = new UserRating();

      userRatingRepository.create.mockResolvedValue(userRating);

      const result = await userRatingService.createUserRating(userId, productId, ratingData);

      expect(userRatingRepository.create).toHaveBeenCalled();
      expect(result).toEqual(ratingData);
    });

    it('should throw an error if there is an issue creating the user rating', async () => {
      const userId = 1;
      const productId = 123;
      const ratingData: UserRatingDTO = { rating: 5 };

      userRatingRepository.create.mockRejectedValue(new Error('Database error'));

      await expect(userRatingService.createUserRating(userId, productId, ratingData)).rejects.toThrow(
        'an error occurred, please try again later.'
      );
    });
  });

  describe('findUserRatingsByProductId', () => {
    it('should return the average rating for a given productId', async () => {
      const productId = 123;
      const userRatings = [{ dataValues: { rating: 4 } }, { dataValues: { rating: 5 } }] as UserRating[];

      userRatingRepository.findAllByProductId.mockResolvedValue(userRatings);

      const result = await userRatingService.findUserRatingsByProductId(productId);

      expect(userRatingRepository.findAllByProductId).toHaveBeenCalledWith(productId);
      expect(result).toBe(4.5);
    });

    it('should return 0 if no ratings are found', async () => {
      const productId = 123;

      userRatingRepository.findAllByProductId.mockResolvedValue(null);

      const result = await userRatingService.findUserRatingsByProductId(productId);

      expect(result).toBe(0);
    });

    it('should throw an error if there is an issue retrieving the ratings', async () => {
      const productId = 123;

      userRatingRepository.findAllByProductId.mockRejectedValue(new Error('Database error'));

      await expect(userRatingService.findUserRatingsByProductId(productId)).rejects.toThrow(
        'an error occurred, please try again later.'
      );
    });
  });

  describe('findUserRatingByUserIdAndProductId', () => {
    it('should return the user rating for a given userId and productId', async () => {
      const userId = 1;
      const productId = 123;
      const userRating = new UserRating();
      userRating.rating = 5;

      userRatingRepository.findByUserIdAndProductId.mockResolvedValue(userRating);

      const result = await userRatingService.findUserRatingByUserIdAndProductId(userId, productId);

      expect(userRatingRepository.findByUserIdAndProductId).toHaveBeenCalledWith(userId, productId);
      expect(result).toEqual({ rating: 5 });
    });

    it('should return null if no rating is found', async () => {
      const userId = 1;
      const productId = 123;

      userRatingRepository.findByUserIdAndProductId.mockResolvedValue(null);

      const result = await userRatingService.findUserRatingByUserIdAndProductId(userId, productId);

      expect(result).toBeNull();
    });

    it('should throw an error if there is an issue retrieving the user rating', async () => {
      const userId = 1;
      const productId = 123;

      userRatingRepository.findByUserIdAndProductId.mockRejectedValue(new Error('Database error'));

      await expect(userRatingService.findUserRatingByUserIdAndProductId(userId, productId)).rejects.toThrow(
        'an error occurred, please try again later.'
      );
    });
  });

  describe('updateUserRating', () => {
    it('should update and return the updated user rating', async () => {
      const userId = 1;
      const productId = 123;
      const ratingData: UserRatingDTO = { rating: 4 };
      const userRating = new UserRating();

      userRatingRepository.update.mockResolvedValue(userRating);

      const result = await userRatingService.updateUserRating(userId, productId, ratingData);

      expect(userRatingRepository.update).toHaveBeenCalled();
      expect(result).toEqual({ rating: 4, userId });
    });

    it('should return null if the rating cannot be updated', async () => {
      const userId = 1;
      const productId = 123;
      const ratingData: UserRatingDTO = { rating: 4 };

      userRatingRepository.update.mockResolvedValue(null);

      const result = await userRatingService.updateUserRating(userId, productId, ratingData);

      expect(result).toBeNull();
    });

    it('should throw an error if there is an issue updating the user rating', async () => {
      const userId = 1;
      const productId = 123;
      const ratingData: UserRatingDTO = { rating: 4 };

      userRatingRepository.update.mockRejectedValue(new Error('Database error'));

      await expect(userRatingService.updateUserRating(userId, productId, ratingData)).rejects.toThrow(
        'an error occurred, please try again later.'
      );
    });
  });
});
