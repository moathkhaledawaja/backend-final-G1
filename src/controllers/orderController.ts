import { Request, Response } from 'express';
import { injectable, inject } from 'tsyringe';
import OrderService from '../services/order.service';
import { OrderDTO } from '../Types/DTO';
import CartService from '../services/cart.service';
import { OrderStatus } from '../enums/OrderStatusEnum';
import { BadRequestError } from '../Errors/BadRequestError';

@injectable()
export class OrderController {
  constructor(@inject(OrderService) private orderService: OrderService, @inject(CartService) private cartService: CartService) { }

  async createOrder(req: Request, res: Response): Promise<OrderDTO> {
    try {
      const orderData: OrderDTO = req.body;
      const userId = req.user!.id;
      // const cart = this.cartService.getCartByUserId(userId);

      const order = this.orderService.createOrder(userId, cart);
      res.status(201).json(order);
      return order;
    } catch (error: any) {
      res.status(400).json({ error: error.message });
      throw error;
    }
  }

  async getOrderByUserId(req: Request, res: Response): Promise<OrderDTO | null> {
    try {
      const id = req.params.id as unknown as number;
      const userId = req.user!.id;
      const order = await this.orderService.getOrderById(id, userId);
      if (!order) {
        res.status(404).json({ error: 'Order not found' });
        return null;
      }
      res.json(order);
      return order;
    } catch (error: any) {
      res.status(500).json({ error: error.message });
      throw error;
    }
  }

  async getOrdersByUserId(req: Request, res: Response): Promise<OrderDTO[] | null> {
    try {
      const userId = req.user!.id;
      const orders = await this.orderService.getOrders(userId);
      if (!orders) {
        res.status(404).json({ error: 'No Orders found' });
        return null;
      }
      res.json(orders);
      return orders;
    } catch (error: any) {
      res.status(500).json({ error: error.message });
      throw error;
    }
  }
  async updateOrder(req: Request, res: Response): Promise<OrderDTO | null> {
    try {
      const id = req.params.id as unknown as number;
      const userId = req.user!.id;
      const newStatus: OrderStatus = req.body.status;
      const isPaid = req.body.isPaid;
      const order = await this.orderService.updateOrder(id, userId, newStatus, isPaid);
      if (!order) {
        res.status(404).json({ error: 'Order not found' });
        return null;
      }
      res.json(order);
      return order;
    } catch (error: any) {
      if (error instanceof BadRequestError)
        res.status(400).json({ error: error.message });
      else
        res.status(500).json({ error: error.message });
      throw error;
    }
  }

  async deleteOrder(req: Request, res: Response): Promise<boolean> {
    try {
      const id = req.params.id as unknown as number;
      const userId = req.user!.id;
      const canceled = await this.orderService.cancelOrder(id, userId);
      if (!canceled) {
        res.status(400).json({ error: 'Order can only be canceled if it is created by the user and status is processed' });
      }
      res.status(204).send(canceled);
      return canceled;
    } catch (error: any) {
      res.status(500).json({ error: error.message });
      throw error;
    }
  }
}