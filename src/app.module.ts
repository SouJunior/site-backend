import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SendMailModule } from './modules/mails/send-mail.module';
import { SponsorModule } from './modules/sponsor/sponsor.module';
import { MailModule } from './shared/providers/mailer/mailer.module';
import { AdminModule } from './modules/admin/admin.module';
import { AuthModule } from './modules/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JuniorsModule } from './modules/juniors/juniors.module';
import { MentorModule } from './modules/mentor/mentor.module';
import { AreaModule } from './modules/area/area.module';
import { SubareaModule } from './modules/subarea/subarea.module';
import { HeadModule } from './modules/head/head.module';
import { SupporterModule } from './modules/supporter/supporter.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      name: 'default',
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: ['dist/**/*.entity{.ts,.js}'],
      //synchronize: true,
      //insecureAuth: true,
    }),
    TypeOrmModule.forRoot({
      name: 'mongoConnection', 
      type: 'mongodb',
      url: process.env.MDB_URL,
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
    AreaModule,
    SubareaModule
  ],

  providers: [],
})
export class AppModule { }
