import { HttpException, HttpStatus, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JuniorEntity } from 'src/database/entities/junior.entity';
import { Repository } from 'typeorm';
import { CreateJuniorDto } from './dtos/create-junior-dto';
import { Area } from 'src/database/entities/area.entity';
import { Subarea } from 'src/database/entities/subarea.entity';


@Injectable()
export class JuniorsService {
    constructor(
        @InjectRepository(JuniorEntity)
        private readonly juniorRepository: Repository<JuniorEntity>,

        @InjectRepository(Area)
        private readonly areaRepository: Repository<Area>,

        @InjectRepository(Subarea)
        private readonly subareaRepository: Repository<Subarea>
    ) { }

    async create(createJuniorDto: CreateJuniorDto): Promise<JuniorEntity> {

        const area = await this.areaRepository.findOneBy({ id: createJuniorDto.id_area });
        const subarea = await this.subareaRepository.findOneBy({ id: createJuniorDto.id_subarea });

        if (!area) {
            throw new HttpException('area not found', HttpStatus.NOT_FOUND);
        }

        if (!subarea) {
            throw new HttpException('area not found', HttpStatus.NOT_FOUND);
        }


        const junior = this.juniorRepository.create({
            ...createJuniorDto,
            id_area: area,
            id_subarea: subarea,
            start_date: new Date(createJuniorDto.start_date)
        });


        return this.juniorRepository.save(junior)

    }

    async findJuniorByEmail(email: string): Promise<JuniorEntity> {
        const junior = await this.juniorRepository.findOneBy({ email })

        if (!junior) {
            return null
        }

        return junior;
    }
}
