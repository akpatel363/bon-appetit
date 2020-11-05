import { ActivatedRoute } from "@angular/router";
import { Dish } from "src/app/shared/models/Dish";
import { UserService } from "../../services/user.service";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { Restaurant } from "src/app/shared/models/Restaurant";
import { RequestStatus } from "src/app/shared/models/RequestStatus";
import { Subscription } from "rxjs";

@Component({
  selector: "app-details",
  templateUrl: "./details.component.html",
  styleUrls: ["./details.component.scss"],
})
export class DetailsComponent implements OnInit, OnDestroy {
  details: Restaurant;
  status: RequestStatus;
  dishes: Array<Dish>;
  sub = new Subscription();
  constructor(private route: ActivatedRoute, private service: UserService) {}
  ngOnInit(): void {
    this.sub.add(
      this.route.paramMap.subscribe((map) => {
        this.details = this.dishes = null;
        this.getDetails(map.get("id"));
      })
    );
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
  getDetails(id) {
    this.status = RequestStatus.LOADING;
    this.service.getDetails(id).subscribe(
      (res) => {
        this.details = res["restaurant"];
        this.dishes = res["dishes"] as Array<Dish>;
        this.status = RequestStatus.SUCCESS;
      },
      () => (this.status = RequestStatus.ERROR)
    );
  }
}
