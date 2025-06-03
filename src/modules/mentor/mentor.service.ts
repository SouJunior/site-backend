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
import { PageOptionsDto } from 'src/shared/pagination/page-options.dto';
import PageDto from 'src/shared/pagination/page.dto';
import PageMetaDto from 'src/shared/pagination/page-meta.dto';

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
    if (!email) {
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

  async findAll(
    pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<MentorEntity>> {
    const orderDirection = pageOptionsDto.order === 'ASC' ? 'ASC' : 'DESC';

    const [data, itemCount] = await Promise.all([
      this.mentorEntityRepo.find({
        order: {},
        skip: pageOptionsDto.skip,
        take: pageOptionsDto.take,
      }),
      this.mentorEntityRepo.count(),
    ]);

    const meta = new PageMetaDto({ pageOptionsDto, itemCount });

    return new PageDto(data, meta);
  }
}
