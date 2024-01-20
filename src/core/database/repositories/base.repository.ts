import { Injectable } from "@nestjs/common";
import { IBaseRepository } from "../../domain/interfaces/repositories/base-repository.interface";
import { Model, ModelCtor } from "sequelize-typescript";

@Injectable()
export class BaseRepository<T extends Model> implements IBaseRepository<T> {
  constructor(
    private readonly model: ModelCtor<T>,
    protected type: new (value: Partial<T>) => T,
  ) {}

  async save(data: Partial<T>): Promise<T> {
    const entity = new this.type(data);
    return entity.save();
  }

  async fetch(id: number): Promise<T> {
    return this.model.findOne({ where: { id } as any });
  }

  async delete(id: number): Promise<void> {
    await this.model.destroy({
      where: { id } as any,
    });
  }
}
