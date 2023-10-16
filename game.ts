class team{
    players: Array<Array<number>>;
    totalRuns: number = 0
    constructor(players){
        this.players = players;
    }
}

class game{
    teams: Array<team>;
    gameStarted: boolean;

    constructor(teams: Array<team>){
        this.teams = teams;
    };

    hit(){
        
    }

    startGame(){

    }

    generateResult(){

    }
}