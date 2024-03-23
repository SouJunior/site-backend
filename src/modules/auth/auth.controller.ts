import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dtos/auth-credentials.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  async signIn(@Body() authCredentialsDto: AuthCredentialsDto) {
    return this.authService.signIn(
      authCredentialsDto.email,
      authCredentialsDto.encrypted_password,
    );
  }
}
