import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { User } from "src/app/shared/models/User";
import { Status } from "../../shared/models/Status";
import { AuthService } from "../../shared/services/auth.service";
import { CartService } from "../../user/services/cart.service";

@Component({
  selector: "app-navigation",
  templateUrl: "./navigation.component.html",
  styleUrls: ["./navigation.component.scss"],
})
export class NavigationComponent implements OnInit, OnDestroy {
  status: Status;
  subscription: Subscription;
  user: User;
  url: string = "";
  constructor(public service: AuthService, public cart: CartService) {}

  ngOnInit(): void {
    this.subscription = this.service.getAuthSubject().subscribe((status) => {
      this.status = status;
      this.user = this.service.getUser();
      if (this.status == Status.RESTAURANT) this.url = "/restaurant/profile";
      else if (this.status == Status.USER) this.url = "/user/profile";
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  logOut() {
    this.service.logOut();
  }
}
