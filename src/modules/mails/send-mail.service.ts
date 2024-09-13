import { Injectable } from '@nestjs/common';
import { MailProvider } from 'src/shared/providers/mailer/mailer-provider';

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

  async send(data: any, subject: string): Promise<void> {
    const { NODE_ENV, EMAIL_TESTE, EMAIL_PROD } = process.env;

    const emailToSend = NODE_ENV === 'development' ? EMAIL_TESTE : EMAIL_PROD;
    await this.mailProvider.send({
      context: data,
      subject,
      template: './ombudsman',
      to: 'gabriel.oliveira9400@gmail.com',
    });

    if (subject === 'Quero ser Mentor') {
      await this.mailProvider.send({
        context: {
          FULL_NAME: data?.data?.name || 'Aquele que não deve ser nomeado',
          JOB_NAME: data?.data?.areas || '',
          LINKEDIN_URL: data?.data?.linkedin || '',
          MESSAGE: data?.data?.mensagem || '',
        },
        subject: 'Recebemos seu email',
        template: './response-user',
        to: data.data.email,
      });
    }
  }
}
