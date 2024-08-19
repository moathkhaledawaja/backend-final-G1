/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express'
import { wishlistRepository } from '../data-access'
import { Wishlist } from '../models'
export async function checkWishlistExists(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const userId = (req as any).user.id
    const exists = await wishlistRepository.wishlistExists(userId)
    if (!exists) {
      const wishlist = new Wishlist()
      wishlist.userId = userId
      wishlistRepository.create(wishlist)
    }
  next()
}
