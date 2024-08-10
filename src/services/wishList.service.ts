import { injectable } from "tsyringe";
import { WishlistRepository } from "../data-access/WishListRepository";
import { WishlistDTO } from "../DTO/wishlistDto";

@injectable()
export default class WishlistService {
  private wishlistRepository: WishlistRepository

  constructor(wishlistRepository: WishlistRepository) {
    this.wishlistRepository = wishlistRepository;
  }

  public async getWishlistByUserId(userId: number): Promise<WishlistDTO | null> {
    try {
      const wishlist = await this.wishlistRepository.findByUserId(userId);
      if (!wishlist) {
        return null;
      }
      return wishlist;
    }
    catch (error: any) {
      throw new Error(`Error retrieving the wishlist: ${error.message}`);

    }
  }



  public async addProductToWishlist(userId: number, productId: number): Promise<boolean> {
    try {
      return await this.wishlistRepository.addProductToWishlist(userId, productId);
    }
    catch (error: any) {
      throw new Error(`Error Adding the product: ${error.message}`);

    }
  }

  public async clearWishList(id: number): Promise<boolean> {
    try {

      return await this.wishlistRepository.clearWishList(id);
    }
    catch (error: any) {
      throw new Error(`clearing the wishlist: ${error.message}`);

    }
  }

  public async removeProductFromWishList(userId: number, productId: number): Promise<boolean> {
    try {
      return await this.wishlistRepository.removeProductFromWishList(userId, productId);

    }
    catch (error: any) {
      throw new Error(`Error removing the product: ${error.message}`);

    }
  }

}

