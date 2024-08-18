import { Request, Response } from 'express'
import { injectable, inject } from 'tsyringe'
import CartService from '../services/cart.service'
import { CartDTO } from '../Types/DTO'
import { Cart } from '../models'

@injectable()
export class CartController {
  
  constructor(@inject(CartService) private cartService: CartService) {}

  async createCart(req: Request, res: Response): Promise<Cart> {
    try {
      const userId: number = req.body.userId;
      const productId: number = req.body.products.productId;
      const quantity: number = req.body.products.quantity;

      const cartData: CartDTO = {
        userId,
        products: [],
      };

      const cart = await this.cartService.createCart(
        cartData,
        productId,
        quantity
      );

      res
        .status(201)
        .json({ message: "Cart created and product added successfully", cart });
      return cart; // Add this line to return the 'cart' value
    } catch (error: any) {
      res.status(500).json({ error: error.message });
      throw error;
    }
  }
  

  async getCartByUserId(req: Request, res: Response): Promise<Cart[] | null> {
    try {
      const userId = parseInt(req.params.id, 10)
      const cart = await this.cartService.getCartByUserId(userId)
      if (!cart) {
        res.status(404).json({ error: 'Cart not found' })
        return null
      }
      res.json(cart)
      return cart
    } catch (error: any) {
      res.status(500).json({ error: error.message })
      throw error
    }
  }

  async updateCart(req: Request, res: Response): Promise<Cart | null> {
    try {
      const cartId = parseInt(req.params.id, 10)
      const cartData: CartDTO = req.body
      const cart = await this.cartService.updateCart(cartId, cartData)
      if (!cart) {
        res.status(404).json({ error: 'Cart not found' })
        return null
      }
      res.json(cart)
      return cart
    } catch (error: any) {
      res.status(500).json({ error: error.message })
      throw error
    }
  }

  async deleteCart(req: Request, res: Response): Promise<void> {
    try {
      const cartId = parseInt(req.params.id, 10)
      await this.cartService.deleteCart(cartId)
      res.status(204).send()
    } catch (error: any) {
      res.status(500).json({ error: error.message })
      throw error
    }
  }

  async updateProductQuantity(req: Request, res: Response): Promise<void> {
    try {
      const cartId = parseInt(req.params.cartId, 10)
      const productId = parseInt(req.params.productId, 10)
      const { quantity } = req.body

      const success = await this.cartService.updateProductQuantity(
        cartId,
        productId,
        quantity
      );

      if (success) {
        res
          .status(200)
          .json({ message: "Product quantity updated successfully" });
      } else {
        res.status(400).json({ error: 'Failed to update product quantity' })
      }
    } catch (error: any) {
      res.status(500).json({ error: error.message })
    }
  }

  // add product to cart
  async addProductToCart(req: Request, res: Response): Promise<void> {
    try {
      const cartId = parseInt(req.params.cartId, 10)
      const productId = parseInt(req.params.productId, 10)
      const { quantity } = req.body

      const success = await this.cartService.addProductToCart(
        cartId,
        productId,
        quantity
      );

      if (success) {
        res.status(200).json({ message: 'Product added to cart successfully' })
      } else {
        res.status(400).json({ error: 'Failed to add product to cart' })
      }
    } catch (error: any) {
      res.status(500).json({ error: error.message })
    }
  }

  // remove product from cart
  async removeProductFromCart(req: Request, res: Response): Promise<void> {
    try {
      const cartId = parseInt(req.params.cartId, 10);
      const productId = parseInt(req.params.productId, 10);

      const success = await this.cartService.removeProductFromCart(
        cartId,
        productId
      );

      if (success) {
        res
          .status(200)
          .json({ message: "Product removed from cart successfully" });
      } else {
        res.status(400).json({ error: "Failed to remove product from cart" });
      }
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}
