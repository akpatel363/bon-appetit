import { Restaurant } from "./Restaurant";
export class Dish {
  _id: string;
  name: string;
  price: number;
  category?: string;
  isVeg?: boolean;
  restaurant?: Restaurant;
}
