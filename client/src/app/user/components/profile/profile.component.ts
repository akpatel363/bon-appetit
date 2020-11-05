import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { AuthService } from "src/app/shared/services/auth.service";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  constructor(private service: AuthService) {}
  ngOnInit(): void {
    const { name = "", email = "", city = "" } = this.service.getUser();
    this.profileForm = new FormGroup({
      name: new FormControl({
        value: name,
        disabled: true,
      }),
      email: new FormControl({
        value: email,
        disabled: true,
      }),
      city: new FormControl({
        value: city,
        disabled: true,
      }),
    });
  }
}
