import express from "express";
import dotenv from "dotenv";
import sequelize from "./config/db";

import swaggerUi from 'swagger-ui-express'

import userRouter from "./routes/userRoutes";
import { cartRouter, categoryRoutes, productRoutes } from "./routes";
import { authRouter } from "./routes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api', productRoutes);
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(undefined, {
    swaggerOptions: {
        url: "/swagger.json"
    }
}))
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/products", productRoutes);
app.use("/api/carts", cartRouter);
app.use("/api/categories", categoryRoutes)

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
