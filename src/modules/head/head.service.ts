import { Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HeadEntity } from 'src/database/entities/head.mongo-entity';
import { CreateHeadDTO } from './dto/create-head-dto';

@Injectable()
export class HeadService{
    constructor(
        @InjectRepository(HeadEntity, 'mongoConnection')
        private readonly headEntityRepo: Repository<HeadEntity>
    ){}

    async headIsRegistered(cpf: string, email: string): Promise<Boolean>{
        const headCPF = await this.headEntityRepo.findOne({where: {cpf}});
        const headEmail = await this.headEntityRepo.findOne({where: {email}});

        return headCPF || headEmail ? true : false;
    }

    async create(createHeadDto: CreateHeadDTO) : Promise<HeadEntity>{
        const head = this.headEntityRepo.create({
            ...createHeadDto
        });

        return this.headEntityRepo.save(head);
    }
}