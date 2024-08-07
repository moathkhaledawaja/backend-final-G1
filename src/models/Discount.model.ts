import {
  Table,
  Column,
  DataType,
  BelongsTo,
  ForeignKey,
} from "sequelize-typescript";
import ModelBase from "./ModelBase/ModelBase";
import { Product } from "./Product.model";

@Table({
  tableName: "discounts",
})
export class Discount extends ModelBase<Discount> {
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
