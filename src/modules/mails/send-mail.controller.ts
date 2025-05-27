import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { MailDTO } from 'src/shared/providers/mailer/dto/mail-dto';
import { SendMailService } from './send-mail.service';

@Controller('mail')
@ApiTags('Mails')
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

  @ApiOperation({
    summary: 'Send email about collaborator',
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
  @ApiBody({})
  @Post('/collaborator')
  @HttpCode(200)
  async sendMail(@Body() data: any) {
    return await this.sendMailService.send(data, data.subject);
  }
}
