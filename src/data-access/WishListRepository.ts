import { Wishlist } from "../models";
import { IWishlistRepository as IWishlistRepository } from "./Interfaces/IWishListRepository";
import { RepositoryBase } from "./RepositoryBase";

export class WishlistRepository
  extends RepositoryBase<Wishlist>
  implements IWishlistRepository {
  async findByUserId(userId: number): Promise<Wishlist | null> {
    return await Wishlist.findOne({ where: { userId } });
  }

}

