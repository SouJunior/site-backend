import { Injectable } from '@nestjs/common';
import { MailProvider } from 'src/infra/protocols/mail-provider';
import { SendMailDto } from './dto/send-mail-dto';

@Injectable()
export class MailerService implements MailProvider {
  send(sendMailDTO: SendMailDto): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
