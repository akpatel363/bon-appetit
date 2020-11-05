import { Component, Input } from "@angular/core";
import { Restaurant } from "src/app/shared/models/Restaurant";

@Component({
  selector: "restaurant",
  templateUrl: "./restaurant.component.html",
  styleUrls: ["./restaurant.component.scss"],
})
export class RestaurantComponent {
  @Input() rest: Restaurant;
  constructor() {}
}
