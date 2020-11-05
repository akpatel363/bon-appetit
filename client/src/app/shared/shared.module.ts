import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { PricePipe } from "./services/price.pipe";
import { EmptyComponent } from "./components/empty/empty.component";
import { SpinnerComponent } from "./components/spinner/spinner.component";
import { PaginationComponent } from "./components/pagination/pagination.component";

@NgModule({
  declarations: [
    PricePipe,
    EmptyComponent,
    SpinnerComponent,
    PaginationComponent,
  ],
  imports: [CommonModule, RouterModule],
  exports: [PricePipe, EmptyComponent, SpinnerComponent, PaginationComponent],
})
export class SharedModule {}
