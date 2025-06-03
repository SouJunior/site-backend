import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HeadEntity } from 'src/database/entities/head.mongo-entity';
import { CreateHeadDTO } from './dto/create-head-dto';
import { PageOptionsDto } from 'src/shared/pagination/page-options.dto';
import PageMetaDto from 'src/shared/pagination/page-meta.dto';
import PageDto from 'src/shared/pagination/page.dto';

@Injectable()
export class HeadService {
  constructor(
    @InjectRepository(HeadEntity, 'mongoConnection')
    private readonly headEntityRepo: Repository<HeadEntity>,
  ) {}

  async findHeadByEmail(
    email: string,
    throwIfNotfound = true,
  ): Promise<HeadEntity> {
    if (!email) {
      throw new BadRequestException('Email inválido.');
    }

    const head = await this.headEntityRepo.findOne({ where: { email } });

    if (!head && throwIfNotfound) {
      throw new NotFoundException('Head não encontrado');
    }
    return head;
  }

  async create(createHeadDto: CreateHeadDTO): Promise<HeadEntity> {
    const headExists = await this.findHeadByEmail(createHeadDto.email, false);

    if (headExists) {
      throw new ConflictException('Já existe head com esse email');
    }

    const head = this.headEntityRepo.create({
      ...createHeadDto,
    });

    if (!head) {
      throw new BadRequestException('Head não foi criado');
    }

    return this.headEntityRepo.save(head);
  }

  async findAll(pageOptionsDto: PageOptionsDto): Promise<PageDto<HeadEntity>> {
    const orderDirection = pageOptionsDto.order === 'ASC' ? 'ASC' : 'DESC';

    const [data, itemCount] = await Promise.all([
      this.headEntityRepo.find({
        order: { createdAt: orderDirection },
        skip: pageOptionsDto.skip,
        take: pageOptionsDto.take,
      }),
      this.headEntityRepo.count(),
    ]);

    const meta = new PageMetaDto({ pageOptionsDto, itemCount });
    return new PageDto(data, meta);
  }
}
