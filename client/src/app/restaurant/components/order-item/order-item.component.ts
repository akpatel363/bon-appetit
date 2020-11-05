import { Component, Input } from "@angular/core";
import { Order } from "src/app/shared/models/Order";

@Component({
  selector: "order-item",
  templateUrl: "./order-item.component.html",
  styleUrls: ["./order-item.component.scss"],
})
export class OrderItemComponent {
  @Input() order: Order;
  constructor() {}
}
