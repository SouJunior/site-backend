import { Controller, Post, Body, Get, UseGuards, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dtos/auth-credentials.dto';
import { UserEntity } from 'src/database/entities/user.mongo-entity';
import { LoggedUser } from './decorator/logged-user.decorator';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginSwagger } from 'src/shared/swagger/decorators/auth/login.swagger';
import { UserLoggedSwagger } from 'src/shared/swagger/decorators/auth/user-logged.swagger';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  @LoginSwagger()
  async signIn(@Body() authCredentialsDto: AuthCredentialsDto) {
    return this.authService.signIn(
      authCredentialsDto.email,
      authCredentialsDto.password,
    );
  }

  @Get('/user-logged')
  @UseGuards(AuthGuard('jwt'))
  @UserLoggedSwagger()
  @ApiBearerAuth()
  async userLogged(@LoggedUser() user: UserEntity){
    return user;
  }
}
