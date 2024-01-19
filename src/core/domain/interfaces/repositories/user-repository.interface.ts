import { User } from "../../entities/User.entity";

export interface IUserRepository {
  save(data: Partial<User>): Promise<void>;

  fetch(id: number): Promise<User>;

  fetchByEmail(email: string): Promise<User>;
}
