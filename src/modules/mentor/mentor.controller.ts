import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MentorEntity } from 'src/database/entities/mentor.mongo-entity';
import { MentorService } from './mentor.service';
import { CreateMentorDTO } from './dto/create-mentor-dto';
import { SecretKeyGuard } from 'src/shared/guards/secret-key.guard';
import { CreateMentorSwagger } from 'src/shared/swagger/decorators/mentor/createMentor.swagger';
import { GetMentorSwagger } from 'src/shared/swagger/decorators/mentor/getMentor.swagger';
import { PageOptionsDto } from 'src/shared/pagination/page-options.dto';
import PageDto from 'src/shared/pagination/page.dto';

@ApiTags('Mentor')
@Controller('mentor')
export class MentorController {
  constructor(private readonly mentorService: MentorService) {}

  @CreateMentorSwagger()
  @UseGuards(SecretKeyGuard)
  @Post()
  async create(
    @Body() createMentorDto: CreateMentorDTO,
  ): Promise<MentorEntity> {
    const mentor = await this.mentorService.create(createMentorDto);
    return mentor;
  }

  @GetMentorSwagger()
  @Get()
  async getAll(
    @Query() pageOptionsDto: PageOptionsDto,
    @Query('email') email?: string,
  ): Promise<PageDto<MentorEntity> | MentorEntity> {
    if (email) {
      const mentor = await this.mentorService.findMentorByEmail(email);
      return mentor;
    }
    const mentors = await this.mentorService.findAll(pageOptionsDto);
    return mentors;
  }
}
