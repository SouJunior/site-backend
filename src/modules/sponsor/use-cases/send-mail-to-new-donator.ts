import { Injectable } from '@nestjs/common';
import { MailProvider } from '../../../shared/providers/mailer/mailer-provider';

interface SendMailToNewSponsorUseCaseProps {
  name: string;
  nickname: string;
  phone: string;
  email: string;
  description: string;
}

@Injectable()
export class SendMailToNewSponsorUseCase {
  constructor(private readonly mailProvider: MailProvider) {}

  async send(data: SendMailToNewSponsorUseCaseProps): Promise<void> {
    const { NODE_ENV, EMAIL_TESTE, EMAIL_PROD } = process.env;

    const emailToSend = NODE_ENV === 'development' ? EMAIL_TESTE : EMAIL_PROD;

    await this.mailProvider.send({
      context: {
        ...data,
      },
      subject: 'Novo apoiador',
      template: './new-sponsor',
      to: emailToSend,
    });
  }
}
