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
import { MentorEntity } from 'src/database/entities/mentor.mongo-entity';
import { MentorService } from './mentor.service';
import { CreateMentorDTO } from './dto/create-mentor-dto';
import { SecretKeyGuard } from 'src/shared/guards/secret-key.guard';

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
    type: CreateMentorDTO,
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
    summary: 'Resgata informações do mentor no banco.',
  })
  @ApiResponse({
    status: 200,
    description: 'Sucesso',
    type: CreateMentorDTO,
  })
  @ApiResponse({
    status: 400,
    description: 'Erro',
    type: BadRequestException,
  })
  @Get(':email')
  async getByEmail(@Param('email') email: string): Promise<CreateMentorDTO> {
    const mentor = await this.mentorService.findMentorByEmail(email);
    return mentor;
  }

  @ApiOperation({
    summary: 'Resgata todos os mentores do banco.',
  })
  @ApiResponse({
    status: 200,
    description: 'Sucesso',
    type: [CreateMentorDTO],
  })
  @ApiResponse({
    status: 400,
    description: 'Erro',
    type: BadRequestException,
  })
  @Get()
  async getAll(): Promise<MentorEntity[]> {
    const mentors = await this.mentorService.findAll();
    return mentors;
  }
}
