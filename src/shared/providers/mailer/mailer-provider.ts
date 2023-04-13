import { Injectable } from '@nestjs/common';
import { SendMailDto } from './dto/send-mail-dto';
import { Mail } from './protocols/mail';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService implements Mail {
  constructor(private readonly mailer: MailerService) { }

  async send(sendMailDTO: SendMailDto): Promise<void> {
    await this.mailer.sendMail(sendMailDTO)
  }
}
