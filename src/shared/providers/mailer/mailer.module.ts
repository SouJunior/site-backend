import { Global, Module } from '@nestjs/common';
import { MailProvider } from './mailer-provider';
import { MailerModule, MailerOptions } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

const setupMailProvider = (config: ConfigService): MailerOptions => ({
  transport: {
    host: config.get('MAIL_HOST'),
    port: config.get('MAIL_PORT'),
    secure: true,
    auth: {
      user: config.get('MAIL_USER'),
      pass: config.get('MAIL_PASSWORD'),
    },
  },
  defaults: {
    from: `"No Reply" <${config.get('MAIL_FROM')}>`,
  },
  template: {
    dir: join(__dirname, 'templates'),
    adapter: new HandlebarsAdapter(),
    options: {
      strict: true,
    },
  },
});

@Global()
@Module({
  imports: [
    MailerModule.forRootAsync({
      imports: undefined,
      inject: [ConfigService],
      useFactory: setupMailProvider
    }),
  ],
  providers: [MailProvider],
  exports: [MailProvider],
})
export class MailModule {}
