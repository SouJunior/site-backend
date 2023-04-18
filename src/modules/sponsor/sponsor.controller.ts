import { Body, Controller, HttpCode, Injectable, Post, Res } from '@nestjs/common';
import { SendMailToNewSponsorUseCase } from './use-cases/send-mail-to-new-donator';
import { SendMailDto } from '../../shared/providers/mailer/dto/send-mail-dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('sponsor')
export class SponsorController {
  constructor(private readonly sendMailToNewSponsorUseCase: SendMailToNewSponsorUseCase) { }

  @ApiOperation({
    summary: 'Send email to admin about new sponsor',
  })
  @ApiResponse({
    status: 200
  })
  @ApiResponse({
    status: 400,
    description: 'Error',
    type: 'string'
  })
  @Post()
  @HttpCode(200)
  async send(@Body() sendMailData: SendMailDto) {
    return await this.sendMailToNewSponsorUseCase.send(sendMailData);
  }
}
