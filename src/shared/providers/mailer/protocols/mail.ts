import { MailData } from "../mailer-provider";

export abstract class Mail {
  abstract send(data: MailData): Promise<void>
}