import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JuniorsService } from './juniors.service';
import { JuniorsController } from './juniors.controller';
import { JuniorMDBEntity } from 'src/database/entities/juniormdb.mongo-entity';
import { Area } from 'src/database/entities/area.mongo-entity';
import { Subarea } from 'src/database/entities/subarea.mongo-entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([JuniorMDBEntity, Area, Subarea], 'mongoConnection')
  ],
  controllers: [JuniorsController],
  providers: [JuniorsService],
})
export class JuniorsModule { }
