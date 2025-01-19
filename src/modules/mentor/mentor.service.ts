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

    async mentorIsRegistered(cpf: string, email: string): Promise<Boolean>{
        const mentorCPF =  await this.mentorEntityRepo.findOne({where:{cpf}});
        const mentorEmail =  await this.mentorEntityRepo.findOne({where:{email}});

        return mentorCPF || mentorEmail ? true : false;
    }

    async create(createMentorDto: CreateMentorDTO) : Promise<MentorEntity>{
        const mentor = this.mentorEntityRepo.create({
            ...createMentorDto
        });

        return this.mentorEntityRepo.save(mentor);
    }
}