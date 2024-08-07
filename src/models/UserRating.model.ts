import {
  Table,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import ModelBase from "./ModelBase/ModelBase";
import { User } from "./User.model";
import { Product } from "./Product.model";

@Table({
  tableName: "userRatings",
})
export class UserRating extends ModelBase<UserRating> {
  @ForeignKey(() => User)
  @Column({ allowNull: false, type: DataType.INTEGER })
  userId!: number;

  @ForeignKey(() => Product)
  @Column({ allowNull: false, type: DataType.INTEGER })
  productId!: number;

  @Column({ allowNull: false, type: DataType.FLOAT })
  rating!: number;

  @BelongsTo(() => User)
  user!: User;

  @BelongsTo(() => Product)
  product!: Product;
}
