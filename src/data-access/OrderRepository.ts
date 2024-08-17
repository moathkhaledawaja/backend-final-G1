import { Order, Product, User } from "../models";
import { IOrderRepository } from "./Interfaces/IOrderRepository";
import { RepositoryBase } from "./RepositoryBase";

export class OrderRepository
  extends RepositoryBase<Order>
  implements IOrderRepository {
  async findById(id: number): Promise<Order | null> {
    throw new Error("Order Can't Be Found By ID")
  }
  async findAll(): Promise<Order[]> {
    throw new Error("Order Can't Be Found By ID")
  }

  async findByIdAndUserId(id: number, userId: number): Promise<Order | null> {
    return await this.model.findOne({
      where: { id, userId },
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
    return await this.model.findAll({ where: { userId } });
  }



}

