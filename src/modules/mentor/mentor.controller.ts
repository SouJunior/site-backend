import { BadRequestException, Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { MentorEntity } from 'src/database/entities/mentor.mongo-entity';
import { MentorService } from './mentor.service';
import { CreateMentorDTO } from './dto/create-mentor-dto';


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
    @Post()
    async create(@Body() createMentorDto: CreateMentorDTO) : Promise<MentorEntity>{
    
        const mentorExists = await this.mentorService.mentorIsRegistered(createMentorDto.email);
        if (mentorExists){
            throw new BadRequestException('Já existe mentor com esse CPF ou Email');
        }

        const mentor = await this.mentorService.create(createMentorDto);
        if (!mentor){
            throw new BadRequestException("Mentor não foi criado");
        }
        
        return mentor;
    }
}