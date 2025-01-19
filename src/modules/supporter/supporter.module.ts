import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SupporterEntity } from "src/database/entities/supporter.mongo-entity";
import { SupporterController } from "./supporter.controller";
import { SupporterService } from "./supporter.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([SupporterEntity], 'mongoConnection')
    ],
    controllers: [SupporterController],
    providers: [SupporterService],
})
export class SupporterModule{}