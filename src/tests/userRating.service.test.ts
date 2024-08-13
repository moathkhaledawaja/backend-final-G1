import { UserRatingService } from '../services/userRating.service';
import { UserRatingRepository } from '../data-access/UserRatingRepository';
import { UserRatingDTO } from '../DTO';
import { UserRating } from '../models';
import { mock, MockProxy } from 'jest-mock-extended';

jest.mock('../models/UserRating.model.ts');

describe('UserRatingService', () => {
  let userRatingService: UserRatingService;
  let userRatingRepository: MockProxy<UserRatingRepository>;
  let MockedUserRating: jest.Mocked<typeof UserRating>;

  beforeEach(() => {
    userRatingRepository = mock<UserRatingRepository>();
    userRatingService = new UserRatingService(userRatingRepository);
    MockedUserRating = UserRating as jest.Mocked<typeof UserRating>;
  });

  describe('createUserRating', () => {
    it('should create a new user rating and return the data', async () => {
      const userId = 1;
      const productId = 123;
      const data: UserRatingDTO = { rating: 4.5 };
      userRatingRepository.create.mockResolvedValue({ dataValues: { rating: 4.5 } } as unknown as UserRating);
      const result = await userRatingService.createUserRating(userId, productId, data);

      expect(result).toEqual(data);
    });

    it('should throw an error if the user rating cannot be created', async () => {
      const userId = 1;
      const productId = 123;
      const data: UserRatingDTO = { rating: 4.5 };

      userRatingRepository.create.mockRejectedValue(new Error('Database error'));

      await expect(userRatingService.createUserRating(userId, productId, data)).rejects.toThrow(
        'Could not create a new UserRating Database error'
      );
    });
  });

  describe('findUserRatingsByProductId', () => {
    it('should return the average rating for a given productId', async () => {
      const productId = 123;
      const ratings = [
        { dataValues: { rating: 4.5 } } as unknown as UserRating,
        { dataValues: { rating: 3.5 } } as unknown as UserRating,
      ];

      userRatingRepository.findAllByProductId.mockResolvedValue(ratings);

      const result = await userRatingService.findUserRatingsByProductId(productId);

      expect(userRatingRepository.findAllByProductId).toHaveBeenCalledWith(productId);
      expect(result).toEqual(4.0); // Average of 4.5 and 3.5
    });

    it('should return 0 if no ratings are found', async () => {
      const productId = 123;

      userRatingRepository.findAllByProductId.mockResolvedValue(null);

      const result = await userRatingService.findUserRatingsByProductId(productId);

      expect(result).toEqual(0);
    });

    it('should throw an error if there is an issue retrieving the ratings', async () => {
      const productId = 123;

      userRatingRepository.findAllByProductId.mockRejectedValue(new Error('Database error'));

      await expect(userRatingService.findUserRatingsByProductId(productId)).rejects.toThrow(
        'Could not create a retrieve the ratings Database error'
      );
    });
  });

  describe('findUserRatingByUserIdAndProductId', () => {
    it('should return a user rating for a given userId and productId', async () => {
      const userId = 1;
      const productId = 123;
      const rating = { toJSON: jest.fn().mockReturnValue({ rating: 4.5 }) } as unknown as UserRating;

      userRatingRepository.findByUserIdAndProductId.mockResolvedValue(rating);

      const result = await userRatingService.findUserRatingByUserIdAndProductId(userId, productId);

      expect(userRatingRepository.findByUserIdAndProductId).toHaveBeenCalledWith(userId, productId);
      expect(result).toEqual({ rating: 4.5 });
    });

    it('should return null if the rating is not found', async () => {
      const userId = 1;
      const productId = 123;

      userRatingRepository.findByUserIdAndProductId.mockResolvedValue(null);

      const result = await userRatingService.findUserRatingByUserIdAndProductId(userId, productId);

      expect(result).toBeNull();
    });

    it('should throw an error if there is an issue retrieving the rating', async () => {
      const userId = 1;
      const productId = 123;

      userRatingRepository.findByUserIdAndProductId.mockRejectedValue(new Error('Database error'));

      await expect(userRatingService.findUserRatingByUserIdAndProductId(userId, productId)).rejects.toThrow(
        'Could not create a retrieve the Comments Database error'
      );
    });
  });

  describe('updateUserRating', () => {
    it('should update a user rating and return the updated rating', async () => {
      const userId = 1;
      const productId = 123;
      const data: UserRatingDTO = { rating: 4.0 };
      const updatedUserRating = { dataValues: { rating: 4.0 } } as unknown as UserRating;

      userRatingRepository.update.mockResolvedValue(updatedUserRating);

      const result = await userRatingService.updateUserRating(userId, productId, data);

      expect(userRatingRepository.update).toHaveBeenCalledWith(expect.any(UserRating));
      expect(result).toEqual({ rating: 4.0, userId });
    });

    it('should return null if the rating cannot be updated', async () => {
      const userId = 1;
      const productId = 123;
      const data: UserRatingDTO = { rating: 4.0 };

      userRatingRepository.update.mockResolvedValue(null);

      const result = await userRatingService.updateUserRating(userId, productId, data);

      expect(result).toBeNull();
    });

    it('should throw an error if there is an issue updating the rating', async () => {
      const userId = 1;
      const productId = 123;
      const data: UserRatingDTO = { rating: 4.0 };

      userRatingRepository.update.mockRejectedValue(new Error('Database error'));

      await expect(userRatingService.updateUserRating(userId, productId, data)).rejects.toThrow(
        'Could not create a update the Comment Database error'
      );
    });
  });
});
