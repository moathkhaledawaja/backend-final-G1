import WishList from '../models/wishList.model';

class wishListService {

  public static async createWishList(data: Partial<WishList>): Promise<WishList> {
    const wishListData = { data };
    return await WishList.create(wishListData);
  }

  public static async getWishListByUserId(userId: number): Promise<WishList | null> {
    return await WishList.findOne({ where: { userId } });
  }



  public static async updateWishList(id: number, data: Partial<WishList>): Promise<WishList | null> {
    const wishList = await WishList.findByPk(id);
    if (wishList) {
      await wishList.update(data);
      return wishList;
    }
    return null;
  }

  public static async deleteWishList(id: number): Promise<number> {
    return await WishList.destroy({
      where: { id }
    });
  }


}

export default wishListService;
