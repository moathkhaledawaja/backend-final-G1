import logger from '../helpers/logger'
import { UserRating } from '../models'
import { IUserRatingRepository } from './Interfaces/IUserRatingRepository'
import { RepositoryBase } from './RepositoryBase'

export class UserRatingRepository
  extends RepositoryBase<UserRating>
  implements IUserRatingRepository
{
  async findAllByProductId(productId: number): Promise<UserRating[] | null> {
    return await UserRating.findAll({ where: { productId: productId } })
  }
  async findByUserIdAndProductId(
    userId: number,
    productId: number
  ): Promise<UserRating | null> {
    return await UserRating.findOne({
      where: { userId: userId, productId: productId },
    })
  }
}
