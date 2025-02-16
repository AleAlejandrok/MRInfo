import { MarvelRivalsApi } from "./MarvelRivalsAPI";

export class Player {
    api: MarvelRivalsApi;
    playerName:string;
    playerData:any;

    public static async create(MRAPIInstance: MarvelRivalsApi, playerName:string): Promise<Player> {
        const player = new Player(MRAPIInstance, playerName);
        await player._insantiate();
        return player;
    }

    private async _insantiate() {
        this.playerData = await this.api.getPlayerData(this.playerName);
    }

    private constructor(MRAPIInstance: MarvelRivalsApi, playerName: string){
        this.api = MRAPIInstance;
        this.playerName = playerName;
    }

    getTopThreeCompHeros(): string[]{
        return this.playerData.heroes_ranked.sort(
            (hero1: { matches: number; },hero2: { matches: number; }) =>{
                return hero1.matches-hero2.matches;
            }
        ).slice(-3).map((hero: { hero_name: string; })=>hero.hero_name);
    }
}