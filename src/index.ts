import { MarvelRivalsApi } from "./types/MarvelRivalsAPI";
import { Player } from "./types/Player";
import 'dotenv/config'
import psList from "../node_modules/ps-list/index";
import { GameScreenshot } from "./types/GameScreenshot";


const main = async () => {
    // const api = new MarvelRivalsApi(process.env.apikey!);
    // const playerNames:string[] = [
    //     "zexify"
    // ]
    //check if a valid game is even running 
    // const processes = await psList();
    // const game = processes.filter(obj => {
    //     obj.name === MARVEL_RIVALS_PROCESS_NAME
    // });

    // if(!game.length){
    //     throw "Error: no valid game running";
        // return -1;
    // }
    // const players:Player[] = []
    // for(const playerName of playerNames){
    //     const player = await Player.createPlayer(api, playerName);
    //     players.push(player)
    //     console.log(player.getTopThreeCompHeros());
    // }
    

    const compScreen = await GameScreenshot.create();
    
    console.log('debug');
}

main();