import { tripStub } from "../test/stubs/trips.stub"

export const TripsService = jest.fn().mockReturnValue({
    findAllTrips: jest.fn().mockResolvedValue([tripStub()]),
    insertTrip: jest.fn().mockResolvedValue(tripStub())

})