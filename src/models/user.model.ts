import { Table, Column, DataType, HasMany } from "sequelize-typescript";
import { ModelBase, Comment, UserRating } from "../models";

@Table({
  tableName: "users",
})
export class User extends ModelBase<User> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  email!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  address!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  role!: string;

  //user-comment relationship.
  @HasMany(() => Comment)
  comments!: Comment[];

  //user-rating relationship.

  @HasMany(() => UserRating)
  ratings!: UserRating[];
}
