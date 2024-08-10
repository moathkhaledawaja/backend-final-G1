import { Table, Column, DataType, BelongsToMany } from "sequelize-typescript";
import { Product, ProductCategory, ModelBase } from "../models";

@Table({
  tableName: "categories",
})
export class Category extends ModelBase<Category> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name!: string;

  @BelongsToMany(() => Product, () => ProductCategory)
  products!: Product[];
}
