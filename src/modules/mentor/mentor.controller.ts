import { Body, Controller, Post } from '@nestjs/common';
import { MentorServices } from './mentor.service';
import { createMentorDto } from './dtos/create-mentor.dto';

@Controller('mentor')
export class MentorController {
  constructor(private readonly mentorServices: MentorServices) {}

  @Post()
  async addMentor(@Body() createMentorDto: createMentorDto) {
    return this.mentorServices.newMentor(createMentorDto);
  }
}
