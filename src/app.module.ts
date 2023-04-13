import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { MailerModule } from './shared/providers/mailer/mailer.module';

@Module({
  imports: [MailerModule],
  providers: [AppService],
})
export class AppModule { }
