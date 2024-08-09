import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Area } from 'src/database/entities/area.entity';
import { MentorEntity } from 'src/database/entities/mentor.entity';
import { Subarea } from 'src/database/entities/subarea.entity';
import { Repository } from 'typeorm';
import { createMentorDto } from './dtos/create-mentor.dto';

@Injectable()
export class MentorServices {
  constructor(
    @InjectRepository(MentorEntity)
    private readonly mentorRepository: Repository<MentorEntity>,

    @InjectRepository(Area)
    private readonly areaRepository: Repository<Area>,

    @InjectRepository(Subarea)
    private readonly subareaRepository: Repository<Subarea>
  ) {}

  async newMentor(createMentorDto: createMentorDto): Promise<MentorEntity> {

    const area = await this.areaRepository.findOneBy({id: createMentorDto.area})
    const subarea = await this.subareaRepository.findOneBy({id: createMentorDto.subarea})

    if(!area){
      throw new HttpException('area not found', HttpStatus.NOT_FOUND);
    }

    
    if(!subarea){
      throw new HttpException('subarea not found', HttpStatus.NOT_FOUND);
    }

    const mentor = this.mentorRepository.create({
      ...createMentorDto,
      id_area: area,
      id_subarea: subarea,
      start_date: new Date(createMentorDto.start_date)
      
    });

    return this.mentorRepository.save(mentor);
  }

  async findMentorByEmail(email: string): Promise<MentorEntity> {
    const mentor = await this.mentorRepository.findOneBy({email})

    if(!mentor){
      return null
    }

    return mentor;
  }
}
