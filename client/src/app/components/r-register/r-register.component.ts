import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AuthService } from "../../shared/services/auth.service";
import { RequestStatus } from "src/app/shared/models/RequestStatus";
import { Subscription } from "rxjs";

@Component({
  selector: "r-register",
  templateUrl: "./r-register.component.html",
  styleUrls: ["./r-register.component.scss"],
})
export class RRegisterComponent implements OnInit, OnDestroy {
  regForm: FormGroup;
  status: RequestStatus = RequestStatus.SUCCESS;
  sub = new Subscription();

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {}
  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  ngOnInit() {
    this.regForm = this.formBuilder.group({
      name: [null, Validators.required],
      owner: [null, Validators.required],
      email: [
        null,
        Validators.compose([Validators.required, Validators.email]),
      ],
      contact: [
        null,
        Validators.compose([
          Validators.pattern(/^[6-9]\d{9}/g),
          Validators.required,
          Validators.maxLength(10),
        ]),
      ],
      city: [null, Validators.required],
      address: [null, Validators.required],
      password: [
        null,
        Validators.compose([Validators.required, Validators.minLength(8)]),
      ],
    });
  }

  getName = () => this.regForm.controls["name"];
  getOwner = () => this.regForm.controls["owner"];
  getEmail = () => this.regForm.controls["email"];
  getContact = () => this.regForm.controls["contact"];
  getCity = () => this.regForm.controls["city"];
  getAddress = () => this.regForm.controls["address"];
  getPassword = () => this.regForm.controls["password"];

  submit() {
    if (this.regForm.valid) {
      this.status = 2;
      this.sub.add(
        this.authService.registerRestaurant(this.regForm.value).subscribe(
          () => {},
          () => (this.status = RequestStatus.SUCCESS)
        )
      );
    } else {
      this.regForm.markAllAsTouched();
    }
  }
}
