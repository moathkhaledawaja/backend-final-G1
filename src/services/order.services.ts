import User from 'src/models/user.model';
import Order from '../models/order.model';
import bcrypt from 'bcrypt';
import { Product } from 'src/models/product';

class OrderService {

  public static async createOrder(data: Partial<Order>): Promise<Order> {
    const orderData = { ...data };
    return await Order.create(orderData);
  }

  public static async getOrderById(id: number): Promise<Order | null> {
    return await Order.findOne({ where: { id } });
  }

  public static async getOrders(): Promise<Order[]> {
    return await Order.findAll({
      attributes: ["id", "status", "isPaid"],
      include: [
        {
          exclude: ["password"],
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


  public static async updateOrder(id: number, data: Partial<Order>): Promise<Order | null> {
    const order = await Order.findByPk(id);
    if (order) {
      await order.update(data);
      return order;
    }
    return null;
  }

  public static async deleteOrder(id: number): Promise<number> {
    return await Order.destroy({
      where: { id }
    });
  }

  public static async getOrdersByUserId(userId: number): Promise<Order | null> {
    return await Order.findAll({ where: { user_id: userId } });
  }

}

export default OrderService;
