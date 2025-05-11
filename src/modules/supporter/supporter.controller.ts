import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiHeader, ApiTags } from '@nestjs/swagger';
import { SupporterEntity } from 'src/database/entities/supporter.mongo-entity';
import { SupporterService } from './supporter.service';
import { CreateSupporterDTO } from './dto/create-supporter-dto';
import { SecretKeyGuard } from 'src/shared/guards/secret-key.guard';

@ApiTags('Supporter')
@Controller('supporter')
export class SupporterController {
  constructor(private readonly supporterService: SupporterService) {}

  @ApiOperation({
    summary: 'Registra o apoiador no banco de dados',
  })
  @ApiResponse({
    status: 200,
    description: 'Sucesso',
    type: CreateSupporterDTO,
  })
  @ApiResponse({
    status: 400,
    description: 'Erro',
    type: BadRequestException,
  })
  @ApiHeader({
    name: 'x-api-key',
    description: 'Chave secreta para autenticação',
  })
  @UseGuards(SecretKeyGuard)
  @Post()
  async create(
    @Body() createSupporterDto: CreateSupporterDTO,
  ): Promise<SupporterEntity> {
    const supporter = await this.supporterService.create(createSupporterDto);
    return supporter;
  }

  @ApiOperation({
    summary: 'Resgata registro do apoiador no banco.',
  })
  @ApiResponse({
    status: 200,
    description: 'Sucesso',
    type: CreateSupporterDTO,
  })
  @ApiResponse({
    status: 400,
    description: 'Erro',
    type: BadRequestException,
  })
  @Get(':email')
  async getByEmail(@Param('email') email: string) {
    const supporter = await this.supporterService.findSupporterByEmail(email);
    return supporter;
  }

  @ApiOperation({
    summary: 'Resgata todos os apoiadores do banco.',
  })
  @ApiResponse({
    status: 200,
    description: 'Sucesso',
    type: [CreateSupporterDTO],
  })
  @ApiResponse({
    status: 400,
    description: 'Erro',
    type: BadRequestException,
  })
  @Get()
  async getAll(): Promise<SupporterEntity[]> {
    const supporters = await this.supporterService.findAll();
    return supporters;
  }
}
