import {
  BadRequestException,
  Body,
  Controller,
  Get,
  NotFoundException,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiHeader,
  ApiTags,
  ApiQuery,
} from '@nestjs/swagger';
import { HeadEntity } from 'src/database/entities/head.mongo-entity';
import { HeadService } from './head.service';
import { CreateHeadDTO } from './dto/create-head-dto';
import { SecretKeyGuard } from 'src/shared/guards/secret-key.guard';
import { HeadResponseDTO } from './dto/head-response.dto';

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
    type: HeadResponseDTO,
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
    summary:
      'Resgata um head do banco por email ou todos, se nenhum email for fornecido',
  })
  @ApiResponse({
    status: 200,
    description: 'Sucesso',
    type: HeadResponseDTO,
    isArray: true,
  })
  @ApiResponse({
    status: 400,
    description: 'Erro ao requisitar o head',
    type: BadRequestException,
  })
  @ApiResponse({
    status: 404,
    description: 'Head não encontrado',
    type: NotFoundException,
  })
  @ApiQuery({
    name: 'email',
    description: 'Email do head (opcional)',
    required: false,
    type: String,
  })
  @Get()
  async getAll(
    @Query('email') email?: string,
  ): Promise<HeadEntity[] | HeadEntity> {
    if (email) {
      const head = await this.headService.findHeadByEmail(email);
      return head;
    }
    const heads = await this.headService.findAll();
    return heads;
  }
}
