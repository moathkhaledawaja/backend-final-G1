import { Router } from "express";
import { container } from "tsyringe";
import { WishlistController } from "../controllers/wishlistController";
import authAndRoleMiddleware from "../middleware/authMiddleware";
import { addAndRemoveProductFromWishlist } from "../validations/wishlistValidations";
import { checkWishlistExists } from "../middleware/checkWishlistExists";

const wishlistRouter = Router();
const wishlistController = container.resolve(WishlistController);

wishlistRouter.use(authAndRoleMiddleware(["user"]));
wishlistRouter.use(checkWishlistExists);
wishlistRouter.post("/", addAndRemoveProductFromWishlist, wishlistController.addProductToWishlist.bind(wishlistController));
wishlistRouter.get("/", wishlistController.getWishList.bind(wishlistController));
wishlistRouter.put("/", addAndRemoveProductFromWishlist, wishlistController.removeProductFromWishlist.bind(wishlistController));
wishlistRouter.delete("/", wishlistController.clearWishList.bind(wishlistController));

export default wishlistRouter;