import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/database/entities/user.mongo-entity';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity],'mongoConnection')],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
