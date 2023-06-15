import { Injectable } from '@nestjs/common';
import { MailProvider } from 'src/shared/providers/mailer/mailer-provider';

interface MailData {
  [key: string]: string;
}

interface SendMailProps {
  template: string;
  subject: string;
  data: MailData;
}

@Injectable()
export class SendMailService {
  constructor(private readonly mailProvider: MailProvider) {}

  async send({ data, subject, template }: SendMailProps): Promise<void> {
    await this.mailProvider.send({
      context: {
        ...data,
      },
      subject,
      template,
      to: 'wouerner@soujunior.tech',
    });
  }
}
