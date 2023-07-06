import { Injectable } from '@nestjs/common';
import { MailProvider } from 'src/shared/providers/mailer/mailer-provider';
import { DataObjectDto } from '../../shared/providers/mailer/dto/mail-dto';

interface MailData {
  [key: string]: string;
}

interface SendMailProps {
  subject: string;
  data: MailData;
}

@Injectable()
export class SendMailService {
  constructor(private readonly mailProvider: MailProvider) {}

  async send(data: DataObjectDto, subject: string): Promise<void> {
    const { NODE_ENV, EMAIL_TESTE, EMAIL_PROD } = process.env;

    const emailToSend = NODE_ENV === 'development' ? EMAIL_TESTE : EMAIL_PROD;

    await this.mailProvider.send({
      context: {
        ...data,
      },
      subject,
      template: './ombudsman',
      to: emailToSend,
    });
  }
}
