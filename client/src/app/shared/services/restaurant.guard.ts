import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { Status } from "../models/Status";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: "root",
})
export class RestaurantGuard implements CanActivate {
  constructor(private service: AuthService, private router: Router) {}
  canActivate() {
    if (this.service.getAuthStatus() != Status.RESTAURANT) {
      this.router.navigate(["/login"]);
      return false;
    }
    return true;
  }
}
