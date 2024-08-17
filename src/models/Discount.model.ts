import {
  Table,
  Column,
  DataType,
  BelongsTo,
  ForeignKey,
  Model,
} from "sequelize-typescript";
import { Product } from "../models";

@Table({
  timestamps: true,
  paranoid: true,
  tableName: "discounts",
})
export class Discount extends Model<Discount> {
  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  discountRate!: number;

  @ForeignKey(() => Product)
  @Column({
    allowNull: false,
    type: DataType.INTEGER,
  })
  productId!: number;

  @BelongsTo(() => Product)
  product!: Product;
}
