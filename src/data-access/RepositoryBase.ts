import { Model, ModelCtor, Sequelize } from "sequelize-typescript";
import { IRepositoryBase } from "./Interfaces/IRepositoryBase";

export class RepositoryBase<T extends Model> implements IRepositoryBase<T> {
  protected model: ModelCtor<T>;

  constructor(model: ModelCtor<T>) {
    this.model = model;
  }

  async findById(id: string): Promise<T | null> {
    try {
      return await this.model.findByPk<T>(id);
    } catch (ex) {
      console.log(ex);
    }
    return null;
  }

  async findAll(): Promise<T[]> {
    try {
      return await this.model.findAll<T>();
    } catch (ex) {
      console.log(ex);
    }
    return [];
  }

  async create(entity: T): Promise<T | null> {
    try {
      return await entity.save();
    } catch (ex) {}
    return null;
  }

  async update(entity: T): Promise<T | null> {
    try {
      const [_, [updatedEntity]] = await this.model.update<T>(entity.toJSON(), {
        where: { id: entity.id },
        returning: true,
      });

      return updatedEntity;
    } catch (ex) {
      console.log(ex);
    }
    return null;
  }

  async delete(entity: T): Promise<boolean> {
    try {
      const deleted = await this.model.destroy<T>({
        where: { id: entity.id },
      });
      return deleted > 0;
    } catch (ex) {
      console.log(ex);
    }
    return false;
  }
}
