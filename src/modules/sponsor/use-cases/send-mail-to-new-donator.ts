import { Injectable } from "@nestjs/common";
import { MailService } from "src/shared/providers/mailer/mailer-provider";

interface SendMailToNewSponsorUseCaseProps {
  name: string;
  nickname: string
  phone: string
  email: string
  description: string
}

@Injectable()
export class SendMailToNewSponsorUseCase {
  constructor(private readonly mailProvider: MailService) { }

  async send(data: SendMailToNewSponsorUseCaseProps): Promise<void> {
    await this.mailProvider.send({
      context: {
        ...data
      }
    })
  }
}