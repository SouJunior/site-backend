import {
  Body,
  Controller,
  Post,
  UseGuards,
  Get,
  NotFoundException,
  Query,
  StreamableFile,
} from '@nestjs/common';
import { JuniorsService } from './juniors.service';
import { CreateJuniorDto } from './dtos/create-junior-dto';
import { ApiTags } from '@nestjs/swagger';
import { SecretKeyGuard } from 'src/shared/guards/secret-key.guard';
import { JuniorMDBEntity } from '../../database/entities/juniormdb.mongo-entity';
import { AsyncParser } from '@json2csv/node';
import { FilterJuniorsDTO } from './dtos/filter-junior-dto';
import { Readable } from 'typeorm/platform/PlatformTools';
import { GetJuniorsSwagger } from 'src/shared/swagger/decorators/junior/getJuniors.swagger';
import { CreateJuniorSwagger } from 'src/shared/swagger/decorators/junior/createJunior.swagger';
import { ExportJuniorsCsvSwagger } from 'src/shared/swagger/decorators/junior/exportJuniorsCsv.swagger';
import { PageOptionsDto } from 'src/shared/pagination/page-options.dto';
import PageDto from 'src/shared/pagination/page.dto';

@ApiTags('Junior')
@Controller('juniors')
export class JuniorsController {
  constructor(private readonly juniorsService: JuniorsService) {}

  @Post()
  @UseGuards(SecretKeyGuard)
  @CreateJuniorSwagger()
  async create(
    @Body() createJuniorDto: CreateJuniorDto,
  ): Promise<JuniorMDBEntity> {
    const junior = await this.juniorsService.create(createJuniorDto);
    return junior;
  }

  @Get()
  @GetJuniorsSwagger()
  async getJuniors(
    @Query() pageOptionsDto: PageOptionsDto,
    @Query('email') email?: string,
  ): Promise<PageDto<JuniorMDBEntity> | JuniorMDBEntity> {
    if (email) {
      const junior = await this.juniorsService.findJuniorByEmail(email);
      return junior;
    }

    const juniors = await this.juniorsService.findAll(pageOptionsDto);
    return juniors;
  }

  @Get('csv')
  @ExportJuniorsCsvSwagger()
  async exportJuniorsAsCSV(
    @Query() filters: FilterJuniorsDTO,
  ): Promise<StreamableFile> {
    const juniors = await this.juniorsService.findAllToCsv(filters);

    if (!juniors || juniors.length === 0) {
      throw new NotFoundException('Nenhum junior encontrado.');
    }

    const fields = ['name', 'email', 'area', 'subarea', 'linkedin'];
    const opts = { fields };
    const parser = new AsyncParser(opts);
    const csv = await parser.parse(juniors).promise();

    const readableStream = new Readable();
    readableStream.push(csv);
    readableStream.push(null);

    return new StreamableFile(readableStream, {
      disposition: 'attachment; filename="juniors.csv"',
      type: 'text/csv',
    });
  }
}
