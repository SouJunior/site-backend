import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UserEntity } from 'src/database/entities/user.mongo-entity';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AdminService } from '../admin/admin.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt/jwt.strategy';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([UserEntity],'mongoConnection'),
    JwtModule.register({
      secret: process.env.SECRET_KEY,
      signOptions: {expiresIn: '24h'}
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, AdminService, JwtStrategy],
})
export class AuthModule {}
