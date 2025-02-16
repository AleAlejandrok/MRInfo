import { MarvelRivalsApi } from "./types/MarvelRivalsAPI";
import { Player } from "./types/Player";
import 'dotenv/config'
import { GameScreenshot } from "./types/GameScreenshot";
import {  createWorker } from "tesseract.js";
import { Timer } from 'timer-node';


const main = async () => {
    const timer = new Timer();
    timer.start();
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
    const playerNamePromises = [];
    const playersArray: Promise<Player>[] = []
    for(const image of compScreen.userNames){ 
        playerNamePromises.push(worker.recognize(image))
    }
    

    await Promise.all(playerNamePromises)
    .then(async (resolvedPlayerNames) =>{
        resolvedPlayerNames.forEach((playerName)=>{
            console.log(`Got Name: ${playerName.data.text}`);
            playersArray.push(Player.create(api,playerName.data.text.trim()))
        });
    });

    await Promise.all(playersArray).then((players) =>{
        players.forEach((player) =>{
            if(!player.isError){
                console.log(`${player.playerName}: ${player.getTopThreeCompHeros()}`);
            }
            else{
                console.log(`${player.playerName}: private profile?`);
            }
        });
    });
    timer.stop();
    console.log(timer.ms());
    worker.terminate();
    return 0;
}

main();