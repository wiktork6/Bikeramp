import { Test } from "@nestjs/testing"
import { TripsController } from "../trips.controller";
import { TripsService } from "../trips.service"
import { Trip } from "../trips.class";
import { tripStub } from "./stubs/trips.stub";


jest.mock('../trips.service');

describe('TripsController', () => {

    let tripsController: TripsController;
    let tripsService: TripsService;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [],
            controllers: [TripsController],
            providers: [TripsService]
        }).compile();

        tripsController = moduleRef.get<TripsController>(TripsController);
        tripsService = moduleRef.get<TripsService>(TripsService);
        jest.clearAllMocks();
    })

    describe('getAllTrips', () => {
        describe('when getAllTrips is called', () => {
            let trips: Trip[];

            beforeEach(async () => {
                trips = await tripsController.getAllTrips();
            })

            test('then it should call tripsService', () => {
                expect(tripsService.findAllTrips()).toHaveBeenCalled();
            })

            test('then it should return trips', () => {
                expect(trips).toEqual([tripStub()])
            })
        })
    })

    describe('insertTrip', () => {
        let trip: Trip;
        let createdTrip: Trip;

        beforeEach(async () => {
            createdTrip = {
                id: tripStub().id,
                startAdress: tripStub().startAdress,
                destinationAdress: tripStub().destinationAdress,
                price: tripStub().price,
                date: tripStub().date
            }
            trip = await tripsController.addTrip(createdTrip)
        })

        test('then it should call tripsService', () => {
            expect(tripsService.insertTrip).toHaveBeenCalledWith(
                createdTrip.id,
                createdTrip.startAdress,
                createdTrip.destinationAdress,
                createdTrip.price,
                createdTrip.date
            )
        })

        test('then it should return a user', () => {
            expect(trip).toEqual(tripStub())
        })
    })

})