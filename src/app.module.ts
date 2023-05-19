import { Module } from '@nestjs/common';
import { MailModule } from './shared/providers/mailer/mailer.module';
import { SponsorModule } from './modules/sponsor/sponsor.module';
import { ConfigModule } from '@nestjs/config';
import { CollaboratorsModule } from './collaborators/collaborators.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MailModule,
    SponsorModule,
    CollaboratorsModule,
  ],
  providers: [],
})
export class AppModule {}
