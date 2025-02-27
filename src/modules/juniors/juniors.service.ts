import { HttpException, HttpStatus, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JuniorEntity } from 'src/database/entities/junior.entity';
import { Repository } from 'typeorm';
import { CreateJuniorDto } from './dtos/create-junior-dto';
import { Area } from 'src/database/entities/area.entity';
import { Subarea } from 'src/database/entities/subarea.entity';
import { JuniorMDBEntity } from 'src/database/entities/juniormdb.mongo-entity';


@Injectable()
export class JuniorsService {
    constructor(
        @InjectRepository(JuniorEntity)
        private readonly juniorRepository: Repository<JuniorEntity>,

        @InjectRepository(Area)
        private readonly areaRepository: Repository<Area>,

        @InjectRepository(Subarea)
        private readonly subareaRepository: Repository<Subarea>,

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
