import { BadRequestException, Body, Controller, Post, UseGuards} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiHeader } from '@nestjs/swagger';
import { SupporterEntity } from 'src/database/entities/supporter.mongo-entity';
import { SupporterService } from './supporter.service';
import { CreateSupporterDTO } from './dto/create-supporter-dto';
import { SecretKeyGuard } from 'src/shared/guards/secret-key.guard';


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
    @ApiHeader({
        name: 'x-api-key',
        description: 'Chave secreta para autenticação'
    })
    @UseGuards(SecretKeyGuard)
    @Post()
    async create(@Body() createSupporterDto: CreateSupporterDTO) : Promise<SupporterEntity>{

        const supporterExists = await this.supporterService.supporterIsRegistered(createSupporterDto.email);
        if (supporterExists){
            throw new BadRequestException("Já existe apoiador registrado com esse email");
        }

        const supporter = await this.supporterService.create(createSupporterDto);
        if(!supporter){
            throw new BadRequestException("Apoiador não pôde ser criado");
        }

        return supporter;
    }
}