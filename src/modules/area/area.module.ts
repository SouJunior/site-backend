import { Module } from '@nestjs/common';
import { AreaService } from './area.service';
import { AreaController } from './area.controller';
import { Area } from 'src/database/entities/area.mongo-entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([ Area ])
  ],

  controllers: [AreaController],
  providers: [AreaService],
})
export class AreaModule {}
