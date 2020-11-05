import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DishPipe } from "./services/dish.pipe";
import { OrderGuard } from "./services/order.guard";
import { RouterModule, Routes } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { CartComponent } from "./components/cart/cart.component";
import { DishComponent } from "./components/dish/dish.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SearchComponent } from "./components/search/search.component";
import { OrdersComponent } from "./components/orders/orders.component";
import { DetailsComponent } from "./components/details/details.component";
import { ProfileComponent } from "./components/profile/profile.component";
import { CartItemComponent } from "./components/cart-item/cart-item.component";
import { CheckOutComponent } from "./components/check-out/check-out.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { OrderItemComponent } from "./components/order-item/order-item.component";
import { RestaurantComponent } from "./components/restaurant/restaurant.component";
import { RestaurantsComponent } from "./components/restaurants/restaurants.component";

const routes: Routes = [
  { path: "cart", component: CartComponent },
  { path: "search", component: SearchComponent },
  { path: "orders", component: OrdersComponent },
  { path: "profile", component: ProfileComponent },
  { path: "dashboard", component: DashboardComponent },
  { path: "details/:id", component: DetailsComponent },
  { path: "restaurants", component: RestaurantsComponent },
  {
    path: "check-out",
    component: CheckOutComponent,
    canActivate: [OrderGuard],
  },
  {
    path: "**",
    redirectTo: "dashboard",
  },
];

@NgModule({
  declarations: [
    DishPipe,
    DishComponent,
    CartComponent,
    SearchComponent,
    OrdersComponent,
    DetailsComponent,
    ProfileComponent,
    CheckOutComponent,
    CartItemComponent,
    DashboardComponent,
    OrderItemComponent,
    RestaurantComponent,
    RestaurantsComponent,
  ],
  imports: [
    FormsModule,
    SharedModule,
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ],
})
export class UserModule {}
