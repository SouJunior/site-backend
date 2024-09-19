import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SendMailModule } from './modules/mails/send-mail.module';
import { SponsorModule } from './modules/sponsor/sponsor.module';
import { MailModule } from './shared/providers/mailer/mailer.module';
import { AdminModule } from './modules/admin/admin.module';
import { AuthModule } from './modules/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JuniorsModule } from './modules/juniors/juniors.module';
import { AreaModule } from './modules/area/area.module';
import { SubareaModule } from './modules/subarea/subarea.module';
import { MentorModule } from './modules/mentor/mentor.module';
import { JwtModule } from '@nestjs/jwt';


@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
      //insecureAuth: true,
    }),
    SponsorModule,
    SendMailModule,
    AdminModule,
    AuthModule,
    TypeOrmModule,
    MailModule,
    JuniorsModule,
    AreaModule,
    SubareaModule,
    MentorModule
  ],

  providers: [],
})
export class AppModule { }
