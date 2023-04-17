import { Body, Controller, HttpCode, Post, Res } from '@nestjs/common';
import { SendMailToNewSponsorUseCase } from './use-cases/send-mail-to-new-donator';
import { SendMailDto } from '../../shared/providers/mailer/dto/send-mail-dto';

@Controller('sponsor')
export class SponsorController {
  constructor(private readonly sendMailToNewSponsorUseCase: SendMailToNewSponsorUseCase) { }

  @Post()
  @HttpCode(200)
  async send(@Body() sendMailData: SendMailDto) {
    return await this.sendMailToNewSponsorUseCase.send(sendMailData);
  }
}
