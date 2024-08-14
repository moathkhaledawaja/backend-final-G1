import {
  Table,
  Column,
  DataType,
  BelongsTo,
  ForeignKey,
  Model,
} from "sequelize-typescript";
import { User, Product } from "../models";

@Table({
  timestamps: true,
  paranoid: true,
  tableName: "comments",
})
export class Comment extends Model<Comment> {
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
