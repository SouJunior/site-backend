import { Module } from '@nestjs/common';
import { MailModule } from './shared/providers/mailer/mailer.module';
import { DonatorModule } from './modules/donators/donator.module';

@Module({
  imports: [MailModule, DonatorModule],
  providers: [],
})
export class AppModule { }
