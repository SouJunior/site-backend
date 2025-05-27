import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(email: string, password: string) {
    const user = await this.userService.getUserByEmail(email);
    if (user && user.password === password) {
      const payload = { email: user.email };
      const accessToken = this.jwtService.sign(payload);
      return { accessToken };
    } else {
      return { message: 'Senha inválida ou usuário não encontrado' };
    }
  }
}
