import { BadRequestException, Body, Controller, Get, HttpStatus, NotFoundException, Param, Post, Res, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiHeader, ApiTags } from '@nestjs/swagger';
import { MentorEntity } from 'src/database/entities/mentor.mongo-entity';
import { MentorService } from './mentor.service';
import { CreateMentorDTO } from './dto/create-mentor-dto';
import { SecretKeyGuard } from 'src/shared/guards/secret-key.guard';


@Controller('mentor')
@ApiTags('Forms')
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
    
        const mentorExists = await this.mentorService.findMentorByEmail(createMentorDto.email);
        if (mentorExists){
            throw new BadRequestException('Já existe mentor com esse Email');
        }

        const mentor = await this.mentorService.create(createMentorDto);
        if (!mentor){
            throw new BadRequestException("Mentor não foi criado");
        }
        
        return mentor;
    }


    @ApiOperation({
        summary: "Resgata informações do mentor no banco."
    })
    @ApiResponse({
        status: HttpStatus.OK,
        description: "Sucesso",
        type: CreateMentorDTO
    })
    @ApiResponse({
        status: HttpStatus.NOT_FOUND,
        description: "Mentor não encontrado",
        type: NotFoundException
    })
    @ApiResponse({
        status: HttpStatus.BAD_REQUEST,
        description: "Chamada Incorreta",
        type: BadRequestException
    })
    @Get(":email")
    async getByEmail(@Param('email') email: string) : Promise<CreateMentorDTO>{
        if(!email || !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)){
            throw new BadRequestException("Email inválido.");
        }

        const mentor = await this.mentorService.findMentorByEmail(email);

        if(!mentor){
            throw new NotFoundException("Mentor não encontrado.");
        }

        return mentor;
    }
}