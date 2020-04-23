import { BaseError } from "./BaseError";

export class JwtMustBeProvided extends BaseError {
  constructor() {
    super(404, "You need a token to use this endpoint");
  }
}