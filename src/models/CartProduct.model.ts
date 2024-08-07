import {
  Table,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
  HasOne,
} from "sequelize-typescript";
import ModelBase from "./ModelBase/ModelBase";
import { User } from "./User.model";
import { Cart } from "./Cart.model";
import { Product } from "./Product.model";

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
