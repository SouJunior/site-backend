import { Injectable } from '@nestjs/common';
import { CreateSubareaDto } from './dto/create-subarea.dto';

@Injectable()
export class SubareaService {
  create(createSubareaDto: CreateSubareaDto) {
    return 'This action adds a new subarea';
  }

  findAll() {
    return `This action returns all subarea`;
  }

  findOne(id: number) {
    return `This action returns a #${id} subarea`;
  }

  remove(id: number) {
    return `This action removes a #${id} subarea`;
  }
}
