import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { MailDTO } from 'src/shared/providers/mailer/dto/mail-dto';
import { SendMailService } from './send-mail.service';

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
  async send(@Body() { data, subject }: MailDTO) {
    return await this.sendMailService.send(data, subject);
  }
}
