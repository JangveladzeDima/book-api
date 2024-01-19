import { Module } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { User } from '../../domain/entities/User.entity';

@Module({
  imports: [],
  providers: [
    { provide: 'User', useValue: User },

    { provide: 'UserRepository', useClass: UserRepository },
  ],
  exports: ['UserRepository'],
})
export class RepositoriesModule {}
