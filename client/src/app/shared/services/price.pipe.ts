import { Pipe, PipeTransform } from "@angular/core";
import { OrderItem } from "../models/Order";

@Pipe({
  name: "price",
})
export class PricePipe implements PipeTransform {
  transform(oi: OrderItem): unknown {
    return oi.dish?.price
      ? `Rs.${oi.dish.price} x ${oi.quantity} = Rs.${
          oi.dish.price * oi.quantity
        }`
      : "Not Available";
  }
}
