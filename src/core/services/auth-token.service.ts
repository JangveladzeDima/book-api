import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../domain/entities/User.entity';
import { IAuthTokenService } from '../domain/interfaces/services/auth-token-service.interface';

@Injectable()
export class AuthTokenService implements IAuthTokenService {
  constructor(private readonly jwtService: JwtService) {}

  async getAccessToken(user: User) {
    const payload = { email: user.email };

    return this.jwtService.signAsync(payload);
  }

  async getUserByToken(token: string): Promise<User> {
    return this.jwtService.verifyAsync(token);
  }
}
