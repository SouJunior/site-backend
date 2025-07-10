import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MentorEntity } from "src/database/entities/mentor.mongo-entity";
import { MentorController } from "./mentor.controller";
import { MentorService } from "./mentor.service";
import { Area } from "src/database/entities/area.mongo-entity";
import { Subarea } from "src/database/entities/subarea.mongo-entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([MentorEntity, Area, Subarea], 'mongoConnection')
    ],
    controllers: [MentorController],
    providers: [MentorService],
})
export class MentorModule { }