import { Body, Controller, Post, Res } from '@nestjs/common';
import { SendMailToNewSponsorUseCase } from './use-cases/send-mail-to-new-donator';
import { SendMailDto } from 'src/shared/providers/mailer/dto/send-mail-dto';
import { Response } from 'express';

@Controller('sponsor')
export class SponsorController {
  constructor(private readonly sendMailToNewSponsorUseCase: SendMailToNewSponsorUseCase) { }

  @Post()
  async send(@Body() sendMailData: SendMailDto, @Res() res: Response) {
    await this.sendMailToNewSponsorUseCase.send(sendMailData);

    return res.status(200).send();
  }
}
