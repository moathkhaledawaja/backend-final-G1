import {
  Table,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
  BelongsToMany,
} from "sequelize-typescript";
import { User, Product, WishlistProduct, ModelBase } from "../models";

@Table({
  tableName: "wishlists",
})
export class Wishlist extends ModelBase<Wishlist> {
  @ForeignKey(() => User)
  @Column({ allowNull: false, type: DataType.INTEGER })
  userId!: number;

  @BelongsTo(() => User)
  user!: User;

  @BelongsToMany(() => Product, () => WishlistProduct)
  products!: Product[];
}
