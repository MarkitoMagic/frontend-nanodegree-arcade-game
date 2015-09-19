/* globals Resources */

/* app.js
 *
 * Expose some constants and properties to the rest of the application.
 */
(function() {
    window.gameConstants = {
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
        },
        level: {
            w: 'water-block',
            s: 'stone-block',
            g: 'grass-block',
        }
    };

    // Define the game states
    window.gameState = {
        MAIN_MENU: 1,
        LIVE_GAME: 2,
        GAME_OVER: 3,
        AVATAR_SELECT: 4
    };

    // Define game values
    window.game = {
        stateIndex: 1,
        currentState: undefined,
        winner: false,
        renderGrid: function (grid, ctx) {
            var row, col;

            for (row = 0; row < grid.length; row++) {
                for (col = 0; col < grid[row].length; col++) {
                    ctx.drawImage(Resources.get(gameConstants.level[grid[row][col]]), col * 101, row * 83);
                }
            }
        }
    };
})();
