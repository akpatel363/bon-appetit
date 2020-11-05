import { Component, Input } from "@angular/core";

@Component({
  selector: "pagination",
  templateUrl: "./pagination.component.html",
  styleUrls: ["./pagination.component.scss"],
})
export class PaginationComponent {
  @Input() page: number;
  @Input() link;
  @Input() query = {};
  constructor() {}
  getParams = (n) => ({ ...this.query, page: this.page + n });
}
