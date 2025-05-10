import { HttpException, HttpStatus, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateJuniorDto } from './dtos/create-junior-dto';
import { JuniorMDBEntity } from 'src/database/entities/juniormdb.mongo-entity';


@Injectable()
export class JuniorsService {
    constructor(
        @InjectRepository(JuniorMDBEntity, 'mongoConnection')
        private readonly juniormdbRepository: Repository<JuniorMDBEntity>
    ) { }

    async create(createJuniorDto: CreateJuniorDto): Promise<JuniorMDBEntity> {

        const juniorMDB = this.juniormdbRepository.create({
            ...createJuniorDto,
            startDate: new Date(createJuniorDto.startDate)
        });



        return this.juniormdbRepository.save(juniorMDB);
    }

    async findJuniorByEmail(email: string): Promise<JuniorMDBEntity> {
        const junior = await this.juniormdbRepository.findOne({where: { email }});

        if (!junior) {
            return null;
        }

        return junior;
    }
}
