import { Module } from '@nestjs/common';
import { MailModule } from 'src/shared/providers/mailer/mailer.module';
import { SendMailService } from './send-mail.service';
import { SendMailController } from './send-mail.controller';

@Module({
  imports: [MailModule],
  controllers: [SendMailController],
  providers: [SendMailService],
})
export class SendMailModule {}
