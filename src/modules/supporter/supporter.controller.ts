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
import { SupporterEntity } from 'src/database/entities/supporter.mongo-entity';
import { SupporterService } from './supporter.service';
import { CreateSupporterDTO } from './dto/create-supporter-dto';
import { SecretKeyGuard } from 'src/shared/guards/secret-key.guard';
import { SupporterResponseDTO } from './dto/supporter-response.dto';

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
    summary:
      'Resgata um apoiador do banco por email ou todos, se nenhum email for fornecido',
  })
  @ApiResponse({
    status: 200,
    description: 'Sucesso',
    type: SupporterResponseDTO,
    isArray: true,
  })
  @ApiResponse({
    status: 400,
    description: 'Erro ao requisitar o apoiador',
    type: BadRequestException,
  })
  @ApiResponse({
    status: 404,
    description: 'Apoiador não encontrado',
    type: NotFoundException,
  })
  @ApiQuery({
    name: 'email',
    description: 'Email do apoiador (opcional)',
    required: false,
    type: String,
  })
  @Get()
  async getAll(
    @Query('email') email?: string,
  ): Promise<SupporterEntity[] | SupporterEntity> {
    if (email) {
      const supporter = await this.supporterService.findSupporterByEmail(email);
      return supporter;
    }

    const supporters = await this.supporterService.findAll();
    return supporters;
  }
}
