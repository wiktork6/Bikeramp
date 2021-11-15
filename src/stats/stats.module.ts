import { StatsController } from "./stats.controller";
import { StatsService } from "./stats.service";
import { Module } from "@nestjs/common";
import { TripEntity } from "src/trips/trips.entity";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
    imports:[TypeOrmModule.forFeature([TripEntity])],
    controllers: [StatsController],
    providers: [StatsService] 
})
export class StatsModule {

}