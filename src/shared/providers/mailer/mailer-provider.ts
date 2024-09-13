import { Injectable } from '@nestjs/common';
import { Mail } from './protocols/mail';
import { ISendMailOptions, MailerService } from '@nestjs-modules/mailer';

export interface MailData {
  to: string;
  subject: string;
  template: string;
  context: any;
}

@Injectable()
export class MailProvider implements Mail {
  constructor(private readonly mailer: MailerService) {}

  async send({ context, subject, template, to }: MailData): Promise<void> {
    const mailObj: ISendMailOptions = {
      to,
      template,
      context,
      subject,
    };
    console.log(mailObj);
    await this.mailer.sendMail(mailObj);
  }
}
