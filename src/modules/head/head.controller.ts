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
import { HeadEntity } from 'src/database/entities/head.mongo-entity';
import { HeadService } from './head.service';
import { CreateHeadDTO } from './dto/create-head-dto';
import { SecretKeyGuard } from 'src/shared/guards/secret-key.guard';

@ApiTags('Head')
@Controller('head')
export class HeadController {
  constructor(private readonly headService: HeadService) {}

  @ApiOperation({
    summary: 'Registra o head no banco de dados',
  })
  @ApiResponse({
    status: 200,
    description: 'Sucesso',
    type: CreateHeadDTO,
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
  async create(@Body() createHeadDto: CreateHeadDTO): Promise<HeadEntity> {
    const head = await this.headService.create(createHeadDto);
    return head;
  }

  @ApiOperation({
    summary: 'Resgata informações do head no banco.',
  })
  @ApiResponse({
    status: 200,
    description: 'Sucesso',
    type: CreateHeadDTO,
  })
  @ApiResponse({
    status: 400,
    description: 'Erro',
    type: BadRequestException,
  })
  @Get(':email')
  async getByEmail(@Param('email') email: string) {
    const head = await this.headService.findHeadByEmail(email);
    return head;
  }

  @ApiOperation({
    summary: 'Resgata todos os heads do banco.',
  })
  @ApiResponse({
    status: 200,
    description: 'Sucesso',
    type: [CreateHeadDTO],
  })
  @ApiResponse({
    status: 400,
    description: 'Erro',
    type: BadRequestException,
  })
  @Get()
  async getAll(): Promise<HeadEntity[]> {
    const heads = await this.headService.findAll();
    return heads;
  }
}
