import { BadRequestException, Body, Controller, Post} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SupporterEntity } from 'src/database/entities/supporter.mongo-entity';
import { SupporterService } from './supporter.service';
import { CreateSupporterDTO } from './dto/create-supporter-dto';


@Controller('supporter')
export class SupporterController{
    constructor(private readonly supporterService: SupporterService){}

    @ApiOperation({
        summary: 'Registra o Apoiador no Banco de Dados',
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
    @Post()
    async create(@Body() createSupporterDto: CreateSupporterDTO) : Promise<SupporterEntity>{

        const supporterExists = await this.supporterService.supporterIsRegistered(createSupporterDto.email);
        if (supporterExists){
            throw new BadRequestException("Já existe apoiador registrado com esse email");
        }

        const supporter = await this.supporterService.create(createSupporterDto);
        if(!supporter){
            throw new BadRequestException("Apoaidor não pôde ser criado");
        }

        return supporter;
    }
}