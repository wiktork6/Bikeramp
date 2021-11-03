import { Controller, Post, Body, Get } from "@nestjs/common";
import { start } from "repl";
import { TripsService } from "./trips.service";

@Controller('api')
export class TripsController {

    constructor(private readonly tripsService: TripsService) {

    }

    @Post('trips')
    addProduct(
        @Body('startAdress') startAdress: string, 
        @Body('destinationAdress') destinationAdress: string, 
        @Body('price') price: number, 
        @Body('date') date: Date,
    ) {
        const id = this.tripsService.insertTrip(startAdress, destinationAdress, price, date);
        return {
            id: id
        };
    }

    @Get('trips')
    getAllTrips(){
        return this.tripsService.getTrips();
    }
}