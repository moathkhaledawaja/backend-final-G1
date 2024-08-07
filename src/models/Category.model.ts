import { Table, Column, DataType, BelongsToMany } from "sequelize-typescript";
import ModelBase from "./ModelBase/ModelBase";
import { Product } from "./Product.model";
import { ProductCategory } from "./ProductCategory.model";

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
