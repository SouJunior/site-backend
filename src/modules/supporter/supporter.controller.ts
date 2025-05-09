import { BadRequestException, Body, Controller, Get, HttpStatus, NotFoundException, Param, Post, UseGuards} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiHeader, ApiTags } from '@nestjs/swagger';
import { SupporterEntity } from 'src/database/entities/supporter.mongo-entity';
import { SupporterService } from './supporter.service';
import { CreateSupporterDTO } from './dto/create-supporter-dto';
import { SecretKeyGuard } from 'src/shared/guards/secret-key.guard';


@Controller('supporter')
@ApiTags('Forms')
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

        const supporterExists = await this.supporterService.findSupporterByEmail(createSupporterDto.email);
        if (supporterExists){
            throw new BadRequestException("Já existe apoiador registrado com esse email");
        }

        const supporter = await this.supporterService.create(createSupporterDto);
        if(!supporter){
            throw new BadRequestException("Apoiador não pôde ser criado");
        }

        return supporter;
    }

    @ApiOperation({
        summary: "Resgata registro do apoiador no db."
    })
    @ApiResponse({
        status: HttpStatus.OK,
        description: "Sucesso na operação.",
        type: CreateSupporterDTO
    })
    @ApiResponse({
        status: HttpStatus.NOT_FOUND,
        description: "Apoiador não encontrado.",
        type: NotFoundException
    })
    @ApiResponse({
        status: HttpStatus.BAD_REQUEST,
        description: "Erro na entrada do email",
        type: BadRequestException
    })
    @Get(":email")
    async getByEmail(@Param("email") email : string){
        if(!email || !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)){
            throw new BadRequestException("Email inválido.");
        }

        const supporter = await this.supporterService.findSupporterByEmail(email);

        if(!supporter){
            throw new NotFoundException("Apoiador não encontrado.");
        }

        return supporter;
    }
}