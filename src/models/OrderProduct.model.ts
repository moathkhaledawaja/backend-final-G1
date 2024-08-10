import { Table, Column, DataType, ForeignKey } from "sequelize-typescript";
import { Product, Order, ModelBase } from "../models";

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
