import { Module } from '@nestjs/common';
import { JuniorsService } from './juniors.service';
import { JuniorsController } from './juniors.controller';
import { JuniorEntity } from 'src/database/entities/junior.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Area } from 'src/database/entities/area.entity';
import { Subarea } from 'src/database/entities/subarea.entity';
import { JuniorMDBEntity } from 'src/database/entities/juniormdb.mongo-entity';

@Module({
  imports: [
   // TypeOrmModule.forFeature([JuniorEntity, Area, Subarea]),
    TypeOrmModule.forFeature([JuniorMDBEntity], 'mongoConnection')
  ],
  controllers: [JuniorsController],
  providers: [JuniorsService],
})
export class JuniorsModule { }
