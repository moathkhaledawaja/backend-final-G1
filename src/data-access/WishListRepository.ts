import logger from "../helpers/logger";
import { Product, Wishlist } from "../models";
import { IWishlistRepository as IWishlistRepository } from "./Interfaces/IWishListRepository";
import { RepositoryBase } from "./RepositoryBase";

export class WishlistRepository
  extends RepositoryBase<Wishlist>
  implements IWishlistRepository {
  async clearWishList(userId: number): Promise<boolean> {
    try {

      const wishlist = await Wishlist.findOne({ where: { userId } });
      if (!wishlist) {
        logger.error("USER Doesn't have a wishlist");
        throw new Error("User doesn't  have a wishlist.");
      }
      await wishlist.$set("products", []);
      return true;
    }
    catch (error) {
      console.log(error);
    }
    return false;
  }
  async removeProductFromWishList(userId: number, productId: number): Promise<boolean> {
    try {
      const wishlist = await Wishlist.findOne({ where: { userId } });
      if (!wishlist) {
        logger.error("USER Doesn't have a wishlist");
        throw new Error("User doesn't  have a wishlist.");
      }
      const product = await Product.findByPk(productId);
      if (!product) {
        throw new Error("Product doesn't exist");
      }
      await wishlist.$remove("products", productId);
      return true;

    }
    catch (error) {
      console.log(error);
    }
    return false;
  }
  async addProductToWishlist(userId: number, productId: number): Promise<boolean> {
    try {
      const wishlist = await Wishlist.findOne({ where: { userId } });
      if (!wishlist) {
        logger.error("USER Doesn't have a wishlist");
        throw new Error("User doesn't  have a wishlist.");
      }
      const product = await Product.findByPk(productId);
      if (!product) {
        throw new Error("Product doesn't exist");
      }
      await wishlist.$add("products", productId);
      return true;

    }
    catch (error) {
      console.log(error);
    }
    return false;
  }
  async findByUserId(userId: number): Promise<Wishlist | null> {
    try {
      return await Wishlist.findOne({
        where: { userId }, include: [
          {
            attributes: ["name", "description", "price", "stock", "brand"],
            model: Product
          }
        ]
      });
    }
    catch (error) {
      console.log(error);
    }
    return null;
  }
}

