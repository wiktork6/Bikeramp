import { Trip } from "src/trips/trips.class";

export const tripStub = (): Trip => {
    return {
        id: 13,
        startAdress: "Mickiewicza 13 Gdansk",
        destinationAdress: "Grunwaldzka 11 Gdansk",
        distance: 13.22,
        price: 11.62,
        date: new Date(1997,10,10)
    }
}