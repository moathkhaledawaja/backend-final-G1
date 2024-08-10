import { Router } from "express";
import { container } from "tsyringe";
import { WishlistController } from "../controllers/wishlistController";
import authAndRoleMiddleware from "../middleware/authMiddleware";

const wishlistRouter = Router();
const wishlistController = container.resolve(WishlistController);

wishlistRouter.post("/", authAndRoleMiddleware(["user"]), wishlistController.addProductToWishList.bind(wishlistController));
wishlistRouter.get("/", authAndRoleMiddleware(["user"]), wishlistController.getWishList.bind(wishlistController));
wishlistRouter.put("/", authAndRoleMiddleware(["user"]), wishlistController.removeProductFromWishlist.bind(wishlistController));
wishlistRouter.delete("/", authAndRoleMiddleware(["user"]), wishlistController.clearWishList.bind(wishlistController));

export default wishlistRouter;