import { Injectable } from "@nestjs/common";
import { Trip } from "./trips.class";
import { Repository } from "typeorm";
import { TripEntity } from "./trips.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Raw } from "typeorm";
import { GoogleMapsApi } from "src/utils/GoogleMapsApi";
import { DateHelper } from "src/utils/DateHelper";


@Injectable()
export class TripsService {

    private dateHelper = new DateHelper();

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

    async getWeeklyStats() {
        const dateWeekAgo = this.dateHelper.getLastWeekDate();
        const validTrips = await this.tripRepository.find({date: Raw((alias) => `${alias} > :date`, { date: dateWeekAgo })});
        let totalDistance = 0;
        let totalPrice = 0;
        validTrips.forEach(trip => {
            totalDistance += Number(trip.distance);
            totalPrice += Number(trip.price);
        })
        return {
            total_distance: String(totalDistance) + "km",
            total_price: String(totalPrice) + "PLN"
        }
    }


    async getMonthlyStats() {
        const startDate = this.dateHelper.getFirstDayOfCurrentMonth();
        const validTrips = await this.tripRepository.find({ date: Raw((alias) => `${alias} > :date`, { date: startDate })});

        let preparedForSummary = {};

        validTrips.forEach( trip => {
            const dayInMonth = trip.date.getDate();
            if(!preparedForSummary[dayInMonth]){
                preparedForSummary[dayInMonth] = [];
            }
            preparedForSummary[dayInMonth].push(trip);
        })

        const daysInMonth = this.dateHelper.getDaysInMonth(startDate.getFullYear(), startDate.getMonth()+1);
        const daysList = [...Array(daysInMonth).keys()];

        return daysList.map(day => ({
            day: this.dateHelper.formatDay(day, startDate),
            total_distance: `${preparedForSummary[day] ? preparedForSummary[day].reduce((totalDistance, trip) => Number(totalDistance) + Number(trip.distance), 0) : 0}km`,
            avg_ride: `${preparedForSummary[day] ? preparedForSummary[day].reduce((totalDistance, trip) => Number(totalDistance) + Number(trip.distance), 0)/preparedForSummary[day].length : 0}km`,
            avg_price: `${preparedForSummary[day] ? preparedForSummary[day].reduce((totalPrice, trip) => Number(totalPrice) + Number(trip.price), 0)/preparedForSummary[day].length : 0}PLN`
        }))
    }
    
}
