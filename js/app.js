// Define constants for the game
var gameConstants = {
    canvasWidth: 505,
    canvasHeight: 606,
    tileWidth: 101,
    tileHeight: 83,
    gridWidth: 5,
    gridHeight: 6,
    yOffSet: 12,
    player: {
        startX: 202,
        startY: 403
    },
    enemy: {
        width: 101
    },
    gem: {
        width: 101,
        yOffSet: 25,
        xOffSet: 15
    },
    debug: false,
    keys: {
        LEFT: 'left',
        UP: 'up',
        RIGHT: 'right',
        DOWN: 'down'
    }
};
// Define the game statess
var gameState = {
    MAIN_MENU: 1,
    LIVE_GAME: 2,
    GAME_OVER: 3,
    AVATAR_SELECT: 4
};

// Define game values
var game = {
    stateIndex: 1,
    currentState: undefined,
    winner: false
};

/*
 * Debugging method that allows for console display of
 * coordinates of a game entity
 */
function logCoords(entity) {
    if (gameConstants.debug) {
        console.log('(' + entity.x + ',' + entity.y + ')');
    }
}
