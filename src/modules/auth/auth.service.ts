import { HttpException, Injectable } from '@nestjs/common';
import { AdminService } from '../admin/admin.service';
import { JwtService } from '@nestjs/jwt';
import { PasswordHelper } from '../../shared/helpers/criptografia';

@Injectable()
export class AuthService {
  constructor(
    private readonly adminService: AdminService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, password: string) {
    try {
      const jwtSecret = process.env.JWT_SECRET;
      const user = await this.adminService.getUserByEmail(email);
      const passwordMatch = await PasswordHelper.comparePassword(
        password,
        user.encrypted_password,
      );

      if (user && passwordMatch) {
        const payload = { email: user.email };
        const accessToken = this.jwtService.sign(payload, { secret: jwtSecret });
        return { accessToken };
      }
      else {
        throw new HttpException('Unauthorized', 401)
      }
    } catch (error) {
      throw new HttpException('Unauthorized', 401)
    }
  }
}
