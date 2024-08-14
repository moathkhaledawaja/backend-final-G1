import {
  Table,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
  BelongsToMany,
  Model,
} from "sequelize-typescript";
import { User, CartProduct, Product } from "../models";

@Table({
  timestamps: true,
  paranoid: true,
  tableName: "carts",
})
export class Cart extends Model<Cart> {
  @ForeignKey(() => User)
  @Column({ allowNull: false, type: DataType.INTEGER })
  userId!: number;

  @BelongsTo(() => User)
  user!: User;

  @BelongsToMany(() => Product, () => CartProduct)
  products!: Product[];
}
