import { UserRating } from '../models'
import { UserRatingDTO } from '../Types/DTO'
import { injectable } from 'tsyringe'
import { UserRatingRepository } from '../data-access/UserRatingRepository'
import logger from '../helpers/logger'
import { InternalServerError } from '../Errors/InternalServerError'

@injectable()
export class UserRatingService {
  private userRatingRepository: UserRatingRepository

  constructor(userRatingRepository: UserRatingRepository) {
    this.userRatingRepository = userRatingRepository
  }

  public async createUserRating(
    userId: number,
    productId: number,
    data: UserRatingDTO
  ): Promise<UserRatingDTO | null> {
    const { rating } = data
    const userRating = new UserRating()
    userRating.userId = userId
    userRating.productId = productId
    userRating.rating = rating
    try {
      const newUserRating = await this.userRatingRepository.create(userRating)
      return data
    } catch (error: any) {
      logger.error(error)
      throw new InternalServerError(
        'an error occurred, please try again later.'
      )
    }
  }

  public async findUserRatingsByProductId(productId: number): Promise<number> {
    try {
      const userRatings =
        await this.userRatingRepository.findAllByProductId(productId)
      if (!userRatings || userRatings.length === 0) {
        return 0
      }
      const rating =
        userRatings.reduce(
          (value, userRating) => value + userRating.dataValues.rating,
          0
        ) / userRatings.length
      return rating
    } catch (error: any) {
      logger.error(error)
      throw new InternalServerError(
        'an error occurred, please try again later.'
      )
    }
  }

  public async findUserRatingByUserIdAndProductId(
    userId: number,
    productId: number
  ): Promise<UserRatingDTO | null> {
    try {
      const userRating =
        await this.userRatingRepository.findByUserIdAndProductId(
          userId,
          productId
        )
      if (!userRating) {
        return null
      }
      const res: UserRatingDTO = { rating: userRating.toJSON().rating }
      return res
    } catch (error: any) {
      logger.error(error)
      throw new InternalServerError(
        'an error occurred, please try again later.'
      )
    }
  }

  public async updateUserRating(
    userId: number,
    productId: number,
    data: UserRatingDTO
  ): Promise<UserRatingDTO | null> {
    const { rating } = data
    const userRating = new UserRating()
    userRating.userId = userId
    userRating.rating = rating
    userRating.productId = productId
    try {
      const updatedUserRating =
        await this.userRatingRepository.update(userRating)
      if (!updatedUserRating) {
        return null
      }
      const updatedUserRatingDTO = {
        rating: updatedUserRating.dataValues.rating,
        userId,
      }
      return updatedUserRatingDTO
    } catch (error: any) {
      logger.error(error)
      throw new InternalServerError(
        'an error occurred, please try again later.'
      )
    }
  }
}
