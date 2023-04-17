import { Injectable } from "@nestjs/common";
import { MailProvider } from "src/shared/providers/mailer/mailer-provider";

interface SendMailToNewSponsorUseCaseProps {
  name: string;
  nickname: string
  phone: string
  email: string
  description: string
}

@Injectable()
export class SendMailToNewSponsorUseCase {
  constructor(private readonly mailProvider: MailProvider) { }

  async send(data: SendMailToNewSponsorUseCaseProps): Promise<void> {
    await this.mailProvider.send({
      context: {
        ...data
      },
      subject: 'Novo apoiador',
      template: 'new-sponsor',
      to: 'wouerner@soujunior.tech'
    })
  }
}