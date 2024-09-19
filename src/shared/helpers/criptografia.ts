import * as bcrypt from 'bcrypt';

export class PasswordHelper {
  private static readonly saltRounds = 10;

  // Método para criptografar uma senha
  static async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(this.saltRounds);
    return bcrypt.hash(password, salt);
  }

  // Método para comparar uma senha com um hash
  static async comparePassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}
