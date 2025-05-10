import {  Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SendMailModule } from './modules/mails/send-mail.module';
import { SponsorModule } from './modules/sponsor/sponsor.module';
import { MailModule } from './shared/providers/mailer/mailer.module';
import { AdminModule } from './modules/admin/admin.module';
import { AuthModule } from './modules/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JuniorsModule } from './modules/juniors/juniors.module';
import { MentorModule } from './modules/mentor/mentor.module';
import { HeadModule } from './modules/head/head.module';
import { SupporterModule } from './modules/supporter/supporter.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      name: 'mongoConnection',
      type: 'mongodb',
      url:
        process.env.NODE_ENV === 'production'
          ? process.env.MDB_URL
          : process.env.MDB_URL_DEV,
      useNewUrlParser: true,
      logging: true,
      useUnifiedTopology: true,
      synchronize: true,
      entities: ['dist/**/*.mongo-entity{.ts,.js}'],
    }),
    SponsorModule,
    SendMailModule,
    AdminModule,
    AuthModule,
    TypeOrmModule,
    MailModule,
    JuniorsModule,
    MentorModule,
    HeadModule,
    SupporterModule,
  ],

  providers: [],
})
export class AppModule {
 }
