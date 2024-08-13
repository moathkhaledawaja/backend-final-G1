import { ProductService } from "../services/product.service";
import { Product } from "../models"
import { ProductDTO } from '../DTO';
import { injectable, inject } from 'tsyringe';
import { Request, Response } from 'express';
@injectable()
export class ProductController {


    constructor(@inject(ProductService) private productService: ProductService) { }

    public async createProduct(req: Request, res: Response): Promise<void> {
        try {
            const product: ProductDTO = req.body;
            if (!product) {
                res.status(500).json({ error: 'Required Data is Unavailable' });
            }
            const newProduct = await this.productService.createProduct(product);
            if (!newProduct) {
                res.status(400).json({ error: 'error while creating new Product' });
            }
            res.status(201).json(product);

        } catch (error: any) {
            res.status(400).json({ error: error.message });
            throw error;
        }
    }



    public async updateProduct(req: Request, res: Response): Promise<void> {
        try {
            const newProduct: ProductDTO = req.body;
            const productId = parseInt(req.params.id);
            if (!newProduct || !productId) {
                res.status(500).json({ error: 'Required Data is Unavailable' });
            }
            const updatedProduct = await this.productService.updateProduct(productId, newProduct);
            if (!updatedProduct) {
                res.status(404).json({ error: 'Error while updating category' });
            }

            res.status(201).json(updatedProduct);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
            throw error;
        }


    }

    public async deleteProduct(req: Request, res: Response): Promise<void> {
        try {
            const productId = parseInt(req.params.id);
            if (!productId) {
                res.status(500).json({ error: 'Required Data is Unavailable' });
            }
            await this.productService.deleteProduct(productId);
            res.status(201);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }

    }

    public async getAllProducts(req: Request, res: Response): Promise<void> {
        try {
            const products = await this.productService.findAll();

            if (!products) {
                res.status(404).json({ error: 'Product not found' });
            }
            res.status(201).json(products);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
            throw error;
        }
    }

    public async getProductById(req: Request, res: Response): Promise<void> {
        try {
            const productId = parseInt(req.params.id, 10);
            if (!productId) {
                res.status(500).json({ error: 'Required Data is Unavailable' });

            }
            const product = await this.productService.findById(productId);
            if (!product) {
                res.status(400).json({ error: 'Product not found' });

            }
            res.status(201).json(product);

        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    public async getProductByName(req: Request, res: Response): Promise<void> {

        try {
            const { name } = req.body;
            if (!name) {
                res.status(500).json({ error: 'Required Data is Unavailable' });
            }
            const product = await this.productService.findByName(name);
            if (!product) {
                res.status(404).json(product);
            }

        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }

    }

    public async getProductByCategory(req: Request, res: Response): Promise<void> {

        try {
            const categoryId = parseInt(req.params.id, 10);
            if (!categoryId) {
                res.status(500).json({ error: 'Required Data is Unavailable' });
            }
            const product = await this.productService.findByCategory(categoryId);
            if (!product) {
                res.status(400).json({ error: 'Product not found' });
            }


        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    public async getAllByRating(req: Request, res: Response): Promise<void> {

        try {
            const ratingId = parseInt(req.params.id, 10);
            if (!ratingId) {
                res.status(500).json({ error: 'Required Data is Unavailable' });
            }
            const product = await this.productService.findAllByRating(ratingId);
            if (!product) {
                res.status(400).json({ error: 'Category not found' });
            }
            res.status(201).json(product);

        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    public async getAllByDiscount(req: Request, res: Response): Promise<void> {

        try {
            const discountId = parseInt(req.params.id, 10);
            if (!discountId) {
                res.status(500).json({ error: 'Required Data is Unavailable' });
            }
            const product = await this.productService.findAllByDiscount(discountId);
            if (!product) {
                res.status(400).json({ error: 'Category not found' });
            }
            res.status(201).json(product);

        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }


}