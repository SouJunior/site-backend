import { Module } from '@nestjs/common';
import { CollaboratorsService } from './collaborators.service';
import { CollaboratorsController } from './collaborators.controller';

@Module({
  controllers: [CollaboratorsController],
  providers: [CollaboratorsService],
})
export class CollaboratorsModule {}
