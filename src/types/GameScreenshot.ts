/* eslint-disable no-undef */
const screenshot = require('screenshot-desktop');
import sharp from 'sharp';
import si from 'systeminformation';
import fs from 'fs';
import path from 'path'
const crypto = require('crypto');

export class GameScreenshot {
    userNames!: Buffer[];

    public static async create(){
        const gameScreenshot = new GameScreenshot;
        await gameScreenshot._instantiate();
        // for(let userName of gameScreenshot.userNames){
        //     const patht = path.resolve(`./src/types/test${crypto.randomBytes(2).toString('base64').replace(/[^a-zA-Z0-9]/g, '').slice(0, 3)}.png`);
        //     await fs.promises.writeFile(patht, userName);
        // }
        return gameScreenshot;
    }

    private async _instantiate() { 
        const mainMonitorId = await si.graphics().then(data => {
            return data.displays.find(display => (display.main == true))?.deviceName;
        }).catch(error => console.error(error));
        try {
            await screenshot({ screen: mainMonitorId })
            .then( async (img: Buffer) => {
                const userNameFactory = sharp(img)
                await userNameFactory
                .metadata()
                .then( async metadata => {
                    for(let i=0;i<6;i++){
                        const left:number = Math.round(.74357*(metadata.width!) - (.0156 * (metadata.width!)*i))
                        const width:number = Math.round(.071875*metadata.width!)
                        const top:number = Math.round((.1745*metadata.height!) + (i * metadata.height! * .1152 ))
                        const height:number = Math.round(.0207*metadata.height!);
                        const userName = await userNameFactory.clone().extract({ left: left, height: height, top: top, width: width }).toBuffer()
                        this.userNames.push(userName);
                    }
                });
            });
        } catch (error) {
            console.log(error);
        }
    }

    private constructor(){
        this.userNames = [];
    }





}