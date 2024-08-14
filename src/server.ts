import express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import sequelize from "./config/db";

import productRoutes from "./routes/productRoutes";
import userRouter from "./routes/userRoutes";
import { cartRouter, commentRouter } from "./routes";
import { authRouter } from "./routes";
import { container } from "tsyringe";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/products", productRoutes);
app.use("/api/carts", cartRouter);
app.use("/api/comments", commentRouter);
const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected!");
    // await sequelize.sync({ force: true });
    // console.log("Database synchronized!");
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

startServer();
