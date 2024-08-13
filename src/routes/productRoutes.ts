import { Router } from 'express';
import { container } from 'tsyringe';
import { ProductController} from '../controllers/ProductController';

const productController = container.resolve(ProductController);

const Productrouter = Router();

Productrouter.get('/', productController.getALlProducts.bind(productController));


export default Productrouter;
