import { Inject, Injectable } from "@nestjs/common";
import { IUserRepository } from "../domain/interfaces/repositories/user-repository.interface";
import { User } from "../domain/entities/user.entity";
import {
  EmailAlreadyExistException,
  UserCredentialsNotFound,
} from "../domain/exceptions/auth.exceptions";
import { IAuthTokenService } from "../domain/interfaces/services/auth-token-service.interface";

@Injectable()
export class AuthService {
  constructor(
    @Inject("UserRepository")
    private readonly userRepository: IUserRepository,
    @Inject("AuthTokenService")
    private readonly authTokenService: IAuthTokenService,
  ) {}

  async signUp(data: Partial<User>) {
    const user = await this.userRepository.fetchByEmail(data.email);

    if (user) {
      throw new EmailAlreadyExistException();
    }

    await this.userRepository.save(data);
  }

  async login(data: Partial<User>) {
    const user = await this.userRepository.fetchByEmail(data.email);

    if (!user || user.password !== data.password) {
      throw new UserCredentialsNotFound();
    }

    const token = await this.authTokenService.getAccessToken(user);
    return {
      "access-token": token,
    };
  }
}
