import { Dish } from "src/app/shared/models/Dish";
import { Component, Input, OnInit } from "@angular/core";
import { CartService } from "../../services/cart.service";

@Component({
  selector: "dish",
  templateUrl: "./dish.component.html",
  styleUrls: ["./dish.component.scss"],
})
export class DishComponent implements OnInit {
  @Input() dish: Dish;
  @Input() delete = false;
  quantity: number;
  constructor(public service: CartService) {}
  ngOnInit() {
    this.quantity = this.service.isInCart(this.dish._id);
  }
  add() {
    this.quantity = this.service.addToCart(this.dish);
  }
  remove() {
    this.quantity = this.service.removeFromCart(this.dish);
  }
}
