import { MarvelRivalsApi } from "./MarvelRivalsAPI";

export class Player {
    api: MarvelRivalsApi;
    playerName:string;
    playerData:any;
    isError:boolean;

    public static async create(MRAPIInstance: MarvelRivalsApi, playerName:string): Promise<Player> {
        const player = new Player(MRAPIInstance, playerName);
        await player._insantiate();
        return player;
    }

    private async _insantiate() {
        const request = await this.api.getPlayerData(this.playerName);
        this.playerData = request;
        if(!this.playerData){
            this.isError = true;
        }    
    }

    private constructor(MRAPIInstance: MarvelRivalsApi, playerName: string){
        this.api = MRAPIInstance;
        this.playerName = playerName;
        this.isError = false;
    }

    getTopThreeCompHeros(): string[]{
        return this.playerData.heroes_ranked.sort(
            (hero1: { matches: number; },hero2: { matches: number; }) =>{
                return hero1.matches-hero2.matches;
            }
        ).slice(-3).map((hero: { hero_name: string; })=>hero.hero_name);
    }
}