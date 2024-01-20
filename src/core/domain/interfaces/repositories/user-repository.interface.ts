import { User } from "../../entities/user.entity";
import { IBaseRepository } from "./base-repository.interface";

export interface IUserRepository extends IBaseRepository<User> {
  fetchByEmail(email: string): Promise<User>;
}
