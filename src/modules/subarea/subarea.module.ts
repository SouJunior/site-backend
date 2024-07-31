import { Module } from '@nestjs/common';
import { SubareaService } from './subarea.service';
import { SubareaController } from './subarea.controller';

@Module({
  controllers: [SubareaController],
  providers: [SubareaService],
})
export class SubareaModule {}
