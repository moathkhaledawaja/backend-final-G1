import { Table, Column, DataType, ForeignKey } from "sequelize-typescript";
import ModelBase from "./ModelBase/ModelBase";
import { Product } from "./Product.model";
import { Category } from "./Category.model";

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
