import { AppError } from "./app.error";

export class LoginError extends AppError {
  constructor() {
    super("Wrong username or password.");
  }
}
