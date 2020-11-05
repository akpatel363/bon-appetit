import { BehaviorSubject, throwError } from "rxjs";
import { User } from "../models/User";
import { Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { CartService } from "../../user/services/cart.service";
import { ErrorService } from "./error.service";
import { map, catchError } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { LoginError, AppError, ServerError } from "../models/errors";
import { Status } from "../models/Status";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private token: string;
  private user: User;
  private authSubject = new BehaviorSubject<Status>(Status.NONE);

  constructor(
    private router: Router,
    private http: HttpClient,
    private cart: CartService,
    private errorService: ErrorService
  ) {
    this.token = localStorage.getItem("token");
    this.user = JSON.parse(localStorage.getItem("user"));
    this.authSubject.next(this.getAuthStatus());
    this.redirect();
  }

  private redirect() {
    if (this.getAuthStatus() == Status.USER)
      return this.router.navigate(["user", "dashboard"]);
    if (this.getAuthStatus() == Status.RESTAURANT)
      return this.router.navigate(["restaurant", "orders"]);
    return;
  }

  private setUpUser(res: any, s: string) {
    this.token = res.token;
    this.user = res[s] as User;
    if (s == "user") this.authSubject.next(Status.USER);
    else this.authSubject.next(Status.RESTAURANT);
    localStorage.setItem("token", this.token);
    localStorage.setItem("user", JSON.stringify(this.user));
    this.redirect();
    return true;
  }

  private handleError = (err) => {
    if (err.status == 400) this.errorService.errorOccurred(new LoginError());
    else if (err.status == 500)
      this.errorService.errorOccurred(new ServerError());
    else this.errorService.errorOccurred(new AppError());
    return throwError(new AppError());
  };

  private loginUser = (body) =>
    this.http.post(`${environment.url}/user/login`, body).pipe(
      map((res) => this.setUpUser(res, "user")),
      catchError(this.handleError)
    );

  private loginRestaurant = (body) =>
    this.http.post(`${environment.url}/restaurant/login`, body).pipe(
      map((res) => this.setUpUser(res, "restaurant")),
      catchError(this.handleError)
    );

  getUser = () => this.user;

  getToken = () => this.token;

  getAuthSubject = () => this.authSubject;

  getAuthStatus = () => {
    return this.token
      ? this.user["isRestaurant"]
        ? Status.RESTAURANT
        : Status.USER
      : Status.NONE;
  };

  authenticate = (type: Status, { email, password }) => {
    if (type === Status.USER) return this.loginUser({ email, password });
    else return this.loginRestaurant({ email, password });
  };

  registerUser = (body) =>
    this.http.post(`${environment.url}/user/register`, body).pipe(
      map((res) => this.setUpUser(res, "user")),
      catchError(this.handleError)
    );

  registerRestaurant = (body) =>
    this.http.post(`${environment.url}/restaurant/register`, body).pipe(
      map((res) => this.setUpUser(res, "restaurant")),
      catchError(this.handleError)
    );

  logOut() {
    this.router.navigate(["/login"]);
    this.token = this.user = null;
    this.cart.clearAll();
    localStorage.clear();
    this.authSubject.next(Status.NONE);
  }
}
