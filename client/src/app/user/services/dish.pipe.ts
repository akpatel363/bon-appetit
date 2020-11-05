import { Pipe, PipeTransform } from "@angular/core";
import { Dish } from "src/app/shared/models/Dish";

@Pipe({
  name: "dish",
})
export class DishPipe implements PipeTransform {
  transform(
    value: Dish,
    arg: string = "name",
    def: string = "Deleted Item",
    extra: string = ""
  ): any {
    if (!value) {
      return def;
    } else {
      return `${extra}${value[arg]}`;
    }
  }
}
