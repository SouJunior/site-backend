import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { MentorServices } from './mentor.service';
import { createMentorDto } from './dtos/create-mentor.dto';
import { Response } from 'express';
import { MentorEntity } from 'src/database/entities/mentor.entity';

@Controller('mentors')
export class MentorController {
  constructor(private readonly mentorServices: MentorServices) {}

  @Post()
  async addMentor(@Body() createMentorDto: createMentorDto, @Res() res: Response): Promise<MentorEntity> {
    try {
      const mentorExiste = await this.mentorServices.findMentorByEmail(createMentorDto.email);

      if(mentorExiste){
        res.status(HttpStatus.CONFLICT).json({
          statusCode: HttpStatus.CONFLICT,
          message: 'Já existe um mentor com esse email.'
        })
        return
      }

      const mentor = await this.mentorServices.newMentor(createMentorDto);

      if(!mentor){
        res.status(HttpStatus.BAD_REQUEST).json({message: 'Menot não foi criado'})
        return
      }

      res.status(HttpStatus.CREATED).json(mentor)
      
    } catch (error) {
      res.status(error.status).json({message: error.message})
    }
  }
}
