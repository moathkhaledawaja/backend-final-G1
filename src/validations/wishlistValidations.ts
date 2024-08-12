import { body } from "express-validator";

export const addAndRemoveProductFromWishlist = [
  body("productId").notEmpty().isInt().toInt()
]