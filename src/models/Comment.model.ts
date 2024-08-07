import {
  Table,
  Column,
  DataType,
  BelongsTo,
  ForeignKey,
} from "sequelize-typescript";
import ModelBase from "./ModelBase/ModelBase";
import { Product } from "./Product.model";
import { User } from "./User.model";

@Table({
  tableName: "comments",
})
export class Comment extends ModelBase<Comment> {
  @Column({ allowNull: false, type: DataType.STRING })
  content!: string;

  // Product-comment relationship.
  @ForeignKey(() => Product)
  @Column({
    allowNull: false,
    type: DataType.INTEGER,
  })
  productId!: number;

  @BelongsTo(() => Product)
  product!: Product;

  //user-comment relationship.
  @ForeignKey(() => User)
  @Column({
    allowNull: false,
    type: DataType.INTEGER,
  })
  userId!: number;

  @BelongsTo(() => User)
  user!: User;
}
