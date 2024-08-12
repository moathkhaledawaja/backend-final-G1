import { Router } from "express";
import { container } from "tsyringe";
import { WishlistController } from "../controllers/wishlistController";
import authAndRoleMiddleware from "../middleware/authMiddleware";
import { addAndRemoveProductFromWishlist } from "../validations/wishlistValidations";

const wishlistRouter = Router();
const wishlistController = container.resolve(WishlistController);

wishlistRouter.post("/", addAndRemoveProductFromWishlist, authAndRoleMiddleware(["user"]), wishlistController.addProductToWishlist.bind(wishlistController));
wishlistRouter.get("/", authAndRoleMiddleware(["user"]), wishlistController.getWishList.bind(wishlistController));
wishlistRouter.put("/", addAndRemoveProductFromWishlist, authAndRoleMiddleware(["user"]), wishlistController.removeProductFromWishlist.bind(wishlistController));
wishlistRouter.delete("/", authAndRoleMiddleware(["user"]), wishlistController.clearWishList.bind(wishlistController));

export default wishlistRouter;