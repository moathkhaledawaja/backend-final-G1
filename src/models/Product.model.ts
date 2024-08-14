import {
  Table,
  Column,
  DataType,
  HasOne,
  BelongsToMany,
  HasMany,
  Model,
} from "sequelize-typescript";
import {
  Discount,
  Category,
  Comment,
  UserRating,
  Wishlist,
  Cart,
  OrderProduct,
  ProductCategory,
  Order,
  CartProduct,
  WishlistProduct,
} from "../models";

@Table({
  timestamps: true,
  paranoid: true,
  tableName: "products",
})
export class Product extends Model<Product> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name!: string;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  price!: number;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  description?: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  brand?: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 0,
  })
  stock!: number;

  //Product-Discount relationship.
  @HasOne(() => Discount)
  discount!: Discount;

  //Product-Category relationship.
  @BelongsToMany(() => Category, () => ProductCategory)
  categories!: Category[];

  //Prodcut-Comment relationshop.

  @HasMany(() => Comment)
  comments!: Comment[];

  @HasMany(() => UserRating)
  ratings!: UserRating[];

  @BelongsToMany(() => Wishlist, () => WishlistProduct)
  Wishlists!: Wishlist[];

  @BelongsToMany(() => Cart, () => CartProduct)
  carts!: Cart[];

  @BelongsToMany(() => Order, () => OrderProduct)
  Orders!: Order[];
}
