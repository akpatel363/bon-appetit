import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Dish } from "src/app/shared/models/Dish";
import { CartItem } from "../models/cart-items";

@Injectable({
  providedIn: "root",
})
export class CartService {
  private cart = {};
  private items = {};
  private total = 0;
  private quantity = 0;
  private cartItems = new BehaviorSubject<CartItem[]>(null);

  constructor() {}

  addToCart(item: Dish): number {
    const id = item._id;
    if (!this.cart[id]) {
      this.items[id] = item;
      this.cart[id] = 0;
    }
    this.cart[id]++;
    this.total += item.price;
    this.quantity++;
    return this.cart[id];
  }

  removeFromCart(item: Dish): number {
    const id = item._id;
    this.cart[id]--;
    if (this.cart[id] == 0) {
      delete this.cart[id];
      delete this.items[id];
    }
    this.total -= item.price;
    this.quantity--;
    return this.cart[id];
  }

  isInCart(_id): number {
    return this.cart[_id];
  }

  clearAll() {
    this.cart = {};
    this.items = {};
    this.total = this.quantity = 0;
  }

  private makeCartItemsArray = () =>
    Object.keys(this.cart).map(
      (k) =>
        ({
          quantity: this.cart[k],
          dish: this.items[k],
        } as CartItem)
    );

  getCartItems() {
    this.cartItems.next(this.makeCartItemsArray());
    return this.cartItems;
  }

  addFromCartComponent(item: Dish) {
    this.addToCart(item);
    this.cartItems.next(this.makeCartItemsArray());
  }
  removeFromCartComponent(item: Dish) {
    this.removeFromCart(item);
    this.cartItems.next(this.makeCartItemsArray());
  }

  getTotal = () => this.total;

  getQuantity = () => this.quantity;

  getOrderDishes = () => {
    return Object.keys(this.cart).map((k) => ({
      quantity: this.cart[k],
      dish: k,
    }));
  };
}
