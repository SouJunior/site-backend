import { Module } from '@nestjs/common';
import { MailService } from './mailer-provider';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';

const setupMailProvider = ({ get }: ConfigService) => ({
  transport: {
    host: get('MAIL_HOST'),
    port: get('MAIL_PORT'),
    secure: false,
    auth: {
      user: get('MAIL_USER'),
      pass: get('MAIL_PASSWORD'),
    },
  },
  defaults: {
    from: `no-reply <no-reply@site-soujunior.com>`,
  },
})


@Module({
  imports: [MailerModule.forRootAsync({
    useFactory: setupMailProvider,
    inject: [ConfigService]
  })],
  providers: [{
    provide: 'MailerService',
    useClass: MailService
  }],
  exports: [MailService]
})
export class MailModule { }
