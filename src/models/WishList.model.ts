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
import { WishlistProduct } from "./WishlistProduct.model";

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
