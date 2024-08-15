import { Category, Product } from "../models";
import { ICategoryRepository } from "./Interfaces/ICategoryRepository";
import { RepositoryBase } from "./RepositoryBase";


export class CategoryRepository extends RepositoryBase<Category> implements ICategoryRepository {


    async findByName(name: string): Promise<Category | null> {
        try {
            const category = await this.model.findOne({
                where: { name }
            });
            return category;
        } catch (error) {
            throw new Error('Error retrieving Category')
        }

    }


}