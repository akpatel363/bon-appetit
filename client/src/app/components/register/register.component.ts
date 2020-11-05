import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AuthService } from "../../shared/services/auth.service";
import { Subscription } from "rxjs";
import { RequestStatus } from "src/app/shared/models/RequestStatus";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent implements OnInit, OnDestroy {
  regForm: FormGroup;
  status: RequestStatus = RequestStatus.SUCCESS;
  sub = new Subscription();

  constructor(private authService: AuthService, private builder: FormBuilder) {}

  ngOnInit() {
    this.regForm = this.builder.group({
      name: [null, Validators.required],
      email: [
        null,
        Validators.compose([Validators.required, Validators.email]),
      ],
      city: [null, Validators.required],
      password: [
        null,
        Validators.compose([Validators.required, Validators.minLength(8)]),
      ],
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  getName = () => this.regForm.controls["name"];
  getEmail = () => this.regForm.controls["email"];
  getPassword = () => this.regForm.controls["password"];
  getCity = () => this.regForm.controls["city"];

  submit() {
    if (this.regForm.valid) {
      this.status = RequestStatus.LOADING;
      this.sub.add(
        this.authService.registerUser(this.regForm.value).subscribe(
          () => {},
          () => (this.status = RequestStatus.SUCCESS)
        )
      );
    } else {
      this.regForm.markAllAsTouched();
    }
  }
}
