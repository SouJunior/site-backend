import { Injectable } from '@nestjs/common';
import { Mail } from './protocols/mail';
import { ISendMailOptions, MailerService } from '@nestjs-modules/mailer';

export interface MailData {
  to: string
  subject: string
  template: string;
  context: {
    [name: string]: string
  }
}

@Injectable()
export class MailService implements Mail {
  constructor(private readonly mailer: MailerService) { }

  async send({ context, subject, template, to }: MailData): Promise<void> {
    const mailObj: ISendMailOptions = {
      to,
      template,
      context,
      subject
    }

    await this.mailer.sendMail(mailObj)
  }
}

//wouerner@soujunior.tech