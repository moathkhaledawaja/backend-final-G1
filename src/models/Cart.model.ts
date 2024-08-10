import {
  Table,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
  BelongsToMany,
} from "sequelize-typescript";
import { User, CartProduct, Product, ModelBase } from "../models";

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
