import { Request, Response } from 'express';
import { injectable, inject } from 'tsyringe';
import OrderService from '../services/order.service';
import { OrderDTO } from '../DTO';
import CartService from '../services/cart.service';
import { OrderStatus } from '../enums/OrderStatusEnum';

@injectable()
export class OrderController {
  constructor(@inject(OrderService) private orderService: OrderService, @inject(CartService) private cartService: CartService) { }

  async createCart(req: Request, res: Response): Promise<OrderDTO> {
    try {
      const orderData: OrderDTO = req.body;
      const userId = (req as any).user.id;
      const cart = this.cartService.getCartByUserId(userId);

      res.status(201).json(order);
      return;
    } catch (error: any) {
      res.status(400).json({ error: error.message });
      throw error;
    }
  }

  async getOrderByUserId(req: Request, res: Response): Promise<OrderDTO | null> {
    try {
      const id = req.params.id;
      const userId = (req as any).user.id;
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
      const userId = (req as any).user.id;
      const orders = await this.orderService.getOrders(userId);
      if (!orders) {
        res.status(404).json({ error: 'Order not found' });
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
      const id = req.params.id;
      const newStatus: OrderStatus = req.body;
      const order = await this.orderService.updateOrder(id, newStatus);
      if (!order) {
        res.status(404).json({ error: 'Cart not found' });
        return null;
      }
      res.json(order);
      return order;
    } catch (error: any) {
      res.status(500).json({ error: error.message });
      throw error;
    }
  }

  async deleteOrder(req: Request, res: Response): Promise<boolean> {
    try {
      const id = req.params.id;
      const canceled = await this.orderService.cancelOrder(id);
      res.status(204).send(canceled);
      return canceled;
    } catch (error: any) {
      res.status(500).json({ error: error.message });
      throw error;
    }
  }
}