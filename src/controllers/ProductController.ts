import ProductService from '../services/product.service';
import { ProductDTO } from '../Types/DTO';
import { injectable, inject } from 'tsyringe';
import { Request, Response } from 'express';
import { UpdateProductDTO } from '../Types/DTO/productDto';
import { ReadAllImage } from '../helpers/Storage/StorageManager';

@injectable()
export class ProductController {
  constructor(@inject(ProductService) private productService: ProductService) {}

  public async GetProducts(req: Request, res: Response): Promise<Response> {
    const { page, pageSize, options } = req.body;
    try {
      const products = await this.productService.GetProducts(page, pageSize, options);
      return res.status(200).json({ products });
    } catch (ex) {
      return this.handleError(res, ex, 'Error fetching products');
    }
  }

  public async createProduct(req: Request, res: Response): Promise<Response> {
    try {
      const product: ProductDTO = req.body;
      product.images = req.files as Express.Multer.File[];
      const newProduct = await this.productService.createProduct(product);
      await ReadAllImage('newimage', product.images[0].buffer);

      return res.status(201).json(newProduct);
    } catch (ex) {
      return this.handleError(res, ex, 'Error creating product');
    }
  }

  public async updateProduct(req: Request, res: Response): Promise<Response> {
    try {
      const updatedData: UpdateProductDTO = req.body;

      const updatedProduct = await this.productService.FindAndUpdateProduct(updatedData.id, updatedData);

      if (!updatedProduct) {
        return res.status(404).json({ error: 'Could not find the product with the specified ID' });
      }

      return res.status(201).json(updatedProduct);
    } catch (ex) {
      return this.handleError(res, ex, 'Error updating product');
    }
  }

  public async deleteProduct(req: Request, res: Response): Promise<Response> {
    try {
      const productId = parseInt(req.params.id, 10);

      const status = await this.productService.DeleteProduct(productId);
      if (status) return res.status(204).json({});
      return res.status(404).json({});
    } catch (ex) {
      return this.handleError(res, ex, 'Error deleting product');
    }
  }

  public async getProductById(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;

      const product = await this.productService.GetProduct(parseInt(id, 10));
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
      return res.status(200).json({ product });
    } catch (ex) {
      return this.handleError(res, ex, 'Error fetching product');
    }
  }

  private handleError(res: Response, error: unknown, defaultMessage: string): Response {
    if (error instanceof Error) {
      console.error(defaultMessage, error.message);
      return res.status(500).json({ error: error.message });
    } else {
      console.error(defaultMessage, error);
      return res.status(500).json({ error: defaultMessage });
    }
  }
}
