import { Component, Input, Output, EventEmitter } from "@angular/core";
import { Dish } from "src/app/shared/models/Dish";

@Component({
  selector: "dish",
  templateUrl: "./dish.component.html",
  styleUrls: ["./dish.component.scss"],
})
export class DishComponent {
  @Input() dish: Dish;
  @Output() delete = new EventEmitter<any>();
  constructor() {}
  deleteDish = () => this.delete.emit(this.dish._id);
}
