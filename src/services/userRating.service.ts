

import { UserRating } from '../models';
import { userRatingDTO } from '../DTO';
import { injectable } from 'tsyringe';
import { UserRatingRepository } from '../data-access/UserRatingRepository';

@injectable()
export class UserRatingService {
  private userRatingRepository: UserRatingRepository

  constructor(userRatingRepository: UserRatingRepository) {
    this.userRatingRepository = userRatingRepository;
  }


  public async createUserRating(userId: number, data: userRatingDTO, productId: number): Promise<userRatingDTO | null> {
    const { rating } = data;
    const userRating = new UserRating();
    userRating.userId = userId;
    userRating.productId = productId;
    userRating.rating = rating;
    try {
      const newUserRating = await this.userRatingRepository.create(userRating);
      if (!newUserRating) {
        return null;
      }
      return data;
    }
    catch (error: any) {
      throw new Error(`Could not create a new UserRating ${error.message}`);
    }
  }

  public async findUserRatingsByProductId(productId: number): Promise<number> {
    try {
      const userRatings = await this.userRatingRepository.findAllByProductId(productId);
      if (!userRatings) {
        return 0;
      }
      const rating = userRatings.reduce((value, userRating) => value + userRating.dataValues.rating, 0) / userRatings.length;
      return rating;
    }
    catch (error: any) {
      throw new Error(`Could not create a retrieve the ratings ${error.message}`);

    }
  }


  public async findUserRatingByUserIdAndProductId(userId: number, productId: number): Promise<userRatingDTO | null> {
    try {
      const userRating = await this.userRatingRepository.findByUserIdAndProductId(userId, productId);
      if (!userRating) {
        return null;
      }
      const res: userRatingDTO = { rating: userRating.toJSON().rating, userId: userRating.toJSON().userId };
      return res;
    }
    catch (error: any) {
      throw new Error(`Could not create a retrieve the Comments ${error.message}`);

    }
  }

  public async updateUserRating(userId: number, data: userRatingDTO): Promise<userRatingDTO | null> {
    const { rating } = data;
    const userRating = new UserRating();
    userRating.userId = userId;
    userRating.rating = rating;
    try {
      const updatedUserRating = await this.userRatingRepository.update(userRating);
      if (!updatedUserRating) {
        return null;
      }
      const updatedUserRatingDTO = { rating: updatedUserRating.dataValues.rating, userId };
      return updatedUserRatingDTO;
    }
    catch (error: any) {
      throw new Error(`Could not create a update the Comment ${error.message}`);

    }
  }



}

