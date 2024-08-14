import { IProductRepository } from "./Interfaces/IProductRepository";
import { Category, Discount, Product, ProductCategory, UserRating, } from "../models";
import { RepositoryBase } from "./RepositoryBase";

export class ProductRepository extends RepositoryBase<Product> implements IProductRepository {


    async findByName(name: string): Promise<Product | null> {
        try {
            const product = await this.model.findOne({
                where: { name },
                include: [
                    { model: Category, through: { attributes: [] } },
                    { model: UserRating },
                    { model: Discount }
                ]

            });
            return product;
        } catch (error: any) {
            throw new Error(`Error retrieving product : ${error.message}`)
        }

    }


    async findByCategory(categoryId: number): Promise<Product[] | null> {
        try {
            const product = await this.model.findAll({
                include: [
                    {
                        model: Category, through: { attributes: [] }, where: { id: categoryId }
                    },
                    { model: UserRating },
                    { model: Discount }




                ]
            });
            return product;
        } catch (error: any) {
            throw new Error(`Error retrieving product : ${error.message}`)
        }

    }
    async findAllByRating(ratingId: number): Promise<Product[] | null> {
        try {
            const product = await this.model.findAll({
                include: [
                    { model: UserRating, where: { ratingId } },
                    { model: Category, through: { attributes: [] } },
                    { model: Discount }


                ]
            });
            return product;
        } catch (error: any) {
            throw new Error(`Error retrieving product : ${error.message}`)
        }

    }
    async findAllByDiscount(discountId: number): Promise<Product[] | null> {
        try {
            const product = await this.model.findAll({
                include: [
                    {
                        model: Discount, where: { discountId }
                    },
                    { model: Category, through: { attributes: [] } },
                    { model: UserRating }
                ]
            });
            
            return product;
        } catch (error: any) {
            throw new Error(`Error retrieving product : ${error.message}`)
        }

    }


}