import {
  Table,
  Column,
  DataType,
  BelongsToMany,
  Model,
} from "sequelize-typescript";
import { Product, ProductCategory } from "../models";

@Table({
  timestamps: true,
  paranoid: true,
  tableName: "categories",
})
export class Category extends Model<Category> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name!: string;

  @BelongsToMany(() => Product, () => ProductCategory)
  products!: Product[];
}
