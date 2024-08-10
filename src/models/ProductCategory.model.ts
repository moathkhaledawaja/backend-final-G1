import { Table, Column, DataType, ForeignKey } from "sequelize-typescript";
import { Product, ModelBase, Category } from "../models";

@Table({
  tableName: "productCategory",
})
export class ProductCategory extends ModelBase<ProductCategory> {
  @ForeignKey(() => Product)
  @Column({ allowNull: false, type: DataType.INTEGER })
  productId!: number;

  @ForeignKey(() => Category)
  @Column({ allowNull: false, type: DataType.INTEGER })
  categoryId!: number;
}
