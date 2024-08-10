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

  public async createOrder(data: OrderDTO): Promise<Order | null> {
    
    const newOrder = new Order({ userId, status, isPaid})
    try {
      const order = await this.orderRepository.create(newOrder);
      if (!order) {
        throw new Error(" Failed to create Order");
      }
      return order;
    }
    catch (error: any) {
      throw new Error(`Error Creating Order: ${error.message}`);
    }

  }

  public async getOrderById(id: number, userId: number): Promise<Order | null> {
    try {
      return await this.orderRepository.findByIdAndUserId(id, userId);
    }
    catch (error: any) {
      throw new Error(`Error retrieving Order: ${error.message}`)
    }
  }

  public async getOrders(userId: number): Promise<Order[] | null> {
    try {
      return await this.orderRepository.findByUserId(userId);
    }
    catch (error: any) {
      throw new Error(`Error retrieving Order: ${error.message}`);

    }
  }


  public async updateOrder(data: Partial<Order>): Promise<Order | null> {
    try {
      const order = await this.orderRepository.update(data);
      if (!order) {
        throw new Error("Order not Found");
      }
      return order;
    }
    catch (error: any) {
      throw new Error(`Error Updating the order ${error.message}`)
    }
  }

  public async cancelOrder(id: number): Promise<boolean> {
    try {
      return await this.orderRepository.delete(id);
    }
    catch (error: any) {
      throw new Error(`Error Deleting the order ${error.message}`);
    }
  }


}

