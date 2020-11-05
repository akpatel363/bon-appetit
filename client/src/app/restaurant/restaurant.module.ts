import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { HttpClientModule } from "@angular/common/http";
import { DishComponent } from "./components/dish/dish.component";
import { DishesComponent } from "./components/dishes/dishes.component";
import { ProfileComponent } from "./components/profile/profile.component";
import { OrdersComponent } from "./components/orders/orders.component";
import { AddDishComponent } from "./components/add-dish/add-dish.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { OrderItemComponent } from "./components/order-item/order-item.component";

const routes: Routes = [
  { path: "orders", component: OrdersComponent },
  { path: "dishes", component: DishesComponent },
  { path: "add-dish", component: AddDishComponent },
  { path: "profile", component: ProfileComponent },
];

@NgModule({
  declarations: [
    DishComponent,
    DishesComponent,
    OrdersComponent,
    AddDishComponent,
    ProfileComponent,
    OrderItemComponent,
  ],
  imports: [
    FormsModule,
    CommonModule,
    SharedModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ],
})
export class RestaurantModule {}
