import { AppError } from "./app.error";

export class UnauthorizedError extends AppError {
  constructor() {
    super("Unauthorized to make this request.");
  }
}
