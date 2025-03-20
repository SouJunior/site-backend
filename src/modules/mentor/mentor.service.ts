import { Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMentorDTO } from './dto/create-mentor-dto';
import { MentorEntity } from 'src/database/entities/mentor.mongo-entity';

@Injectable()
export class MentorService{
    constructor(
        @InjectRepository(MentorEntity, 'mongoConnection')
        private readonly mentorEntityRepo: Repository<MentorEntity>
    ){}

    async findMentorByEmail(email: string): Promise<MentorEntity>{
        const mentorEmail =  await this.mentorEntityRepo.findOne({where:{email}});

        return  mentorEmail;
    }

    async create(createMentorDto: CreateMentorDTO) : Promise<MentorEntity>{
        const mentor = this.mentorEntityRepo.create({
            ...createMentorDto
        });

        return this.mentorEntityRepo.save(mentor);
    }
}