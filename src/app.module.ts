import { Module } from '@nestjs/common';
import { MailModule } from './shared/providers/mailer/mailer.module';
import { SponsorModule } from './modules/sponsor/sponsor.module';
import { ConfigModule } from '@nestjs/config';
import { CollaboratorsModule } from './modules/collaborators/collaborators.module';
import { SendMailModule } from './modules/mails/send-mail.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MailModule,
    SponsorModule,
    CollaboratorsModule,
    SendMailModule,
  ],
  providers: [],
})
export class AppModule {}
