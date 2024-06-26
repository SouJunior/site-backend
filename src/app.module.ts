import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SendMailModule } from './modules/mails/send-mail.module';
import { SponsorModule } from './modules/sponsor/sponsor.module';
import { MailModule } from './shared/providers/mailer/mailer.module';
import { AdminModule } from './modules/admin/admin.module';
import { AuthModule } from './modules/auth/auth.module';
import { TypeOrmModule} from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'postgresql://soujunior:96S5zCjHUzbsJ6bKko9IcS8wq9ZpkJkT@dpg-cptlaud6l47c73cq0th0-a/soujunior',
      port: 5432,
      username: 'soujunior',
      password: '96S5zCjHUzbsJ6bKko9IcS8wq9ZpkJkT',
      database: 'soujunior',
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    SponsorModule,
    SendMailModule,
    AdminModule,
    AuthModule,
    TypeOrmModule,
    MailModule,
  ],
  providers: [],
})
export class AppModule {}
