import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { CartItem } from "../../models/cart-items";
import { CartService } from "../../services/cart.service";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.scss"],
})
export class CartComponent implements OnInit, OnDestroy {
  cartItems: Array<CartItem>;
  sub: Subscription;

  constructor(public cart: CartService) {}

  ngOnInit(): void {
    this.sub = this.cart.getCartItems().subscribe((cartItems) => {
      this.cartItems = cartItems;
    });
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
