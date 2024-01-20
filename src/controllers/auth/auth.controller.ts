import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "../../core/services/auth.service";
import { SignUpDto } from "./dto/sign-up.dto";
import { LoginDto } from "./dto/login.dto";
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
} from "@nestjs/swagger";

@Controller("/auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiCreatedResponse({ description: "Register New User" })
  @ApiBadRequestResponse({
    description: "Email Already Exists Or Data Validation Error",
  })
  @Post("/sign-up")
  async signUp(@Body() data: SignUpDto) {
    await this.authService.signUp(data);

    return {
      message: "Successful registration",
    };
  }

  @ApiCreatedResponse({ description: "Created Access Token" })
  @ApiNotFoundResponse({ description: "User With Credentials Not Found" })
  @ApiBadRequestResponse({ description: "Data Validation Error" })
  @Post("/login")
  async login(@Body() data: LoginDto) {
    return this.authService.login(data);
  }
}
