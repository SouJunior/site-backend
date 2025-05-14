import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JuniorsService } from './juniors.service';
import { JuniorsController } from './juniors.controller';
import { JuniorMDBEntity } from 'src/database/entities/juniormdb.mongo-entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([JuniorMDBEntity], 'mongoConnection')
  ],
  controllers: [JuniorsController],
  providers: [JuniorsService],
})
export class JuniorsModule { }
