import { Module } from '@nestjs/common';
import { SendMailToNewSponsorUseCase } from './use-cases/send-mail-to-new-donator';
import { SponsorController } from './sponsor.controller';
import { MailModule } from 'src/shared/providers/mailer/mailer.module';

@Module({
  imports: [MailModule],
  controllers: [SponsorController],
  providers: [SendMailToNewSponsorUseCase],
})
export class SponsorModule {}
