import logger from "../helpers/logger";
import { UserRating } from "../models";
import { IUserRatingsRepository } from "./Interfaces/IUserRatingsRepository";
import { RepositoryBase } from "./RepositoryBase";


export class UserRatingsRepository extends RepositoryBase<UserRating> implements IUserRatingsRepository {
  async findAllByProductId(productId: number): Promise<UserRating[] | null> {
    try {
      return await UserRating.findAll({ where: { productId: productId } });
    } catch (ex: any) {
      logger.error(ex);
    }
    return null;

  }
  async findByUserIdAndProductId(userId: number, productId: number): Promise<UserRating | null> {
    try {
      return await UserRating.findOne({ where: { userId: userId, productId: productId } });
    }
    catch (ex: any) {
      logger.error(ex);
    }
    return null;
  }
  findById(id: number): Promise<UserRating | null> {
    throw new Error("Method not implemented.");
  }
  findAll(): Promise<UserRating[]> {
    throw new Error("Method not implemented.");
  }
  delete(id: number): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
}