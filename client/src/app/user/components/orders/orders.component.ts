import { ActivatedRoute } from "@angular/router";
import { Order } from "src/app/shared/models/Order";
import { UserService } from "../../services/user.service";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { RequestStatus } from "src/app/shared/models/RequestStatus";
import { Subscription } from "rxjs";
import { getPageNumber } from "src/app/shared/services/utils";

@Component({
  selector: "app-orders",
  templateUrl: "./orders.component.html",
  styleUrls: ["./orders.component.scss"],
})
export class OrdersComponent implements OnInit, OnDestroy {
  orders: Array<Order>;
  page: number;
  sub = new Subscription();
  status: RequestStatus;
  constructor(private user: UserService, private route: ActivatedRoute) {}
  ngOnInit() {
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
    this.user.getOrders(this.page).subscribe(
      (res) => {
        this.orders = res as Array<Order>;
        this.status = RequestStatus.SUCCESS;
      },
      () => (this.status = RequestStatus.ERROR)
    );
  }
}
