import { BadRequestException, Body, Controller,  Post } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { HeadEntity } from 'src/database/entities/head.mongo-entity';
import { HeadService } from './head.service';
import { CreateHeadDTO } from './dto/create-head-dto';

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
    @Post()
    async create(@Body() createHeadDto: CreateHeadDTO) : Promise<HeadEntity>{

        const headExists = await this.headService.headIsRegistered(createHeadDto.email);
        if (headExists){
            throw new BadRequestException('Já existe head com esse email ou cpf');
        }

        const head = await this.headService.create(createHeadDto);
        if (!head){
            throw new BadRequestException("Head não foi criado");
        }

        return head;
    }
}