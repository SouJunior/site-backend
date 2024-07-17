import { BadRequestException, Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { JuniorsService } from './juniors.service';
import { CrearteJuniorDto } from './dtos/create-junior-dto';
import { JuniorEntity } from 'src/database/entities/junior.entity';
import { Response } from 'express';

@Controller('juniors')
export class JuniorsController {
  constructor(private readonly juniorsService: JuniorsService) { }

  @Post()
  async create(@Body() createJuniorDto: CrearteJuniorDto, @Res() res: Response): Promise<JuniorEntity> {
    

    try {
      const juniorExist = await this.juniorsService.findJuniorByEmail(createJuniorDto.email);


      if (juniorExist) {
        res.status(HttpStatus.CONFLICT).json({
          statusCode: HttpStatus.CONFLICT,
          message: 'Já existe um junior com esse email.'
        })
        return
      }

      const junior = this.juniorsService.create(createJuniorDto);

      res.status(HttpStatus.CREATED).json(junior)

    } catch (error) {
       res.status(500).json({mesage: "Erro no servidor"})
    } 
  }
}
