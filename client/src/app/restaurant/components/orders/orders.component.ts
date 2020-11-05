import { Component, OnInit, OnDestroy } from "@angular/core";
import { RestaurantService } from "../../services/restaurant.service";
import { ActivatedRoute } from "@angular/router";
import { Order } from "src/app/shared/models/Order";
import { RequestStatus } from "src/app/shared/models/RequestStatus";
import { Subscription } from "rxjs";
import { getPageNumber } from "src/app/shared/services/utils";

@Component({
  selector: "orders",
  templateUrl: "./orders.component.html",
  styleUrls: ["./orders.component.scss"],
})
export class OrdersComponent implements OnInit, OnDestroy {
  page: number;
  orders: Array<Order>;
  status: RequestStatus;
  sub = new Subscription();
  constructor(
    private rService: RestaurantService,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.sub.add(
      this.route.queryParamMap.subscribe((params) => {
        this.orders = null;
        this.page = getPageNumber(params.get("page"));
        this.getUserOrders();
      })
    );
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
  getUserOrders() {
    this.status = RequestStatus.LOADING;
    this.rService.getOrders(this.page).subscribe(
      (res) => {
        this.orders = res as Array<Order>;
        this.status = RequestStatus.SUCCESS;
      },
      () => (this.status = RequestStatus.ERROR)
    );
  }
}
