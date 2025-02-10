import { BadRequestException, Body, Controller, HttpStatus, Post, Res, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiHeader } from '@nestjs/swagger';
import { MentorEntity } from 'src/database/entities/mentor.mongo-entity';
import { MentorService } from './mentor.service';
import { CreateMentorDTO } from './dto/create-mentor-dto';
import { SecretKeyGuard } from 'src/shared/guards/secret-key.guard';


@Controller('mentor')
export class MentorController{
    constructor(private readonly mentorService: MentorService){}

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
        description: 'Chave secreta para autenticação'
    })
    @UseGuards(SecretKeyGuard)
    @Post()
    async create(@Body() createMentorDto: CreateMentorDTO) : Promise<MentorEntity>{
    
        const mentorExists = await this.mentorService.mentorIsRegistered(createMentorDto.email);
        if (mentorExists){
            throw new BadRequestException('Já existe mentor com esse Email');
        }

        const mentor = await this.mentorService.create(createMentorDto);
        if (!mentor){
            throw new BadRequestException("Mentor não foi criado");
        }
        
        return mentor;
    }
}