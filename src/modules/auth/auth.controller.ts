import { Controller, Post, Body, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dtos/auth-credentials.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  async signIn(@Body() authCredentialsDto: AuthCredentialsDto) {
    try {
      return await this.authService.signIn(
        authCredentialsDto.email,
        authCredentialsDto.encrypted_password,
      );
    }
    catch (error) {
      return { message: error.message, status: error.status };
    }
  }
}
