import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SupporterEntity } from 'src/database/entities/supporter.mongo-entity';
import { SupporterService } from './supporter.service';
import { CreateSupporterDTO } from './dto/create-supporter-dto';
import { SecretKeyGuard } from 'src/shared/guards/secret-key.guard';
import { CreateSupporterSwagger } from 'src/shared/swagger/decorators/supporter/createSupporter.swagger';
import { GetSupporterSwagger } from 'src/shared/swagger/decorators/supporter/getSupporter.swagger';
import { PageOptionsDto } from 'src/shared/pagination/page-options.dto';
import PageDto from 'src/shared/pagination/page.dto';

@ApiTags('Supporter')
@Controller('supporter')
export class SupporterController {
  constructor(private readonly supporterService: SupporterService) {}

  @CreateSupporterSwagger()
  @UseGuards(SecretKeyGuard)
  @Post()
  async create(
    @Body() createSupporterDto: CreateSupporterDTO,
  ): Promise<SupporterEntity> {
    const supporter = await this.supporterService.create(createSupporterDto);
    return supporter;
  }

  @GetSupporterSwagger()
  @Get()
  async getAll(
    @Query() pageOptionsDto: PageOptionsDto,
    @Query('email') email?: string,
  ): Promise<PageDto<SupporterEntity> | SupporterEntity> {
    if (email) {
      const supporter = await this.supporterService.findSupporterByEmail(email);
      return supporter;
    }

    const supporters = await this.supporterService.findAll(pageOptionsDto);
    return supporters;
  }
}
