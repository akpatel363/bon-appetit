import { Component, Input } from "@angular/core";

@Component({
  selector: "empty",
  templateUrl: "./empty.component.html",
  styleUrls: ["./empty.component.scss"],
})
export class EmptyComponent {
  @Input() message = "Nothing Found.";
  constructor() {}
}
