import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UseGuards,
  Get,
  Param,
} from '@nestjs/common';
import { JuniorsService } from './juniors.service';
import { CreateJuniorDto } from './dtos/create-junior-dto';
import { ApiOperation, ApiResponse, ApiHeader, ApiTags } from '@nestjs/swagger';
import { SecretKeyGuard } from 'src/shared/guards/secret-key.guard';
import { JuniorMDBEntity } from '../../database/entities/juniormdb.mongo-entity';

@ApiTags('Junior')
@Controller('junior')
export class JuniorsController {
  constructor(private readonly juniorsService: JuniorsService) {}

  @ApiOperation({
    summary: 'Registra o Junior no Banco de Dados',
  })
  @ApiResponse({
    status: 200,
    description: 'Sucesso',
    type: CreateJuniorDto,
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
    @Body() createJuniorDto: CreateJuniorDto,
  ): Promise<JuniorMDBEntity> {
    const junior = await this.juniorsService.create(createJuniorDto);
    return junior;
  }

  @ApiOperation({
    summary: 'Resgata registro do junior no banco',
  })
  @ApiResponse({
    status: 200,
    description: 'Sucesso',
    type: CreateJuniorDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Erro',
    type: BadRequestException,
  })
  @Get(':email')
  async getByEmail(@Param('email') email: string): Promise<CreateJuniorDto> {
    const junior = await this.juniorsService.findJuniorByEmail(email);
    return junior;
  }

  @ApiOperation({
    summary: 'Resgata todos os juniors do banco',
  })
  @ApiResponse({
    status: 200,
    description: 'Sucesso',
    type: [CreateJuniorDto],
  })
  @ApiResponse({
    status: 400,
    description: 'Erro',
    type: BadRequestException,
  })
  @Get()
  async getAll(): Promise<CreateJuniorDto[]> {
    const juniors = await this.juniorsService.findAll();
    return juniors;
  }
}
