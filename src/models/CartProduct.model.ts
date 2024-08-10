import { Table, Column, DataType, ForeignKey } from "sequelize-typescript";
import { Cart, Product, ModelBase } from "../models";

@Table({
  tableName: "cartProduct",
})
export class CartProduct extends ModelBase<CartProduct> {
  @Column({ allowNull: false, type: DataType.INTEGER })
  quantity!: number;

  @ForeignKey(() => Cart)
  @Column
  cartId!: number;

  @ForeignKey(() => Product)
  @Column
  productId!: number;
}
