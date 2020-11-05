import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { SharedModule } from "./shared/shared.module";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "./shared/services/auth.guard";
import { LoginComponent } from "./components/login/login.component";
import { ErrorComponent } from "./components/error/error.component";
import { BrowserModule } from "@angular/platform-browser";
import { RegisterComponent } from "./components/register/register.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RestaurantGuard } from "./shared/services/restaurant.guard";
import { RRegisterComponent } from "./components/r-register/r-register.component";
import { NavigationComponent } from "./components/navigation/navigation.component";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { RequestInterceptor } from "./shared/services/request.interceptor";

const routes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "", pathMatch: "full", redirectTo: "login" },
  { path: "register/user", component: RegisterComponent },
  { path: "register/restaurant", component: RRegisterComponent },
  {
    path: "user",
    canActivate: [AuthGuard],
    loadChildren: () => import("./user/user.module").then((m) => m.UserModule),
  },
  {
    path: "restaurant",
    canActivate: [RestaurantGuard],
    loadChildren: () =>
      import("./restaurant/restaurant.module").then((m) => m.RestaurantModule),
  },
  { path: "**", redirectTo: "login" },
];

@NgModule({
  declarations: [
    AppComponent,
    ErrorComponent,
    LoginComponent,
    RegisterComponent,
    RRegisterComponent,
    NavigationComponent,
  ],
  imports: [
    FormsModule,
    SharedModule,
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes, { useHash: true }),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
