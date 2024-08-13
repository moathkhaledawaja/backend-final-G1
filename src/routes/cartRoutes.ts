import { Router } from "express";
import { container } from "tsyringe";
import { CartController } from "../controllers/cartController";
import authAndRoleMiddleware from "../middleware/authMiddleware";

const cartRouter = Router();
const cartController = container.resolve(CartController);

cartRouter.post("/",authAndRoleMiddleware(["user", "admin"]) ,cartController.createCart.bind(cartController));
cartRouter.get("/:id",authAndRoleMiddleware(["user", "admin"]) ,cartController.getCartByUserId.bind(cartController));
cartRouter.put("/:id", authAndRoleMiddleware(["user", "admin"]),cartController.updateCart.bind(cartController));
cartRouter.delete("/:id", authAndRoleMiddleware(["user", "admin"]), cartController.deleteCart.bind(cartController));

export default cartRouter;