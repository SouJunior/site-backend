import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository, Repository } from 'typeorm';
import { CreateMentorDTO } from './dto/create-mentor-dto';
import { MentorEntity } from 'src/database/entities/mentor.mongo-entity';
import { PageOptionsDto } from 'src/shared/pagination/page-options.dto';
import PageDto from 'src/shared/pagination/page.dto';
import PageMetaDto from 'src/shared/pagination/page-meta.dto';
import { MentorResponseDTO } from './dto/mentor-response.dto';
import { Area } from 'src/database/entities/area.mongo-entity';
import { Subarea } from 'src/database/entities/subarea.mongo-entity';
import { MentorDataCsvDto } from './dto/mentor-data-csv-dto';

@Injectable()
export class MentorService {
  constructor(
    @InjectRepository(MentorEntity, 'mongoConnection')
    private readonly mentorEntityRepo: Repository<MentorEntity>,

    @InjectRepository(Area, 'mongoConnection')
    private readonly areaRepository: MongoRepository<Area>,

    @InjectRepository(Subarea, 'mongoConnection')
    private readonly subareaRepository: MongoRepository<Subarea>
  ) { }

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

  async findAllToCsv(filters?: Record<string, any>): Promise<MentorDataCsvDto[]> {
    const parsedFilter = this.parseFilter(filters);
    const mentors = await this.mentorEntityRepo.find(parsedFilter);
    const parsedAreas = await this.parseAreas();
    const parsedSubareas = await this.parseSubareas();

    const csvData: MentorDataCsvDto[] = [];

    mentors.forEach((mentor) => {
      csvData.push(
        new MentorDataCsvDto(
          mentor.id,
          mentor.name,
          mentor.email,
          mentor.linkedin,
          mentor.jobExperience,
          mentor.volunteerMotivation,
          parsedAreas[mentor.area],
          parsedSubareas[mentor.subarea],
          mentor.startDate,
          mentor.createdAt,
          mentor.phone,
          mentor.hasWhatsApp,
        )
      )
    })

    return csvData;
  }

  private async parseAreas(): Promise<Record<string, string>> {
    const areas = await this.areaRepository.find();
    const parsedAreas: Record<string, string> = {};

    areas.forEach((area) => {
      parsedAreas[area.id.toString()] = area.name;
    });

    return parsedAreas;
  }

  private async parseSubareas(): Promise<Record<string, string>> {
    const subareas = await this.subareaRepository.find();
    const parsedSubareas: Record<string, string> = {};

    subareas.forEach((subarea) => {
      parsedSubareas[subarea.id.toString()] = subarea.name;
    });

    return parsedSubareas;
  }

  private parseFilter(filters: Record<string, any>): Record<string, any> {
    const where: Record<string, any> = {};

    const simpleFields = [
      'name',
      'email',
      'phone',
      'linkedin',
      'availability',
      'startOption',
      'experienceTime',
      'jobExperience',
      'volunteerMotivation',
    ];

    const booleanFields = [
      'turn',
      'hasWhatsApp'
    ];

    const intFields = ['area', 'subarea'];

    simpleFields.forEach((field) => {
      const value = filters[field];
      if (value !== undefined && value !== null && value !== '') {
        where[field] = value;
      }
    });

    booleanFields.forEach((field) => {
      const value = filters[field];
      if (value !== undefined && value !== null) {
        const bool = value === 'true' || value === '1';
        where[field] = bool;
      }
    });

    intFields.forEach((field) => {
      const value = filters[field];
      if (Array.isArray(value)) {
        const parsed = value.map((v) => parseInt(v, 10)).filter((n) => !isNaN(n));
        if (parsed.length > 0) where[field] = { $in: parsed };
      } else if (value !== undefined && value !== null && value !== '') {
        const parsed = parseInt(value, 10);
        if (!isNaN(parsed)) where[field] = parsed;
      }
    });

    if (filters.startDate) {
      const date = new Date(filters.startDate);
      if (!isNaN(date.getTime())) {
        where['startDate'] = { $gte: date };
      }
    }

    return where;
  }
}
