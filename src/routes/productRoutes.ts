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

router.get('/', productController.getAllProducts.bind(productController));
router.get('/:id', productController.getProductById.bind(productController));
router.get('/name', productController.getProductByName.bind(productController));
router.get('/categoryid/:id', productController.getProductByName.bind(productController));
router.get('/ratingid/:id', productController.getAllByRating.bind(productController));
router.get('/discountid/:id', productController.getAllByDiscount.bind(productController));
router.post('/', productController.createProduct.bind(productController));
router.put('/:id', productController.updateProduct.bind(productController));
router.delete('/:id', productController.deleteProduct.bind(productController));

export default router;
