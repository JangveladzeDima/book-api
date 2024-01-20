import { User } from "../../entities/user.entity";

export interface IAuthTokenService {
  getAccessToken(user: User): Promise<string>;

  getUserByToken(token: string): Promise<User>;
}
