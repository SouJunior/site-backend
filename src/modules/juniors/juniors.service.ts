import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { CreateJuniorDto } from './dtos/create-junior-dto';
import { JuniorMDBEntity } from 'src/database/entities/juniormdb.mongo-entity';
import { FilterJuniorsDTO } from './dtos/filter-junior-dto';
import { PageOptionsDto } from 'src/shared/pagination/page-options.dto';
import PageDto from 'src/shared/pagination/page.dto';
import PageMetaDto from 'src/shared/pagination/page-meta.dto';

@Injectable()
export class JuniorsService {
  constructor(
    @InjectRepository(JuniorMDBEntity, 'mongoConnection')
    private readonly juniormdbRepository: MongoRepository<JuniorMDBEntity>,
  ) {}

  async create(createJuniorDto: CreateJuniorDto): Promise<JuniorMDBEntity> {
    const juniorExists = await this.findJuniorByEmail(
      createJuniorDto.email,
      false,
    );

    if (juniorExists) {
      throw new ConflictException('Já existe um junior com esse email.');
    }

    const juniorMDB = this.juniormdbRepository.create({
      ...createJuniorDto,
      startDate: new Date(createJuniorDto.startDate),
    });

    if (!juniorMDB) {
      throw new BadRequestException('Junior não foi criado.');
    }

    return this.juniormdbRepository.save(juniorMDB);
  }

  async findJuniorByEmail(
    email: string,
    throwIfNotfound = true,
  ): Promise<JuniorMDBEntity> {
    if (!email) {
      throw new BadRequestException('Email inválido.');
    }

    const junior = await this.juniormdbRepository.findOne({ where: { email } });

    if (!junior && throwIfNotfound) {
      throw new NotFoundException('Junior não encontrado.');
    }

    return junior;
  }

  async findAll(
    pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<JuniorMDBEntity>> {
    const orderDirection = pageOptionsDto.order === 'ASC' ? 'ASC' : 'DESC';

    const [data, itemCount] = await Promise.all([
      this.juniormdbRepository.find({
        order: {},
        skip: pageOptionsDto.skip,
        take: pageOptionsDto.take,
      }),
      this.juniormdbRepository.count(),
    ]);

    const meta = new PageMetaDto({ pageOptionsDto, itemCount });
    return new PageDto(data, meta);
  }

  async findAllToCsv(filters: FilterJuniorsDTO): Promise<JuniorMDBEntity[]> {
    const where = parseFilter(filters);
    const juniors = await this.juniormdbRepository.find({ where });
    return juniors;
  }
}

function parseFilter(filters: FilterJuniorsDTO): Record<string, any> {
  const where: Record<string, any> = {};

  const simpleFields = [
    'name',
    'email',
    'linkedin',
    'area',
    'subarea',
    'indication',
    'linkedinIndication',
    'availability',
    'turn',
    'startOption',
    'toolsKnowledge',
    'fieldKnowledge',
    'volunteerMotivation',
    'contactAgreement',
    'termsAgreement',
  ];

  simpleFields.forEach((field) => {
    const value = filters[field as keyof FilterJuniorsDTO];
    if (value !== undefined && value !== null) {
      where[field] = value;
    }
  });

  if (filters.startDate !== null && filters.startDate !== undefined) {
    where['startDate'] = { $gte: filters.startDate };
  }

  return where;
}
