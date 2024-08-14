import {
  Table,
  Column,
  DataType,
  ForeignKey,
  Model,
} from "sequelize-typescript";
import { Cart, Product } from "../models";

@Table({
  timestamps: true,
  paranoid: true,
  tableName: "cartProduct",
})
export class CartProduct extends Model<CartProduct> {
  @Column({ allowNull: false, type: DataType.INTEGER })
  quantity!: number;

  @ForeignKey(() => Cart)
  @Column
  cartId!: number;

  @ForeignKey(() => Product)
  @Column
  productId!: number;
}
