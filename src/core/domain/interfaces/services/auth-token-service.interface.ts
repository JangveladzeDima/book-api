import { User } from '../../entities/User.entity';

export interface IAuthTokenService {
  getAccessToken(user: User): Promise<string>;

  getUserByToken(token: string): Promise<User>;
}
