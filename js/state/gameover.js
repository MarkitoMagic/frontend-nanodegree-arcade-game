/* globals State, gameConstants, game, Resources, gameState */

/* GameOver
 *
 * State to be invoked when the game is over for the player by whichever conditions that
 * are specified in the main game loop. This state will display the player information
 * such as score and an option to start over.
 */
var GameOver = function() {
    this.backgroundTiles = [
        ['w', 'w', 'w', 'w', 'w'],
        ['s', 's', 's', 's', 's'],
        ['s', 's', 's', 's', 's'],
        ['s', 's', 's', 's', 's'],
        ['g', 'g', 'g', 'g', 'g'],
        ['g', 'g', 'g', 'g', 'g']
    ];
};

/* Assign the constructor and prototype for this psuedo-class */
GameOver.prototype = Object.create(State.prototype);
GameOver.prototype.constructor = GameOver;

GameOver.prototype.update = function() {
    // no op
};
GameOver.prototype.render = function(ctx) {
    if(ctx) {
        ctx.clearRect(0, 0, gameConstants.canvasWidth, gameConstants.canvasHeight);
        game.renderGrid(this.backgroundTiles, ctx);

        // title image
        if(game.winner) {
            ctx.drawImage(Resources.get('you-win'), 20, 150);
        } else {
            ctx.drawImage(Resources.get('game-over'), 25, 150);
        }
        ctx.drawImage(Resources.get('try-again'), 95, 350);
    }
};
GameOver.prototype.handleInput = function(key) {
    var allowedKeys = {
        78: 'no',
        89: 'yes'
    };
    var selection = allowedKeys[key];

    if(selection === 'no') {
        game.stateIndex = gameState.MAIN_MENU;
    } else if(selection === 'yes'){
        game.stateIndex = gameState.LIVE_GAME;
    }
};
