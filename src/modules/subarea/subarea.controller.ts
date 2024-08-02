import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SubareaService } from './subarea.service';
import { CreateSubareaDto } from './dto/create-subarea.dto';

@Controller('subarea')
export class SubareaController {
  constructor(private readonly subareaService: SubareaService) {}

  @Post()
  create(@Body() createSubareaDto: CreateSubareaDto) {
    return this.subareaService.create(createSubareaDto);
  }

  @Get()
  findAll() {
    return this.subareaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.subareaService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.subareaService.remove(+id);
  }
}
