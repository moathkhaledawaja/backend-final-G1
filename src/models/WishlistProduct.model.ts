import { Table, Column, DataType, ForeignKey } from "sequelize-typescript";
import ModelBase from "./ModelBase/ModelBase";
import { Product } from "./Product.model";
import { Wishlist } from "./WishList.model";

@Table({
  tableName: "wishlistProduct",
})
export class WishlistProduct extends ModelBase<WishlistProduct> {
  @ForeignKey(() => Wishlist)
  @Column({ allowNull: false, type: DataType.INTEGER })
  wishlistId!: number;

  @ForeignKey(() => Product)
  @Column({ allowNull: false, type: DataType.INTEGER })
  productId!: number;
}
