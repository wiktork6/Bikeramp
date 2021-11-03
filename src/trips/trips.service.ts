import { Injectable } from "@nestjs/common";
import { Trip } from "./trips.model";

@Injectable()
export class TripsService {
    private trips: Trip[] = [];
    
    insertTrip(startAdress: string, destinationAdress: string, price: number, date: Date) {
        const tripId = new Date().toString();
        const trip = new Trip(tripId, startAdress, destinationAdress, price, date);
        this.trips.push(trip);
        return tripId;
    }

    getTrips() {
        return [...this.trips];
    }
}