import { Controller, Post, Body, Get } from "@nestjs/common";

import { TripsService } from "./trips.service";

import { Trip } from "./trips.class";

@Controller('trips')
export class TripsController {

    constructor(
        private readonly tripsService: TripsService) {
    }

    @Post()
    addTrip(@Body() trip: Trip) {
        return this.tripsService.insertTrip(trip);
    }

    @Get()
    getAllTrips(){
        return this.tripsService.findAllTrips();
    }

}