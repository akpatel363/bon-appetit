export class AppError {
  message: string;
  constructor(message = "Something went wrong.") {
    this.message = message;
  }
}
