
import { NextFunction, Request, Response } from "express";
import { wishlistRepository } from "../data-access";
import { Wishlist } from "../models";
export function checkWishlistExists(req: Request, res: Response, next: NextFunction) {
  const userId = req.user?.id;
  try {
    const wishlist = new Wishlist();
    wishlist.userId = userId;
    wishlistRepository.create(wishlist);;
  }
  catch { }
  next();
}