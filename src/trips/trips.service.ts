import { Injectable } from "@nestjs/common";
import { Trip } from "./trips.interface";
import { Repository } from "typeorm";
import { TripEntity } from "./trips.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Raw } from "typeorm";
import { from, Observable } from "rxjs";


@Injectable()
export class TripsService {

    constructor(
        @InjectRepository(TripEntity)
        private readonly tripRepository: Repository<TripEntity>
    ) {
    }
    
    insertTrip(trip: Trip): Observable<Trip> {
        // const distance = this.calculateDistance(trip.startAdress, trip.destinationAdress);
        const distance = 4;
        trip.distance = distance;
        return from(this.tripRepository.save(trip));
    }

    findAllTrips(): Observable<Trip[]> {
        return from(this.tripRepository.find());
    }

    async getWeeklyStats() {
        const dateWeekAgo = this.getLastWeekDate();
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
        const startDate = this.getFirstDayOfCurrentMonth();
        const validTrips = await this.tripRepository.find(
            {
                date: Raw((alias) => `${alias} > :date`, { date: startDate }),
                
            }
            );


        let preparedForSummary = {};

        validTrips.forEach( trip => {
            const dayInMonth = trip.date.getDate();
            if(!preparedForSummary[dayInMonth]){
                preparedForSummary[dayInMonth] = [];
            }
            preparedForSummary[dayInMonth].push(trip);
        })

        const daysInMonth = this.getDaysInMonth(startDate.getFullYear(), startDate.getMonth()+1);
        const daysList = [...Array(daysInMonth).keys()];

        return daysList.map(day => ({
            day: this.formatDay(day, startDate),
            total_distance: `${preparedForSummary[day] ? preparedForSummary[day].reduce((totalDistance, trip) => Number(totalDistance) + Number(trip.distance), 0) : 0}km`,
            avg_ride: `${preparedForSummary[day] ? preparedForSummary[day].reduce((totalDistance, trip) => Number(totalDistance) + Number(trip.distance), 0)/preparedForSummary[day].length : 0}km`,
            avg_price: `${preparedForSummary[day] ? preparedForSummary[day].reduce((totalPrice, trip) => Number(totalPrice) + Number(trip.price), 0)/preparedForSummary[day].length : 0}PLN`
        }))
    }
        
    private formatDay(day, startDate: Date){
        const month = startDate.toLocaleString('en-us', { month: 'short' });
        day = day+1;
        if(day === 1){
            return `${month}, ${day}st`
        } else if(day === 2){
            return `${month}, ${day}nd`
        } else if (day === 3){
            return `${month}, ${day}rd`
        }
        return `${month}, ${day}th`
    }
    private getDaysInMonth(year, month){
        return new Date(year, month, 0).getDate()
    }

    private getFirstDayOfCurrentMonth(){
        const currentDate = new Date();
        const monthStartDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)
        return monthStartDate;
    }

    private getLastWeekDate(){
        const currentDate = new Date();
        currentDate.setDate(currentDate.getDate()-7);
        return currentDate;
    }


//     private calculateDistance(startAdress: string, destinationAdress: string): number{
//         var axios = require('axios');

//         var config = {
//             method: 'get',
//             url: 'https://maps.googleapis.com/maps/api/distancematrix/json?origins=40.6655101%2C-73.89188969999998&destinations=40.659569%2C-73.933783%7C40.729029%2C-73.851524%7C40.6860072%2C-73.6334271%7C40.598566%2C-73.7527626&key=YOUR_API_KEY',
//             headers: { }
//         };

//         axios(config)
// .then(function (response) {
//   console.log(JSON.stringify(response.data));
// })
// .catch(function (error) {
//   console.log(error);
// });
//         return distance;
//     }

}