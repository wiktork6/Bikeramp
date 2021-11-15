import { Injectable } from "@nestjs/common";
import { Trip } from "./trips.class";
import { Repository } from "typeorm";
import { TripEntity } from "./trips.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Raw } from "typeorm";
import { GoogleMapsApi } from "src/utils/GoogleMapsApi";
import { formatDay, getDaysInMonth, getLastWeekDate, getFirstDayOfCurrentMonth } from "src/utils/DateHelper";


@Injectable()
export class TripsService {


    constructor(
        @InjectRepository(TripEntity)
        private readonly tripRepository: Repository<TripEntity>,
    ) {
    }
    
    async insertTrip(trip: Trip): Promise<Trip> {
        const googleMapsApi = new GoogleMapsApi(trip.startAdress, trip.destinationAdress);

        const distance = await googleMapsApi.getDistance();
        trip.distance = distance/1000;

        return this.tripRepository.save(trip);
        
    }

    findAllTrips()  {
        return this.tripRepository.find();
    }

    
}
