import { Router } from "@angular/router";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { RestaurantService } from "../../services/restaurant.service";
import { RequestStatus } from "src/app/shared/models/RequestStatus";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Subscription } from "rxjs";

@Component({
  selector: "app-add-dish",
  templateUrl: "./add-dish.component.html",
  styleUrls: ["./add-dish.component.scss"],
})
export class AddDishComponent implements OnInit, OnDestroy {
  form: FormGroup;
  status: RequestStatus;
  sub = new Subscription();
  constructor(
    private builder: FormBuilder,
    public service: RestaurantService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.builder.group({
      name: [null, Validators.required],
      category: [null, Validators.required],
      isVeg: [false, Validators.required],
      price: [
        30,
        Validators.compose([Validators.required, Validators.min(30)]),
      ],
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  getName = () => this.form.controls["name"];
  getCategory = () => this.form.controls["category"];
  getPrice = () => this.form.controls["price"];

  submit() {
    if (this.form.valid) {
      this.status = RequestStatus.LOADING;
      this.sub.add(
        this.service.addDish(this.form.value).subscribe(
          (res) => {
            alert(res["message"]);
            this.router.navigate(["/restaurant/dishes"]);
          },
          //Error will be shown and RequestStatus.SUCCESS to show the form again
          () => (this.status = RequestStatus.SUCCESS)
        )
      );
    } else {
      this.form.markAllAsTouched();
    }
  }
}
