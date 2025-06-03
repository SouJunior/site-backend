import {
  Injectable,
  BadRequestException,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SupporterEntity } from 'src/database/entities/supporter.mongo-entity';
import { CreateSupporterDTO } from './dto/create-supporter-dto';
import { PageOptionsDto } from 'src/shared/pagination/page-options.dto';
import PageDto from 'src/shared/pagination/page.dto';
import PageMetaDto from 'src/shared/pagination/page-meta.dto';

@Injectable()
export class SupporterService {
  constructor(
    @InjectRepository(SupporterEntity, 'mongoConnection')
    private readonly supporterEntityRepo: Repository<SupporterEntity>,
  ) {}

  async findSupporterByEmail(
    email: string,
    throwIfNotfound = true,
  ): Promise<SupporterEntity> {
    if (!email) {
      throw new BadRequestException('Email inválido.');
    }

    const supporter = await this.supporterEntityRepo.findOne({
      where: { email },
    });

    if (!supporter && throwIfNotfound) {
      throw new NotFoundException('Apoiador não encontrado.');
    }
    return supporter;
  }

  async create(
    createSupporterDTO: CreateSupporterDTO,
  ): Promise<SupporterEntity> {
    const supporterExists = await this.findSupporterByEmail(
      createSupporterDTO.email,
      false,
    );

    if (supporterExists) {
      throw new ConflictException(
        'Já existe apoiador registrado com esse email',
      );
    }

    const supporter = this.supporterEntityRepo.create({
      ...createSupporterDTO,
    });

    if (!supporter) {
      throw new BadRequestException('Apoiador não pôde ser criado');
    }

    return this.supporterEntityRepo.save(supporter);
  }

  async findAll(
    pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<SupporterEntity>> {
    const orderDirection = pageOptionsDto.order === 'ASC' ? 'ASC' : 'DESC';

    const [data, itemCount] = await Promise.all([
      this.supporterEntityRepo.find({
        order: {},
        skip: pageOptionsDto.skip,
        take: pageOptionsDto.take,
      }),
      this.supporterEntityRepo.count(),
    ]);

    const meta = new PageMetaDto({ pageOptionsDto: pageOptionsDto, itemCount });

    return new PageDto(data, meta);
  }
}
