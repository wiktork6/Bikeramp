import { Injectable } from "@nestjs/common";
import { Trip } from "./trips.interface";
import { Repository } from "typeorm";
import { TripEntity } from "./trips.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { from, Observable } from "rxjs";

@Injectable()
export class TripsService {

    constructor(
        @InjectRepository(TripEntity)
        private readonly tripRepository: Repository<TripEntity>
    ) {
    }
    
    insertTrip(trip: Trip): Observable<Trip> {
        return from(this.tripRepository.save(trip));
    }

    findAllTrips(): Observable<Trip[]> {
        return from(this.tripRepository.find());
    }
}