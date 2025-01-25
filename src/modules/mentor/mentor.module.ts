import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MentorEntity } from "src/database/entities/mentor.mongo-entity";
import { MentorController } from "./mentor.controller";
import { MentorService } from "./mentor.service";

@Module({
    imports:[
        TypeOrmModule.forFeature([MentorEntity], 'mongoConnection')
    ],
    controllers: [MentorController],
    providers: [MentorService],
})
export class MentorModule{}