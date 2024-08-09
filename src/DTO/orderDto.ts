import { OrderStatus } from "../enums/OrderStatusEnum";

export type OrderDTO = {
  userId: number;
  status: OrderStatus;
  isPaid: boolean;
  products: {
    productId: number;
    quantity: number;
    totalPrice: number;
  }[];
};


