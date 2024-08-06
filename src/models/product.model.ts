import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
    tableName: 'products',
    timestamps: true,
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
}

export default Product;
