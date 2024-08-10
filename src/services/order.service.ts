import { Order } from '../models';
import { OrderDTO } from '../DTO';
import { injectable } from 'tsyringe';
import { OrderRepository } from '../data-access/OrderRepository';
import { OrderStatus } from '../enums/OrderStatusEnum';
import { ordersToOrdersDTO, orderToOrderDTO } from '../helpers/orders/orderToOrderDTO';

@injectable()
export default class OrderService {
  private orderRepository: OrderRepository;


  constructor(orderRepository: OrderRepository) {
    this.orderRepository = orderRepository;
  }

  public async createOrder(userId: number, data: OrderDTO): Promise<OrderDTO | null> {
    const { products, isPaid, status } = data;
    const newOrder = new Order();
    newOrder.isPaid = isPaid;
    newOrder.status = status;
    newOrder.products = products;
    try {
      const order = await this.orderRepository.create(newOrder);
      if (!order) {
        throw new Error(" Failed to create Order");
      }
      return orderToOrderDTO(order);
    }
    catch (error: any) {
      throw new Error(`Error Creating Order: ${error.message}`);
    }

  }

  public async getOrderById(id: number, userId: number): Promise<OrderDTO | null> {
    try {
      const order = await this.orderRepository.findByIdAndUserId(id, userId);
      if (!order) {
        return null;
      }
      return orderToOrderDTO(order);


    }
    catch (error: any) {
      throw new Error(`Error retrieving Order: ${error.message}`)
    }
  }

  public async getOrders(userId: number): Promise<OrderDTO[] | null> {
    try {
      const orders = await this.orderRepository.findByUserId(userId);
      if (!orders) {
        return null;
      }
      return ordersToOrdersDTO(orders);

    }
    catch (error: any) {
      throw new Error(`Error retrieving Order: ${error.message}`);

    }
  }


  public async updateOrder(id: number, status: OrderStatus): Promise<OrderDTO | null> {
    if (!status) {
      throw new Error("Please provide a new status to the order.")
    }
    try {
      const updateOrder = new Order();
      updateOrder.status = status;
      updateOrder.id = id;

      const order = await this.orderRepository.update(updateOrder);
      if (!order) {
        throw new Error("Order not Found");
      }
      return orderToOrderDTO(order);


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

