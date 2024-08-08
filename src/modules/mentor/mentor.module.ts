import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MentorEntity } from 'src/database/entities/mentor.entity';
import { MentorController } from './mentor.controller';
import { MentorServices } from './mentor.service';

@Module({
  imports: [TypeOrmModule.forFeature([MentorEntity])],
  controllers: [MentorController],
  providers: [MentorServices],
})
export class MentorModule {}
