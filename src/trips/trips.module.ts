import { Module } from "@nestjs/common";
import { TripsController } from "./trips.controller";
import { TripsService } from "./trips.service";
import { TripEntity } from "./trips.entity";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
    imports:[TypeOrmModule.forFeature([TripEntity])],
    controllers: [TripsController],
    providers: [TripsService] 
})
export class TripsModule {

}