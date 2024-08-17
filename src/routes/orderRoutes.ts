import { Router } from "express";
import { container } from "tsyringe";
import { OrderController } from "../controllers/orderController";
import authAndRoleMiddleware from "../middleware/authMiddleware";

const orderRouter = Router();
const orderController = container.resolve(OrderController);

orderRouter.post("/", authAndRoleMiddleware(["user"]), orderController.createOrder.bind(orderController));
orderRouter.get("/", authAndRoleMiddleware(["user"]), orderController.getOrdersByUserId.bind(orderController));
orderRouter.get("/:id", authAndRoleMiddleware(["user"]), orderController.getOrderByUserId.bind(orderController));
orderRouter.put("/:id", authAndRoleMiddleware(["user"]), orderController.updateOrder.bind(orderController));
orderRouter.delete("/:id", authAndRoleMiddleware(["user"]), orderController.deleteOrder.bind(orderController));

export default orderRouter;