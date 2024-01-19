import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '../../core/services/auth.service';
import { SignUpDto } from './dto/sign-up.dto';
import { LoginDto } from './dto/login.dto';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/sign-up')
  async signUp(@Body() data: SignUpDto) {
    await this.authService.signUp(data);

    return {
      message: 'Successful registration',
    };
  }

  @Post('/login')
  async login(@Body() data: LoginDto) {
    return this.authService.login(data);
  }
}
