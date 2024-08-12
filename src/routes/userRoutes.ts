import { Router } from "express";
import { container } from "tsyringe";
import { UserController } from "../controllers/userController";
import authAndRoleMiddleware from "../middleware/authMiddleware";

const userRouter = Router();
const userController = container.resolve(UserController);

userRouter.post("/", userController.createUser.bind(userController));
userRouter.get("/:id", userController.getUserById.bind(userController));
userRouter.get("/:email", userController.getUserByEmail.bind(userController));
userRouter.get("/", authAndRoleMiddleware(["admin"]), userController.getAllUsers.bind(userController));
userRouter.put("/:id", authAndRoleMiddleware(["admin"]), userController.updateUser.bind(userController));
userRouter.delete("/:id", authAndRoleMiddleware(["admin"]), userController.deleteUser.bind(userController));

export default userRouter;