import { Request, Response } from 'express';
import { injectable, inject } from 'tsyringe';
import WishlistService from '../services/wishList.service';
import { WishlistDTO } from '../DTO';

@injectable()
export class WishlistController {
  constructor(@inject(WishlistService) private wishlistService: WishlistService) { }


  async getWishList(req: Request, res: Response): Promise<WishlistDTO | null> {
    try {
      const userId = req.params.id;
      const wishlist = await this.wishlistService.getWishlistByUserId(userId);
      if (!wishlist) {
        res.status(404).json({ error: 'Wishlist not found' });
        return null;
      }
      res.json(wishlist);
      return wishlist;
    } catch (error: any) {
      res.status(500).json({ error: error.message });
      throw error;
    }
  }


  async addProductToWishList(req: Request, res: Response): Promise<boolean> {
    try {
      const userId = (req as any).user.id;
      const productId: number = req.body;
      const added = await this.wishlistService.addProductToWishlist(userId, productId);
      if (!added) {
        res.status(404).json({ error: 'Product not found' });
        return false;
      }
      res.json(added);
      return added;
    } catch (error: any) {
      res.status(500).json({ error: error.message });
      throw error;
    }
  }
  async removeProductFromWishlist(req: Request, res: Response): Promise<boolean> {
    try {
      const userId = (req as any).user.id;
      const productId: number = req.body;
      const removed = await this.wishlistService.removeProductFromWishList(userId, productId);
      if (!removed) {
        res.status(404).json({ error: 'Product not found' });
        return false;
      }
      res.json(removed);
      return removed;
    } catch (error: any) {
      res.status(500).json({ error: error.message });
      throw error;
    }
  }
  async clearWishList(req: Request, res: Response): Promise<boolean> {
    try {
      const userId = (req as any).user.id;
      const cleared = await this.wishlistService.clearWishList(userId);
      if (!cleared) {
        res.status(500).send("Something went wrong");
        return false;
      }
      res.json(cleared);
      return cleared;
    } catch (error: any) {
      res.status(500).json({ error: error.message });
      throw error;
    }
  }
}