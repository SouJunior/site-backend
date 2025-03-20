import { Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SupporterEntity } from 'src/database/entities/supporter.mongo-entity';
import { CreateSupporterDTO } from './dto/create-supporter-dto';

@Injectable()
export class SupporterService{
    constructor(
        @InjectRepository(SupporterEntity, 'mongoConnection')
        private readonly supporterEntityRepo: Repository<SupporterEntity>
    ){}

    async findSupporterByEmail(email: string) : Promise<SupporterEntity>{
        const supporterEmail = await this.supporterEntityRepo.findOne({where: {email}});

        return supporterEmail;
    }

    async create(createSupporterDTO: CreateSupporterDTO) : Promise<SupporterEntity>{
        const supporter = this.supporterEntityRepo.create({
            ...createSupporterDTO
        });

        return this.supporterEntityRepo.save(supporter);
    }
}