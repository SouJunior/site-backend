import { Injectable } from '@nestjs/common';
import { AdminService } from '../admin/admin.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly adminService: AdminService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(email: string, password: string) {
    const user = await this.adminService.getUserByEmail(email);
    if (user && user.encrypted_password === password) {
      const payload = { email: user.email };
      const accessToken = this.jwtService.sign(payload);
      return { accessToken };
    } else {
      return { message: 'Senha inválida ou usuário não encontrado' };
    }
  }
}
