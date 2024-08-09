import { Request, Response } from 'express';
import { injectable, inject } from 'tsyringe';
import CartService from '../services/cart.service';
import { CartDTO } from '../DTO';
import { Cart } from '../models';

@injectable()
export class CartController {
    constructor(@inject(CartService) private cartService: CartService) {}

    async createCart(req: Request, res: Response): Promise<Cart>{
        try {
            const cartData: CartDTO = req.body;
            const cart = await this.cartService.createCart(cartData);
            res.status(201).json(cart);
            return cart;
        } catch (error: any) {
            res.status(400).json({ error: error.message });
            throw error;
        }
    }

    async getCartByUserId(req: Request, res: Response): Promise<Cart[] | null> {
        try {
            const userId = parseInt(req.params.id, 10);
            const cart = await this.cartService.getCartByUserId(userId);
            if (!cart) {
                res.status(404).json({ error: 'Cart not found' });
                return null;
            }
            res.json(cart);
            return cart;
        } catch (error: any) {
            res.status(500).json({ error: error.message });
            throw error;
        }
    }


    async updateCart(req: Request, res: Response): Promise<Cart | null> {
        try {
            const cartId = parseInt(req.params.id, 10);
            const cartData: CartDTO = req.body;
            const cart = await this.cartService.updateCart(cartId, cartData);
            if (!cart) {
                res.status(404).json({ error: 'Cart not found' });
                return null;
            }
            res.json(cart);
            return cart;
        } catch (error: any) {
            res.status(500).json({ error: error.message });
            throw error;
        }
    }

    async deleteCart(req: Request, res: Response): Promise<void> {
        try {
            const cartId = parseInt(req.params.id, 10);
            await this.cartService.deleteCart(cartId);
            res.status(204).send();
        } catch (error: any) {
            res.status(500).json({ error: error.message });
            throw error;
        }
    }
}