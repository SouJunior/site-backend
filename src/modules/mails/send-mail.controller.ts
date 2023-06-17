import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { SendMailService } from './send-mail.service';
import { MailDTO } from 'src/shared/providers/mailer/dto/mail-dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('mail')
export class SendMailController {
  constructor(private readonly sendMailService: SendMailService) {}

  @ApiOperation({
    summary: 'Send email to admin',
  })
  @ApiResponse({
    status: 200,
    description: 'Success',
    type: null,
  })
  @ApiResponse({
    status: 400,
    description: 'Error',
    type: String,
  })
  @Post()
  @HttpCode(200)
  async send(@Body() sendMailData: MailDTO) {
    const { subject, template, data } = sendMailData;
    return await this.sendMailService.send({
      data,
      subject,
      template,
    });
  }
}
