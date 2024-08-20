import {
  Table,
  Column,
  Model,
  HasMany,
  NotNull,
  AllowNull,
  DataType,
  ForeignKey,
} from 'sequelize-typescript'
import { Product, Wishlist } from '../models'
import { DataTypes } from 'sequelize'
import { defaultTableSettings } from '../config/DefaultTableSettings'

@Table({
  tableName: 'brands',
  ...defaultTableSettings,
})
export class Brand extends Model<Brand> {
  @AllowNull(false)
  @Column({ type: DataTypes.STRING })
  name!: string

  @Column({ type: DataTypes.STRING })
  icon!: string

  @HasMany(() => Product)
  prodcuts!: Product[]
}
