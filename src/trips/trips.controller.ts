import { Controller, Post, Body, Get } from "@nestjs/common";

import { TripsService } from "./trips.service";

import { Trip } from "./trips.interface";
import { Observable } from "rxjs";

@Controller()
export class TripsController {

    constructor(
        private readonly tripsService: TripsService) {
    }

    @Post('trips')
    addTrip(@Body() trip: Trip): Observable<Trip> {
        return this.tripsService.insertTrip(trip);
    }

    @Get('trips')
    getAllTrips(){
        return this.tripsService.findAllTrips();
    }

    @Get('stats/weekly')
    getWeeklyStats(){
        return this.tripsService.getWeeklyStats();
    }

    @Get('stats/monthly')
    getMonthlyStats(){
        return this.tripsService.getMonthlyStats();
    }
}