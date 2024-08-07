import { Wishlist } from "../../models";
import { IRepositoryBase } from "./IRepositoryBase";

export interface IWishlistRepository extends IRepositoryBase<Wishlist> {
  findByUserId(userId: number): Promise<Wishlist | null>
}
