import {
  Table,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
  BelongsToMany,
} from "sequelize-typescript";
import ModelBase from "./ModelBase/ModelBase";
import { User } from "./User.model";
import { Product } from "./Product.model";
import { CartProduct } from "./CartProduct.model";
import { OrderStatus } from "../enums/OrderStatusEnum";
import { OrderProduct } from "./OrderProduct.model";

let orderStatus: string[] = [];
for (const value in OrderStatus) {
  const key = value as keyof typeof OrderStatus;
  orderStatus.push(OrderStatus[key]);
}


@Table({
  tableName: "orders",
})
export class Order extends ModelBase<Order> {
  @Column({ allowNull: false, type: DataType.ENUM(...orderStatus) })
  status!: string;

  @Column({ allowNull: false, type: DataType.BOOLEAN })
  isPaid!: boolean;

  @ForeignKey(() => User)
  @Column({ allowNull: false, type: DataType.INTEGER })
  userId!: number;

  @BelongsTo(() => User)
  user!: User;

  @BelongsToMany(() => Product, () => OrderProduct)
  products!: Product[];
}
