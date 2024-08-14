import {
  Table,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
  BelongsToMany,
  Model,
} from "sequelize-typescript";
import { User, Product, WishlistProduct } from "../models";

@Table({
  timestamps: true,
  paranoid: true,
  tableName: "wishlists",
})
export class Wishlist extends Model<Wishlist> {
  @ForeignKey(() => User)
  @Column({ allowNull: false, type: DataType.INTEGER })
  userId!: number;

  @BelongsTo(() => User)
  user!: User;

  @BelongsToMany(() => Product, () => WishlistProduct)
  products!: Product[];
}
