import { Component, OnInit, OnDestroy } from "@angular/core";
import { RestaurantService } from "../../services/restaurant.service";
import { ActivatedRoute } from "@angular/router";
import { RequestStatus } from "src/app/shared/models/RequestStatus";
import { getPageNumber } from "src/app/shared/services/utils";
import { Dish } from "src/app/shared/models/Dish";
import { Subscription } from "rxjs";

@Component({
  selector: "app-dishes",
  templateUrl: "./dishes.component.html",
  styleUrls: ["./dishes.component.scss"],
})
export class DishesComponent implements OnInit, OnDestroy {
  dishes: Array<Dish>;
  page: number;
  sub = new Subscription();
  status: RequestStatus;
  constructor(
    private service: RestaurantService,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.sub.add(
      this.route.queryParamMap.subscribe((params) => {
        this.dishes = null;
        this.page = getPageNumber(params.get("page"));
        this.getDishes();
      })
    );
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
  getDishes() {
    this.status = RequestStatus.LOADING;
    this.service.getDishes(this.page).subscribe(
      (res) => {
        this.dishes = res as Array<Dish>;
        this.status = RequestStatus.SUCCESS;
      },
      () => (this.status = RequestStatus.ERROR)
    );
  }
  deleteDish(_id) {
    const index = this.dishes.findIndex((e) => e._id == _id);
    const res = confirm(
      `Are your sure you want to delete ${this.dishes[index].name}`
    );
    if (!res) return;
    this.status = RequestStatus.LOADING;
    this.service.deleteDish(_id).subscribe(
      (res) => {
        res["deleted"]
          ? this.dishes.splice(index, 1)
          : alert("Unable to delete the dish.");
        this.status = RequestStatus.SUCCESS;
      },
      () => (this.status = RequestStatus.SUCCESS)
    );
  }
}
