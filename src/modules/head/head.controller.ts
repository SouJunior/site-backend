import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { HeadEntity } from 'src/database/entities/head.mongo-entity';
import { HeadService } from './head.service';
import { CreateHeadDTO } from './dto/create-head-dto';
import { SecretKeyGuard } from 'src/shared/guards/secret-key.guard';
import { CreateHeadSwagger } from 'src/shared/swagger/decorators/head/createHead.swagger';
import { GetHeadSwagger } from 'src/shared/swagger/decorators/head/getHead.swagger';
import { PageOptionsDto } from 'src/shared/pagination/page-options.dto';
import PageDto from 'src/shared/pagination/page.dto';

@ApiTags('Head')
@Controller('head')
export class HeadController {
  constructor(private readonly headService: HeadService) {}

  @CreateHeadSwagger()
  @UseGuards(SecretKeyGuard)
  @Post()
  async create(@Body() createHeadDto: CreateHeadDTO): Promise<HeadEntity> {
    const head = await this.headService.create(createHeadDto);
    return head;
  }

  @GetHeadSwagger()
  @Get()
  async getAll(
    @Query() pageOptionsDto: PageOptionsDto,
    @Query('email') email?: string,
  ): Promise<PageDto<HeadEntity> | HeadEntity> {
    if (email) {
      const head = await this.headService.findHeadByEmail(email);
      return head;
    }

    const heads = await this.headService.findAll(pageOptionsDto);
    return heads;
  }
}
