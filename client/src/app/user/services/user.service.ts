import { throwError } from "rxjs";
import {
  AppError,
  NothingFoundError,
  ServerError,
  UnauthorizedError,
} from "../../shared/models/errors";
import { Injectable } from "@angular/core";
import { catchError } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { ErrorService } from "../../shared/services/error.service";

@Injectable({
  providedIn: "root",
})
export class UserService {
  constructor(private errorService: ErrorService, private http: HttpClient) {}

  getItems = (page: number = 1) =>
    this.http
      .get(`${environment.url}/dish?page=${page}`)
      .pipe(catchError(this.handleError));

  searchItems = (search, page: number = 1) =>
    this.http
      .get(
        `${environment.url}/dish/search/${encodeURIComponent(
          search
        )}?page=${page}`
      )
      .pipe(catchError(this.handleError));

  getProfile = () =>
    this.http
      .get(`${environment.url}/user/me`)
      .pipe(catchError(this.handleError));

  placeOrder = (body) =>
    this.http
      .post(`${environment.url}/order/place`, body)
      .pipe(catchError(this.handleError));

  getOrders = (page: number = 1) =>
    this.http
      .get(`${environment.url}/order/user?page=${page}`)
      .pipe(catchError(this.handleError));

  getRestaurants = (page: number = 1) =>
    this.http
      .get(`${environment.url}/restaurant?page=${page}`)
      .pipe(catchError(this.handleError));

  getDetails = (id) =>
    this.http
      .get(`${environment.url}/restaurant/${id}`)
      .pipe(catchError(this.handleError));

  handleError = (err) => {
    if (err.status == 404)
      this.errorService.errorOccurred(new NothingFoundError());
    else if (err.status == 500)
      this.errorService.errorOccurred(new ServerError());
    else if (err.status == 401)
      this.errorService.errorOccurred(new UnauthorizedError());
    else this.errorService.errorOccurred(new AppError());
    return throwError(new AppError());
  };
}
