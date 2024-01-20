import { Inject, Injectable } from "@nestjs/common";
import { IUserRepository } from "../../domain/interfaces/repositories/user-repository.interface";
import { User } from "../../domain/entities/user.entity";
import { BaseRepository } from "./base.repository";

@Injectable()
export class UserRepository
  extends BaseRepository<User>
  implements IUserRepository
{
  constructor(
    @Inject("User")
    private readonly user: typeof User,
  ) {
    super(user, User);
  }

  async fetchByEmail(email: string): Promise<User> {
    return this.user.findOne({ where: { email } });
  }
}
