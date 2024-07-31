import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import { AreaService } from './area.service';
import { AreaDto } from './dto/area.dto';

@Controller('area')
export class AreaController {
  constructor(private readonly areaService: AreaService) {}

@Get()
async findAll(): Promise<AreaDto[]> {
  try {
  const areas = this.areaService.getAreasWithSubareas();
  return areas;
  } catch (error) { 
    throw new HttpException(
      'Erro ao obter areas.',
      HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}