import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { CartService } from "./cart.service";

@Injectable({
  providedIn: "root",
})
export class OrderGuard implements CanActivate {
  constructor(private cart: CartService, private router: Router) {}
  canActivate() {
    if (this.cart.getQuantity() > 0) return true;
    this.router.navigate(["user/cart"]);
    return false;
  }
}
