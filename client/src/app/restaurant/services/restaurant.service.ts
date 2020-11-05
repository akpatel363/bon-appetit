import { throwError } from "rxjs";
import {
  AppError,
  ServerError,
  UnauthorizedError,
  NothingFoundError,
} from "../../shared/models/errors";
import { Injectable } from "@angular/core";
import { catchError } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { ErrorService } from "src/app/shared/services/error.service";

@Injectable({
  providedIn: "root",
})
export class RestaurantService {
  constructor(private http: HttpClient, private errorService: ErrorService) {}
  getOrders = (page: number = 1) =>
    this.http
      .get(`${environment.url}/order/restaurant?page=${page}`)
      .pipe(catchError(this.handleError));
  getDishes = (page: number = 1) =>
    this.http
      .get(`${environment.url}/dish/our?page=${page}`)
      .pipe(catchError(this.handleError));
  addDish = (body) =>
    this.http
      .post(`${environment.url}/dish`, body)
      .pipe(catchError(this.handleError));
  deleteDish = (_id) =>
    this.http
      .delete(`${environment.url}/dish/${_id}`)
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
