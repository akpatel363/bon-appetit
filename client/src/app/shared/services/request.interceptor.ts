import {
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpEvent,
} from "@angular/common/http";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";
import { Injectable } from "@angular/core";

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
  constructor(private service: AuthService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (this.service.getToken() != null) {
      const clonedReq = req.clone({
        setHeaders: { Authorization: `Bearer ${this.service.getToken()}` },
      });
      return next.handle(clonedReq);
    }
    return next.handle(req);
  }
}
