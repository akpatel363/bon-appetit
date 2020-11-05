import { ActivatedRoute } from "@angular/router";
import { UserService } from "../../services/user.service";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { Restaurant } from "src/app/shared/models/Restaurant";
import { RequestStatus } from "src/app/shared/models/RequestStatus";
import { getPageNumber } from "src/app/shared/services/utils";
import { Subscription } from "rxjs";

@Component({
  selector: "app-restaurants",
  templateUrl: "./restaurants.component.html",
  styleUrls: ["./restaurants.component.scss"],
})
export class RestaurantsComponent implements OnInit, OnDestroy {
  page: number;
  sub = new Subscription();
  status: RequestStatus;
  rests: Array<Restaurant>;
  constructor(public service: UserService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.sub.add(
      this.route.queryParamMap.subscribe((params) => {
        this.rests = null;
        this.page = getPageNumber(params.get("page"));
        this.getRests();
      })
    );
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
  getRests() {
    this.status = RequestStatus.LOADING;
    this.service.getRestaurants(this.page).subscribe(
      (res) => {
        this.rests = res as Array<Restaurant>;
        this.status = RequestStatus.SUCCESS;
      },
      () => (this.status = RequestStatus.ERROR)
    );
  }
}
