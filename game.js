var team = /** @class */ (function () {
    function team(players) {
        this.totalRuns = 0;
        this.players = players;
    }
    return team;
}());
var game = /** @class */ (function () {
    function game(teams) {
        this.teams = teams;
    }
    ;
    game.prototype.startGame = function () {
    };
    game.prototype.generateResult = function () {
    };
    return game;
}());
