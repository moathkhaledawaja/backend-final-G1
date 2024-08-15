import { injectable } from "tsyringe";
import { Category, Product } from "../models";
import { ProductDTO } from "../Types/DTO";
import { GetProductOptions } from "../Types/GetProductOptions";
import { productRepository, categoryRepository } from "../data-access";

@injectable()
export default class ProductService {
  async GetProducts(
    page: number,
    pageSize: number,
    options: GetProductOptions
  ): Promise<ProductDTO[]> {
    const products = await productRepository.GetProducts(
      page,
      pageSize,
      options
    );

    const prodcutsDto: ProductDTO[] = [];

    products.forEach((item) => {
      prodcutsDto.push({
        name: item.name,
        price: item.price,
        stock: item.stock,
        brand: item.brand,
        description: item.description,
        discount: {
          amount: item.discount?.discountRate ?? 0,
          id: item.discount?.id,
        },
      });
    });

    return prodcutsDto;
  }

  async GetProduct(Id: number) {
    return await productRepository.GetProduct(Id);
  }

  async createProduct(productData: ProductDTO): Promise<Product> {
    try {
      const newProduct = new Product();
      newProduct.name = productData.name;
      newProduct.price = productData.price;
      newProduct.stock = productData.stock;
      newProduct.brand = productData.brand;
      newProduct.description = productData.description;
      const categories: Category[] = [];

      productData.categories?.forEach((item) => {
        const cat = new Category();
        cat.name = item.name;
        categories.push(cat);
      });

      const cats = await categoryRepository.CreateCategoryList(categories);
      newProduct.categories = cats;

      const product = await productRepository.CreateProduct(newProduct);
      if (!product) {
        throw new Error("Failed to create product");
      }
      return product;
    } catch (error) {
      throw new Error(`Error while creating product`);
    }
  }

  async updateProduct(
    productId: number,
    productData: ProductDTO
  ): Promise<Product> {
    try {
      const oldProduct = await productRepository.findById(productId);
      if (!oldProduct) {
        throw new Error("Product Doesn't exist");
      }

      oldProduct.name = productData.name;
      oldProduct.price = productData.price;
      oldProduct.stock = productData.stock;
      oldProduct.brand = productData.brand;
      oldProduct.description = productData.description;
      const product = await productRepository.update(oldProduct);
      if (!product) {
        throw new Error("Failed to update product");
      }
      return product;
    } catch (error) {
      throw new Error(`Error while updating product`);
    }
  }

  async deleteProduct(productId: number): Promise<boolean> {
    try {
      const deletedProduct = await productRepository.delete(productId);

      return deletedProduct;
    } catch (error) {
      throw new Error(`Error while deleting product`);
    }

    return false;
  }
  async findById(id: number): Promise<Product | null> {
    try {
      const product = await productRepository.findById(id);
      return product;
    } catch (error: any) {
      throw new Error(`Error retrieving product : ${error.message}`);
    }
  }
  async findByName(name: string): Promise<Product | null> {
    try {
      const product = await productRepository.findByName(name);
      return product;
    } catch (error: any) {
      throw new Error(`Error retrieving product : ${error.message}`);
    }
  }
}
