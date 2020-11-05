import { Component, Input } from "@angular/core";
import { CartItem } from "../../models/cart-items";
import { CartService } from "../../services/cart.service";

@Component({
  selector: "cart-item",
  templateUrl: "./cart-item.component.html",
  styleUrls: ["./cart-item.component.scss"],
})
export class CartItemComponent {
  @Input() item: CartItem;
  constructor(public cart: CartService) {}

  removeFromCart() {
    this.cart.removeFromCartComponent(this.item.dish);
  }
  addToCart() {
    this.cart.addFromCartComponent(this.item.dish);
  }
}
