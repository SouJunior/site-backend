import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SendMailModule } from './modules/mails/send-mail.module';
import { SponsorModule } from './modules/sponsor/sponsor.module';
import { MailModule } from './shared/providers/mailer/mailer.module';
import { AdminModule } from './modules/admin/admin.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MailModule,
    SponsorModule,
    SendMailModule,
    AdminModule,
    AuthModule,
  ],
  providers: [],
})
export class AppModule {}
