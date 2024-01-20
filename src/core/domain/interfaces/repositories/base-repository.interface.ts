import { Model } from "sequelize-typescript";

export interface IBaseRepository<T extends Model> {
  save(data: Partial<T>): Promise<T>;

  fetch(id: number): Promise<T>;

  delete(id: number): Promise<void>;
}
