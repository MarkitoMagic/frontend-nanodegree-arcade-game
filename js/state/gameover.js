/*
 * GameOver
 *
 * State to be invoked when the game is over for the player by whichever conditions that
 * are specified in the main game loop. This state will display the player information
 * such as score and an option to start over.
 */
var GameOver = function () {
    this.background = 'images/title-background.png';
};

/* Assign the constructor and prototype for this psuedo-class */
GameOver.prototype = Object.create(State.prototype);
GameOver.prototype.constructor = GameOver;

GameOver.prototype.update = function (dt) {
    // no op
};
GameOver.prototype.render = function (ctx) {
    ctx.clearRect(0, 0, gameConstants.canvasWidth, gameConstants.canvasHeight);
    ctx.drawImage(Resources.get(this.background), 0, 0);

    // title image
    if (game.winner) {
        ctx.drawImage(Resources.get('images/you-win.png'), 20, 150);
    } else {
        ctx.drawImage(Resources.get('images/game-over.png'), 25, 150);
    }
    ctx.drawImage(Resources.get('images/try-again.png'), 95, 350);
};
GameOver.prototype.handleInput = function (key) {
    var allowedKeys = {
        78: 'no',
        89: 'yes'
    };
    var selection = allowedKeys[key];

    if (selection === 'no') {
        game.stateIndex = gameState.MAIN_MENU;
    } else if (selection === 'yes'){
        game.stateIndex = gameState.LIVE_GAME;
    }
};
