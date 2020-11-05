import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { Dish } from "src/app/shared/models/Dish";
import { RequestStatus } from "src/app/shared/models/RequestStatus";
import { getPageNumber } from "src/app/shared/services/utils";
import { UserService } from "../../services/user.service";

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.scss"],
})
export class SearchComponent implements OnInit, OnDestroy {
  query: string;
  sub = new Subscription();
  dishes: Array<Dish>;
  page: number;
  status: RequestStatus;
  constructor(
    private route: ActivatedRoute,
    private service: UserService,
    private router: Router
  ) {}
  ngOnInit() {
    this.sub.add(
      this.route.queryParamMap.subscribe((map) => {
        if (!map.get("query")) return this.router.navigate(["/user/dashboard"]);
        this.dishes = null;
        this.page = getPageNumber(map.get("page"));
        this.query = map.get("query");
        this.searchItems();
      })
    );
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
  searchItems() {
    this.status = RequestStatus.LOADING;
    this.service.searchItems(this.query, this.page).subscribe(
      (res) => {
        this.dishes = res as Array<Dish>;
        this.status = RequestStatus.SUCCESS;
      },
      () => (this.status = RequestStatus.ERROR)
    );
  }
  submit(e) {
    if (e.valid)
      this.router.navigate(["/user/search"], {
        queryParams: { query: this.query },
      });
  }
}
