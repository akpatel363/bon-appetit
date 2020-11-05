import { Dish } from "./Dish";
import { User } from "./User";

export interface OrderItem {
  quantity: number;
  dish?: Dish;
}

export interface Order {
  _id: string;
  address: string;
  dishes: Array<OrderItem>;
  time: Date;
  total: number;
  user?: User;
}
