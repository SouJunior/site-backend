import { BadRequestException, Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { JuniorsService } from './juniors.service';
import { CreateJuniorDto } from './dtos/create-junior-dto';
import { JuniorEntity } from 'src/database/entities/junior.entity';
import { Response } from 'express';

@Controller('juniors')
export class JuniorsController {
  constructor(private readonly juniorsService: JuniorsService) { }

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
        res.status(HttpStatus.BAD_REQUEST).json({mensagem: 'junior nãon foi criado'})
      }

      res.status(HttpStatus.CREATED).json(junior)

    } catch (error) {
       res.status(error.status).json({message: error.message})
    }
  }
}
