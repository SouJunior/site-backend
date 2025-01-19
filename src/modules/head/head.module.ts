import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { HeadEntity } from "src/database/entities/head.mongo-entity";
import { HeadController } from "./head.controller";
import { HeadService } from "./head.service";


@Module({
    imports:[
        TypeOrmModule.forFeature([HeadEntity], 'mongoConnection')
    ],
    controllers:[HeadController],
    providers: [HeadService],
})
export class HeadModule{}