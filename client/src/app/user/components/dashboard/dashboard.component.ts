import { Dish } from "src/app/shared/models/Dish";
import { UserService } from "../../services/user.service";
import { Router, ActivatedRoute } from "@angular/router";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { AuthService } from "../../../shared/services/auth.service";
import { RequestStatus } from "src/app/shared/models/RequestStatus";
import { getPageNumber } from "src/app/shared/services/utils";
import { Subscription } from "rxjs";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit, OnDestroy {
  status: RequestStatus;
  search: string;
  dishes: Array<Dish>;
  page: number;
  sub = new Subscription();
  constructor(
    public authService: AuthService,
    private service: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.sub.add(
      this.route.queryParamMap.subscribe((params) => {
        this.page = getPageNumber(params.get("page"));
        this.dishes = null;
        this.getItems();
      })
    );
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
  getItems() {
    this.status = RequestStatus.LOADING;
    this.service.getItems(this.page).subscribe(
      (res) => {
        this.dishes = res as Array<Dish>;
        this.status = RequestStatus.SUCCESS;
      },
      () => (this.status = RequestStatus.ERROR)
    );
  }
  submit = () =>
    this.router.navigate(["/user/search"], {
      queryParams: { query: this.search },
    });
}
