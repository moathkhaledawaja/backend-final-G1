import { Order, Product, User } from "../models";
import { IOrderRepository } from "./Interfaces/IOrderRepository";
import { RepositoryBase } from "./RepositoryBase";

export class OrderRepository
  extends RepositoryBase<Order>
  implements IOrderRepository {
  async findById(id: string): Promise<Order | null> {
    return await Order.findOne({
      where: { id },
      include: [
        {

          attributes: { exclude: ["password"] },
          model: User
        },
        {
          model: Product,
          through: {
            attributes: ["quantity", "totalPrice"]
          }
        }
      ]
    });
  }
  async findByUserId(userId: number): Promise<Order[] | null> {
    return await Order.findAll({ where: { userId } });
  }


}

