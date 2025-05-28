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
import { MentorEntity } from 'src/database/entities/mentor.mongo-entity';
import { MentorService } from './mentor.service';
import { CreateMentorDTO } from './dto/create-mentor-dto';
import { SecretKeyGuard } from 'src/shared/guards/secret-key.guard';
import { MentorResponseDTO } from './dto/mentor-response.dto';

@ApiTags('Mentor')
@Controller('mentor')
export class MentorController {
  constructor(private readonly mentorService: MentorService) {}

  @ApiOperation({
    summary: 'Registra o Mentor no Banco de Dados',
  })
  @ApiResponse({
    status: 200,
    description: 'Sucesso',
    type: MentorResponseDTO,
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
    @Body() createMentorDto: CreateMentorDTO,
  ): Promise<MentorEntity> {
    const mentor = await this.mentorService.create(createMentorDto);
    return mentor;
  }

  @ApiOperation({
    summary:
      'Resgata um mentor do banco por email ou todos, se nenhum email for fornecido',
  })
  @ApiResponse({
    status: 200,
    description: 'Sucesso',
    type: MentorResponseDTO,
    isArray: true,
  })
  @ApiResponse({
    status: 400,
    description: 'Erro ao requisitar o mentor',
    type: BadRequestException,
  })
  @ApiResponse({
    status: 404,
    description: 'Mentor não encontrado',
    type: NotFoundException,
  })
  @ApiQuery({
    name: 'email',
    description: 'Email do mentor (opcional)',
    required: false,
    type: String,
  })
  @Get()
  async getAll(
    @Query('email') email?: string,
  ): Promise<MentorEntity[] | MentorEntity> {
    if (email) {
      const mentor = await this.mentorService.findMentorByEmail(email);
      return mentor;
    }
    const mentors = await this.mentorService.findAll();
    return mentors;
  }
}
