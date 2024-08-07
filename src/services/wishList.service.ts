import { Wishlist } from "../models";
import { wishlistRepository } from "../data-access";
import { IWishlistRepository } from "../data-access/Interfaces/IWishListRepository";

class WishlistService {
  static wishlist: IWishlistRepository = wishlistRepository;
  public static async createWishlist(data: Wishlist): Promise<Wishlist | null> {
    return await WishlistService.wishlist.create(data);
  }

  public static async getWishlistByUserId(userId: number): Promise<Wishlist | null> {
    return await WishlistService.wishlist.findByUserId(userId);
  }



  public static async updateWishlist(id: number, data: Partial<Wishlist>): Promise<Wishlist | null> {
    return await WishlistService.wishlist.update(data);
  }

  public static async deleteWishlist(id: number): Promise<number> {
    return await WishlistService.wishlist.delete(id);
  }


}

export default WishlistService;
