import { Module } from '@nestjs/common';
import { MailModule } from './shared/providers/mailer/mailer.module';
import { SponsorModule } from './modules/sponsor/sponsor.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MailModule,
    SponsorModule,
  ],
  providers: [],
})
export class AppModule {}
