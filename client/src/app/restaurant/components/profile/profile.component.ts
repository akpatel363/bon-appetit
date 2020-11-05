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
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    const {
      name = "",
      owner = "",
      address = "",
      email = "",
      contact = "",
      city = "",
    } = this.authService.getUser();
    this.profileForm = new FormGroup({
      name: new FormControl({ value: name, disabled: true }),
      owner: new FormControl({ value: owner, disabled: true }),
      address: new FormControl({ value: address, disabled: true }),
      email: new FormControl({ value: email, disabled: true }),
      contact: new FormControl({ value: contact, disabled: true }),
      city: new FormControl({ value: city, disabled: true }),
    });
  }
}
