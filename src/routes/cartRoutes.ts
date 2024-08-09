import { Router } from "express";
import { container } from "tsyringe";
import { CartController } from "../controllers/cartController";
import authAndRoleMiddleware from "../middleware/authMiddleware";

const cartRouter = Router();
const cartController = container.resolve(CartController);

cartRouter.post("/", cartController.createCart.bind(cartController));
cartRouter.get("/:id", cartController.getCartByUserId.bind(cartController));
cartRouter.put("/:id", cartController.updateCart.bind(cartController));
cartRouter.delete("/:id", cartController.deleteCart.bind(cartController));

export default cartRouter;