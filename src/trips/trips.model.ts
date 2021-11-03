
export class Trip {
    private distance: number;
    constructor(
        private id: string, 
        private startAdress: string, 
        private destinationAdress: string,
        private price: number,
        private date: Date
        ) {}

    calculateDistance(){
        const distance = 10;
        return this.distance = distance;
    }

}