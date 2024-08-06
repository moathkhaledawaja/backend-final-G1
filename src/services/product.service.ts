import Product from '../models/product.model'

class ProductService {
    public static async createProduct(data: Partial<Product>): Promise<Product> {
        return await Product.create({ ...data });
        // return await Product.create(data);
    }

    //get Product by id

    public static async getProductById(id: string): Promise<Product | null> {
        return await Product.findByPk(id);
    }

    //get all products
    public static async getProducts(): Promise<Product[]> {
        return await Product.findAll();

    }

    //update product
    public static async updateProduct(id: string, data: Partial<Product>): Promise<Product | null> {
        const product = await Product.findByPk(id);
        if (product) {
            await product.update(data);
        }

        return product;
    }

    public static async deleteProduct(id: string): Promise<number> {
        return await Product.destroy({
            where: { id }
        });
    }




}

export default ProductService;