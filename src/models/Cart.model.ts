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

@Table({
  tableName: "carts",
})
export class Cart extends ModelBase<Cart> {
  @ForeignKey(() => User)
  @Column({ allowNull: false, type: DataType.INTEGER })
  userId!: number;

  @BelongsTo(() => User)
  user!: User;

  @BelongsToMany(() => Product, () => CartProduct)
  products!: Product[];
}
