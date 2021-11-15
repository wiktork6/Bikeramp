const axios = require('axios');

export class GoogleMapsApi{

    constructor(private readonly startAdress, private readonly endAdress){

    }

    config = {
        method: 'get',
        url: `https://maps.googleapis.com/maps/api/directions/json?origin=${this.startAdress}&destination=${this.endAdress}&key=${process.env.GOOGLE_API_KEY}`,
        headers: { }
    };


    private makeGetRequest: any = async () => {
        const response = await axios(this.config);
            // console.log(response.data.routes[0].legs[0].distance.value)
            // console.log(response.data)
        return await response.data;
    
    }

    getDistance = async (): Promise<number> => {
        const result =  await this.makeGetRequest();
        return result.routes[0].legs[0].distance.value;
    } 
    
}

