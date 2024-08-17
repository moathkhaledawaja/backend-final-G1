import { Product } from "../../models";
import { OrderStatus } from "../../enums/OrderStatusEnum";

export type OrderDTO = {
  status: OrderStatus;
  isPaid: boolean;
  products: Product[];
}


