import { BadRequestException, Body, Controller,  Get,  HttpStatus,  NotFoundException,  Param,  Post, UseGuards} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiHeader } from '@nestjs/swagger';
import { HeadEntity } from 'src/database/entities/head.mongo-entity';
import { HeadService } from './head.service';
import { CreateHeadDTO } from './dto/create-head-dto';
import { SecretKeyGuard } from 'src/shared/guards/secret-key.guard';

@Controller('head')
export class HeadController{
    constructor(private readonly headService: HeadService){}

    @ApiOperation({
        summary: 'Registra o Head no Banco de Dados',
    })
    @ApiResponse({
        status: 200,
        description: 'Sucesso',
        type: CreateHeadDTO
    })
    @ApiResponse({
        status: 400,
        description: 'Erro',
        type: BadRequestException
    })
    @ApiHeader({
        name: 'x-api-key',
        description: 'Chave secreta para autenticação'
    })
    @UseGuards(SecretKeyGuard)
    @Post()
    async create(@Body() createHeadDto: CreateHeadDTO) : Promise<HeadEntity>{

        const headExists = await this.headService.findMentorByEmail(createHeadDto.email);
        if (headExists){
            throw new BadRequestException('Já existe head com esse email');
        }

        const head = await this.headService.create(createHeadDto);
        if (!head){
            throw new BadRequestException("Head não foi criado");
        }

        return head;
    }

    @ApiOperation({
        summary: "Resgata informações do head no banco."
    })
    @ApiResponse({
        status: HttpStatus.OK,
        description: "Sucesso",
        type: CreateHeadDTO
    })
    @ApiResponse({
        status: HttpStatus.NOT_FOUND,
        description: "Mentor não encontrado.",
        type: NotFoundException
    })
    @ApiResponse({
        status: HttpStatus.BAD_REQUEST,
        description: "Erro na entrada",
        type: BadRequestException
    })
    @Get(":email")
    async getByEmail(@Param("email") email : string){
        if(!email || !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)){
            throw new BadRequestException("Email inválido.");
        }

        const head = await this.headService.findMentorByEmail(email);
        if(!head){
            throw new NotFoundException("Head não encontrado.");
        }

        return head;
    }
}