import { Injectable } from "@angular/core";
import { Router, NavigationStart } from "@angular/router";
import { Subject } from "rxjs";
import { filter } from "rxjs/operators";
import { ServerError } from "../models/errors/server.error";
import { LoginError } from "../models/errors/login.error";
import { UnauthorizedError } from "../models/errors/unauthorized.error";
import { NothingFoundError } from "../models/errors/notFound.error";

@Injectable({
  providedIn: "root",
})
export class ErrorService {
  onError = new Subject<string>();
  constructor() {}
  errorOccurred = (err) => {
    let error = "An unknown error occurred.";
    if (err instanceof LoginError) error = "Wrong email or password.";
    else if (err instanceof UnauthorizedError)
      error = "You are not authorized.";
    else if (err instanceof NothingFoundError) error = "Nothing found.";
    else if (err instanceof ServerError) error = "Internal server error.";
    this.onError.next(error);
  };
  removeError = () => this.onError.next(null);
}
