import { orderRepository } from '../data-access';
import { IOrderRepository } from '../data-access/Interfaces/IOrderRepository';
import { Order } from '../models';

class OrderService {
  static order: IOrderRepository = orderRepository;



  public static async createOrder(data: Order): Promise<Order | null> {
    return await OrderService.order.create(data);
  }

  public static async getOrderById(id: number): Promise<Order | null> {
    return await OrderService.order.findById(id);
  }

  public static async getOrders(): Promise<Order[] | null> {
    return await OrderService.order.findAll();
  }


  public static async updateOrder(id: number, data: Partial<Order>): Promise<Order | null> {
    return await OrderService.order.update(id, data);
  }

  public static async deleteOrder(id: number): Promise<number> {
    return await OrderService.order.delete(id);
  }

  public static async getOrdersByUserId(userId: number): Promise<Order[] | null> {
      return await OrderService.order.findByUserId(userId);
  }

}

export default OrderService;
