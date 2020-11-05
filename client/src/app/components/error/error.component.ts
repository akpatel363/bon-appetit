import { Component, OnDestroy, OnInit } from "@angular/core";
import { NavigationStart, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { filter } from "rxjs/operators";
import { ErrorService } from "../../shared/services/error.service";

@Component({
  selector: "error",
  templateUrl: "./error.component.html",
  styleUrls: ["./error.component.scss"],
})
export class ErrorComponent implements OnInit, OnDestroy {
  error: string;
  sub = new Subscription();
  constructor(private service: ErrorService, private router: Router) {}
  ngOnInit(): void {
    this.sub.add(
      this.router.events
        .pipe(filter((e) => e instanceof NavigationStart))
        .subscribe(() => {
          this.error = null;
        })
    );
    this.sub.add(
      this.service.onError.subscribe((err) => {
        this.error = err;
      })
    );
  }
  close() {
    this.error = null;
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
