const axios = require('axios');

export class GoogleMapsApi{

    constructor(private readonly startAdress: string, private readonly endAdress: string){

    }

    config = {
        method: 'get',
        url: encodeURI(`https://maps.googleapis.com/maps/api/directions/json?origin=${this.startAdress}&destination=${this.endAdress}&key=${process.env.GOOGLE_API_KEY}`),
        headers: { }
    };


    private makeGetRequest: any = async () => {
        console.log(this.config.url);
        const response = await axios(this.config);
        return await response.data;
    
    }

    getDistance = async (): Promise<number> => {
        const result =  await this.makeGetRequest();
        return result.routes[0].legs[0].distance.value;
    } 
    
}

