import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MentorEntity } from 'src/database/entities/mentor.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MentorServices {
  constructor(
    @InjectRepository(MentorEntity)
    private readonly mentorRepository: Repository<MentorEntity>,
  ) {}

  async newMentor(mentorData: Partial<MentorEntity>): Promise<MentorEntity> {
    const newMentor = this.mentorRepository.create(mentorData);
    return this.mentorRepository.save(newMentor);
  }
}
