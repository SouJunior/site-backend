import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMentorDTO } from './dto/create-mentor-dto';
import { MentorEntity } from 'src/database/entities/mentor.mongo-entity';

@Injectable()
export class MentorService {
  constructor(
    @InjectRepository(MentorEntity, 'mongoConnection')
    private readonly mentorEntityRepo: Repository<MentorEntity>,
  ) {}

  async findMentorByEmail(
    email: string,
    throwIfNotFound = true,
  ): Promise<MentorEntity> {
    if (!email || !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      throw new BadRequestException('Email inválido.');
    }

    const mentor = await this.mentorEntityRepo.findOne({
      where: { email },
    });

    if (!mentor && throwIfNotFound) {
      throw new NotFoundException('Mentor não encontrado.');
    }
    return mentor;
  }

  async create(createMentorDto: CreateMentorDTO): Promise<MentorEntity> {
    const mentorExists = await this.findMentorByEmail(
      createMentorDto.email,
      false,
    );

    if (mentorExists) {
      throw new ConflictException('Já existe mentor com esse Email');
    }

    const mentor = this.mentorEntityRepo.create({
      ...createMentorDto,
    });

    if (!mentor) {
      throw new BadRequestException('Mentor não foi criado');
    }
    return this.mentorEntityRepo.save(mentor);
  }

  async findAll(): Promise<MentorEntity[]> {
    const mentors = await this.mentorEntityRepo.find();

    if (mentors.length === 0) {
      throw new NotFoundException('Nenhum dado encontrado');
    }

    return mentors;
  }
}
