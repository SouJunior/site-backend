import { Module } from '@nestjs/common';
import { JuniorsService } from './juniors.service';
import { JuniorsController } from './juniors.controller';
import { JuniorEntity } from 'src/database/entities/junior.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Area } from 'src/database/entities/area.entity';
import { Subarea } from 'src/database/entities/subarea.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([JuniorEntity, Area, Subarea])
  ],
  controllers: [JuniorsController],
  providers: [JuniorsService],
})
export class JuniorsModule { }
