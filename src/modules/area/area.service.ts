import { Injectable } from '@nestjs/common';
import { AreaDto } from './dto/area.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Area } from 'src/database/entities/area.entity';
import { SubareaDto } from '../subarea/dto/subareas.dto';


@Injectable()
export class AreaService {
  constructor(
    @InjectRepository(Area)
    private readonly areasRepository: Repository<Area>,
  ) {}


  async getAreasWithSubareas(): Promise<AreaDto[]> {
    const areas = await this.areasRepository.find({ relations: ['subareas'] });
    return areas.map(area => new AreaDto(
      area.id,
      area.name,
      area.subareas.map(subarea => new SubareaDto(subarea.id, subarea.name, subarea.area?.id)),
    ));
  }
}