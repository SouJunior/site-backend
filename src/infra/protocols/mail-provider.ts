import { SendMailDto } from "src/shared/providers/mailer/dto/send-mail-dto";

export interface MailProvider {
  send(sendMailDTO: SendMailDto): Promise<void>
}