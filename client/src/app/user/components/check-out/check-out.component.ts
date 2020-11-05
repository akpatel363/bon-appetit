import { Component, OnDestroy } from "@angular/core";
import { CartService } from "../../services/cart.service";
import { UserService } from "../../services/user.service";
import { Router } from "@angular/router";
import { RequestStatus } from "src/app/shared/models/RequestStatus";
import { Subscription } from "rxjs";

@Component({
  selector: "app-checkout",
  templateUrl: "./check-out.component.html",
  styleUrls: ["./check-out.component.scss"],
})
export class CheckOutComponent implements OnDestroy {
  address: string;
  status: RequestStatus;
  sub = new Subscription();
  constructor(
    public cart: CartService,
    private user: UserService,
    private router: Router
  ) {}

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  submit(form) {
    if (form.valid) {
      this.status = RequestStatus.LOADING;
      this.sub.add(
        this.user
          .placeOrder({
            dishes: this.cart.getOrderDishes(),
            address: this.address,
          })
          .subscribe(
            (res) => {
              this.status = RequestStatus.SUCCESS;
              if (res["orderPlaced"]) {
                this.cart.clearAll();
                this.router.navigate(["/user/orders"]);
                alert("Order Placed");
              }
            },
            () => (this.status = RequestStatus.ERROR)
          )
      );
    }
  }
}
