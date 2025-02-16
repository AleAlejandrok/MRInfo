import axios from 'axios'; 
import { API_ENDPOINT } from "../constants";
//TODO: error handling
export class MarvelRivalsApi {
    apikey: string;
    apiUrl = API_ENDPOINT;
    constructor(apikey: string){
        this.apikey = apikey;
    }

    private async _makeRequest(endpoint?: string, query?: string, details?: string){
        const request = axios.get(`${this.apiUrl}${endpoint ? endpoint +'/' : ''}${query ? query + '/' : ''}${details ? details + '/': ''}`,{headers: { 'x-api-key': this.apikey }})
        .then( 
            (response: any) => {return response.data})
         .catch(() => {
        //     if (error.response) {
        //         console.log(error.response.data);
        //         console.log(error.response.status);
        //         console.log(error.response.headers);
        //     } else if (error.request) {
        //         console.log(error.request);
        //     } else {
        //         console.log('Error', error.message);
        //     }
        //     console.log(error.config);
        });
        return request; 
    }

    async checkAPIStatus(){
        this._makeRequest()
    }

    async getPlayerData(playerToFind:string){
        const update = await this._makeRequest('player',playerToFind,'update');
        if(update){
            return this._makeRequest('player',playerToFind);
        }
        return null;
    }
}
