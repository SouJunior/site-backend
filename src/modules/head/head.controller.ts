import { BadRequestException, Body, Controller,  Post, UseGuards} from '@nestjs/common';
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

        const headExists = await this.headService.headIsRegistered(createHeadDto.email);
        if (headExists){
            throw new BadRequestException('Já existe head com esse email');
        }

        const head = await this.headService.create(createHeadDto);
        if (!head){
            throw new BadRequestException("Head não foi criado");
        }

        return head;
    }
}