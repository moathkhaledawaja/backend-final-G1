import { Router } from "express";
import { ProductController } from "../controllers/ProductController";
import { container } from "tsyringe";

/* const productRepository = new ProductRepository();
const productService = new ProductService();
const productController = new ProductController(); */
const productController = container.resolve(ProductController);

const router = Router();
router.get("/list", productController.GetProducts.bind(productController));
router.get("/:id", productController.getProductById.bind(productController));
router.get("/name", productController.getProductByName.bind(productController));
router.get(
  "/categoryid/:id",
  productController.getProductByName.bind(productController)
);
router.post("/", productController.createProduct.bind(productController));
router.put("/:id", productController.updateProduct.bind(productController));
router.delete("/:id", productController.deleteProduct.bind(productController));

export default router;
