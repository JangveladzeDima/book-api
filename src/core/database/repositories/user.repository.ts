import { Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from '../../domain/interfaces/repositories/user-repository.interface';
import { User } from '../../domain/entities/User.entity';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @Inject('User')
    private readonly user: typeof User,
  ) {}

  async save(data: Partial<User>): Promise<void> {
    await this.user.build(data).save();
  }

  async fetch(id: number): Promise<User> {
    return this.user.findOne({ where: { id } });
  }

  async fetchByEmail(email: string): Promise<User> {
    return this.user.findOne({ where: { email } });
  }
}
