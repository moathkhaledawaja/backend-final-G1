import {
  Table,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
  HasOne,
} from "sequelize-typescript";
import ModelBase from "./ModelBase/ModelBase";
import { Product } from "./Product.model";
import { Order } from "./Order.model";

@Table({
  tableName: "orderProduct",
})
export class OrderProduct extends ModelBase<OrderProduct> {
  @Column({ allowNull: false, type: DataType.INTEGER })
  quantity!: number;

  @Column({ allowNull: false, type: DataType.FLOAT })
  totalPrice!: number;

  @ForeignKey(() => Order)
  @Column({ allowNull: false, type: DataType.INTEGER })
  orderId!: number;

  // @HasOne(() => Order)
  // order!: Order;

  @ForeignKey(() => Product)
  @Column({ allowNull: false, type: DataType.INTEGER })
  productId!: number;

  // @HasOne(() => Product)
  // product!: Product;
}
