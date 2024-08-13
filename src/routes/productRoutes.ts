import { Router } from 'express';
import { ProductController } from '../controllers/ProductController';
import { container } from "tsyringe";
import { ProductService } from '../services/product.service';
import { ProductRepository } from '../data-access/ProductRepository'

/* const productRepository = new ProductRepository();
const productService = new ProductService();
const productController = new ProductController(); */
const productController = container.resolve(ProductController);

const router = Router();

router.get('/products', productController.getALlProducts.bind(productController));
router.get('/products/:id', productController.getProductById.bind(productController));
router.post('/products', productController.createProduct.bind(productController));
router.put('/products/:id', productController.updateProduct.bind(productController));
router.delete('/products/:id', productController.daleteProduct.bind(productController));

export default router;
