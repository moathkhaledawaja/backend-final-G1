import {
  Table,
  Column,
  DataType,
  ForeignKey,
  Model,
} from "sequelize-typescript";
import { Wishlist, Product } from "../models";

@Table({
  paranoid: true,
  tableName: "wishlistProduct",
  timestamps: true,
})
export class WishlistProduct extends Model<WishlistProduct> {
  @ForeignKey(() => Wishlist)
  @Column({ allowNull: false, type: DataType.INTEGER })
  wishlistId!: number;

  @ForeignKey(() => Product)
  @Column({ allowNull: false, type: DataType.INTEGER })
  productId!: number;
}
