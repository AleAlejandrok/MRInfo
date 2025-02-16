import { MarvelRivalsApi } from "./types/MarvelRivalsAPI";
import { Player } from "./types/Player";
import 'dotenv/config'
import { GameScreenshot } from "./types/GameScreenshot";
import {  createWorker } from "tesseract.js";



const main = async () => {
    const api = new MarvelRivalsApi(process.env.apikey!);
    //check if a valid game is even running 
    // const processes = await psList();
    // const game = processes.filter(obj => {
    //     obj.name === MARVEL_RIVALS_PROCESS_NAME
    // });

    // if(!game.length){
    //     throw "Error: no valid game running";
        // return -1;
    // }

    const compScreen = await GameScreenshot.create();
    const worker = await createWorker(['eng', 'jpn','chi_sim','chi_tra','spa'])

    for(const image of compScreen.userNames){ 
        const playerName = (await worker.recognize(image )).data.text;
        const player = await Player.create(api, playerName);
        if(!player.isError){
            console.log(`${playerName}: ${player.getTopThreeCompHeros()}`);
        }
        else{
            console.log(`Error: ${playerName} not found on Marvel Rivals API`);
        }
    };

    worker.terminate();
    return 0;
}

main();