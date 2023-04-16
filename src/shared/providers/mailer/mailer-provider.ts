import { Injectable } from '@nestjs/common';
import { Mail } from './protocols/mail';
import { ISendMailOptions, MailerService } from '@nestjs-modules/mailer';

export interface MailData {
  context: {
    [name: string]: string
  }
}

@Injectable()
export class MailService implements Mail {
  constructor(private readonly mailer: MailerService) { }

  async send({ context }: MailData): Promise<void> {
    const mailObj: ISendMailOptions = {
      to: 'lucasmbrute614@gmail.com',
      template: 'new-sponsor',
      context,
      subject: 'Novo apoiador'
    }

    await this.mailer.sendMail(mailObj)
  }
}

//wouerner@soujunior.tech