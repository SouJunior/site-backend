import { BadRequestException, Body, Controller, HttpStatus, Post, Res , UseGuards, Get, Req, Param, NotFoundException} from '@nestjs/common';
import { JuniorsService } from './juniors.service';
import { CreateJuniorDto } from './dtos/create-junior-dto';
import { JuniorEntity } from 'src/database/entities/junior.entity';
import { Response } from 'express';
import { ApiOperation, ApiResponse, ApiHeader, ApiTags } from '@nestjs/swagger';
import { SecretKeyGuard } from 'src/shared/guards/secret-key.guard';

@Controller('juniors')
@ApiTags('Forms')
export class JuniorsController {
  constructor(private readonly juniorsService: JuniorsService) { }

  
  @ApiOperation({
      summary: 'Registra o Junior no Banco de Dados',
    })
  @ApiResponse({
      status: 200,
      description: 'Sucesso',
      type: CreateJuniorDto,
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
  async create(@Body() createJuniorDto: CreateJuniorDto, @Res() res: Response): Promise<JuniorEntity> {


    try {
      const juniorExist = await this.juniorsService.findJuniorByEmail(createJuniorDto.email);

      if (juniorExist) {
        res.status(HttpStatus.CONFLICT).json({
          statusCode: HttpStatus.CONFLICT,
          message: 'Já existe um junior com esse email.'
        })
        return
      }

      const junior = await this.juniorsService.create(createJuniorDto);

      if(!junior){
        res.status(HttpStatus.BAD_REQUEST).json({mensagem: 'junior não foi criado'})
      }

      res.status(HttpStatus.CREATED).json(junior)

    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message: "Erro interno"})
    }
  }

  @ApiOperation({
    summary: "Resgata registro do junior no Banco"
  })
  @ApiResponse({
    status: 200,
    description: "Sucesso",
    type: CreateJuniorDto
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "Junior não encontrado",
    type: NotFoundException
  })
  @ApiResponse({
    status: 400,
    description: "Erro",
    type: BadRequestException,
  })
  @Get(":email")
  async getByEmail(@Param('email') email: string): Promise<CreateJuniorDto>{
      if(!email || !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)){
        throw new BadRequestException("Email inválido.");
      }

      const junior = await this.juniorsService.findJuniorByEmail(email);

      if(!junior){
        throw new NotFoundException("Junior não encontrado");
      }
      return junior;
  }
}
