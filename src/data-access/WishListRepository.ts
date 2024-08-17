import logger from "../helpers/logger";
import { Product, Wishlist } from "../models";
import { IWishlistRepository as IWishlistRepository } from "./Interfaces/IWishListRepository";
import { RepositoryBase } from "./RepositoryBase";

export class WishlistRepository
  extends RepositoryBase<Wishlist>
  implements IWishlistRepository {
  async clearWishList(userId: number): Promise<boolean> {
    const wishlist = await this.model.findOne({ where: { userId } });
    await wishlist!.$set("products", []);
    return true;
  }
  async removeProductFromWishList(userId: number, productId: number): Promise<boolean> {
    const wishlist = await Wishlist.findOne({ where: { userId } });
    const product = await Product.findByPk(productId);
    if (!product) {
      logger.error(`Product #${productId} doesn't exist`);
      return false;
    }
    await wishlist!.$remove("products", productId);
    return true;

  }
  async addProductToWishlist(userId: number, productId: number): Promise<boolean> {
    const wishlist = await Wishlist.findOne({ where: { userId } });
    const product = await Product.findByPk(productId);
    if (!product) {
      logger.error(`Product #${productId} doesn't exist`);
      return false;
    }
    await wishlist!.$add("products", productId);
    return true;

  }
  async findByUserId(userId: number): Promise<Wishlist | null> {
    return await Wishlist.findOne({
      where: { userId }, include: [
        {
          attributes: ["name", "description", "price", "stock", "brand"],
          model: Product
        }
      ]
    });
  }
}

