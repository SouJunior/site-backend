import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MentorEntity } from 'src/database/entities/mentor.entity';
import { MentorController } from './mentor.controller';
import { MentorServices } from './mentor.service';
import { Area } from 'src/database/entities/area.entity';
import { Subarea } from 'src/database/entities/subarea.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MentorEntity, Area, Subarea])],
  controllers: [MentorController],
  providers: [MentorServices],
})
export class MentorModule {}
