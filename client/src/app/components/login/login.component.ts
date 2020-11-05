import { Component, OnDestroy, OnInit } from "@angular/core";
import { AuthService } from "../../shared/services/auth.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { RequestStatus } from "src/app/shared/models/RequestStatus";
import { Status } from "src/app/shared/models/Status";
import { Subscription } from "rxjs";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  sub = new Subscription();
  status: RequestStatus = 2;

  constructor(private service: AuthService, private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: [
        null,
        Validators.compose([Validators.email, Validators.required]),
      ],
      password: [
        null,
        Validators.compose([Validators.required, Validators.minLength(8)]),
      ],
      isRest: [false],
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  getEmail = () => this.loginForm.controls["email"];

  getPassword = () => this.loginForm.controls["password"];

  submit() {
    if (this.loginForm.valid) {
      this.status = RequestStatus.LOADING;
      const type: Status = this.loginForm.value.isRest
        ? Status.RESTAURANT
        : Status.USER;
      this.login(type);
    } else this.loginForm.markAllAsTouched();
  }

  login(type: Status) {
    this.status = RequestStatus.LOADING;
    this.sub.add(
      this.service.authenticate(type, this.loginForm.value).subscribe(
        () => {},
        () => (this.status = RequestStatus.SUCCESS)
      )
    );
  }
}
