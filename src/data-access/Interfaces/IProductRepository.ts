import { Product } from "../../models";
import { IRepositoryBase } from "./IRepositoryBase";

export interface IProductRepository extends IRepositoryBase<Product> {


    findByName(name: string): Promise<Product | null>
    findByCategory(categoryId: number): Promise<Product[] | null>
    findAllByRating(ratingId: number): Promise<Product[] | null>
    findAllByDiscount(discountId: number): Promise<Product[] | null>



}

