import {
  AllowNull,
  Column,
  DataType,
  Default,
  Model,
  Table,
} from "sequelize-typescript";

@Table({
  timestamps: true,
})
class ModelBase<T extends {}> extends Model<T> {
  @Default(false)
  @AllowNull(false)
  @Column(DataType.BOOLEAN)
  isDeleted!: boolean;

  public async SoftDelete() {
    this.isDeleted = true;
    await this.save();
  }
  public async SoftRestore() {
    this.isDeleted = false;
    await this.save();
  }

  public static async DeleteById(id: string | number) {
    const item = await this.findByPk(id);
    if (!item || item.isDeleted) {
      return false;
    }
    await item.SoftDelete();
    return true;
  }

  public static async RestoreById(id: string | number) {
    const item = await this.findByPk(id);
    if (!item) {
      return null;
    }
    if (!item.isDeleted) {
      return item;
    }
    await item.SoftRestore();
    return item;
  }
}

export default ModelBase;
