import { BadRequestException, NotFoundException } from "@nestjs/common";

export class EmailAlreadyExistException extends BadRequestException {
  constructor() {
    super("Email Already Exists");
  }
}

export class UserCredentialsNotFound extends NotFoundException {
  constructor() {
    super("User email or password is incorrect");
  }
}
