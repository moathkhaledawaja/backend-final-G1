import {
  Table,
  Column,
  DataType,
  ForeignKey,
  Model,
} from "sequelize-typescript";
import { Product, Order } from "../models";

@Table({
  timestamps: true,
  paranoid: true,
  tableName: "orderProduct",
})
export class OrderProduct extends Model<OrderProduct> {
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
