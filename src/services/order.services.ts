import { Order } from '../models';
import { IOrderRepository } from '../data-access/Interfaces/IOrderRepository';
import { OrderDTO } from '../DTO';
import { injectable } from 'tsyringe';

@injectable()
export default class OrderService {
  private orderRepository: IOrderRepository;


  constructor(orderRepository: IOrderRepository) {
    this.orderRepository = orderRepository;
  }

  public async createOrder(data: OrderDTO): Promise<OrderDTO | null> {
    const {userId, status, isPaid, products} = data;
    const products
    const newOrder = new Order({userId, status:status, isPaid})
    return await this.orderRepository.create(data);
  }

  public async getOrderById(id: number): Promise<Order | null> {
    return await OrderService.order.findById(id);
  }

  public async getOrders(): Promise<Order[] | null> {
    return await OrderService.order.findAll();
  }


  public async updateOrder(id: number, data: Partial<Order>): Promise<Order | null> {
    return await OrderService.order.update(id, data);
  }

  public async deleteOrder(id: number): Promise<number> {
    return await OrderService.order.delete(id);
  }

  public async getOrdersByUserId(userId: number): Promise<Order[] | null> {
    return await OrderService.order.findByUserId(userId);
  }

}

