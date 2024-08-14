import {
  Table,
  Column,
  DataType,
  ForeignKey,
  Model,
} from "sequelize-typescript";
import { Product, Category } from "../models";

@Table({
  timestamps: true,
  paranoid: true,
  tableName: "productCategory",
})
export class ProductCategory extends Model<ProductCategory> {
  @ForeignKey(() => Product)
  @Column({ allowNull: false, type: DataType.INTEGER })
  productId!: number;

  @ForeignKey(() => Category)
  @Column({ allowNull: false, type: DataType.INTEGER })
  categoryId!: number;
}
