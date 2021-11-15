import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Raw } from "typeorm";
import { formatDay, getDaysInMonth, getLastWeekDate, getFirstDayOfCurrentMonth } from "src/utils/DateHelper";
import { TripEntity } from "src/trips/trips.entity";


@Injectable()
export class StatsService {


    constructor(
        @InjectRepository(TripEntity)
        private readonly tripRepository: Repository<TripEntity>,
    ) {
    }
    

    async getWeeklyStats() {
        const dateWeekAgo = getLastWeekDate();
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
        const startDate = getFirstDayOfCurrentMonth();
        const validTrips = await this.tripRepository.find({ date: Raw((alias) => `${alias} > :date`, { date: startDate })});

        let preparedForSummary = {};

        validTrips.forEach( trip => {
            const dayInMonth = trip.date.getDate();
            if(!preparedForSummary[dayInMonth]){
                preparedForSummary[dayInMonth] = [];
            }
            preparedForSummary[dayInMonth].push(trip);
        })

        const daysInMonth = getDaysInMonth(startDate.getFullYear(), startDate.getMonth()+1);
        const daysList = [...Array(daysInMonth).keys()];

        return daysList.map(day => ({
            day: formatDay(day, startDate),
            total_distance: `${preparedForSummary[day] ? preparedForSummary[day].reduce((totalDistance, trip) => Number(totalDistance) + Number(trip.distance), 0) : 0}km`,
            avg_ride: `${preparedForSummary[day] ? preparedForSummary[day].reduce((totalDistance, trip) => Number(totalDistance) + Number(trip.distance), 0)/preparedForSummary[day].length : 0}km`,
            avg_price: `${preparedForSummary[day] ? preparedForSummary[day].reduce((totalPrice, trip) => Number(totalPrice) + Number(trip.price), 0)/preparedForSummary[day].length : 0}PLN`
        }))
    }
    
}
