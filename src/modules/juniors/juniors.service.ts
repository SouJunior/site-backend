import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JuniorEntity } from 'src/database/entities/junior.entity';
import { Repository } from 'typeorm';
import { CrearteJuniorDto } from './dtos/create-junior-dto';
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

    async create(createJuniorDto: CrearteJuniorDto): Promise<JuniorEntity> {
        try {
            const area = await this.areaRepository.findOneBy({ id: createJuniorDto.id_area });
        const subarea = await this.subareaRepository.findOneBy({ id: createJuniorDto.id_subarea });

        if (!area) {
            throw new NotFoundException('Area not found');
        }

        if (!subarea) {
            throw new NotFoundException('Subarea not found')
        }


        const junior = this.juniorRepository.create({
            ...createJuniorDto,
            id_area: area,
            id_subarea: subarea
        });


        return this.juniorRepository.save(junior)

        } catch (error) {
            throw new InternalServerErrorException("erro interno")
        }
    }

    async findJuniorByEmail(email: string): Promise<JuniorEntity> {
        const junior = await this.juniorRepository.findOneBy({ email })

        if (!junior) {
            return null
        }

        return junior;
    }
}