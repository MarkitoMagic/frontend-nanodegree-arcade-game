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
        MAIN_MENU: 'main-menu',
        LIVE_GAME: 'live-game',
        GAME_OVER: 'game-over',
        AVATAR_SELECT: 'avatar-select'
    };

    // Define game values
    window.game = {
        winner: false,
        renderGrid: function (grid, ctx) {
            var row, col;

            for (row = 0; row < grid.length; row++) {
                for (col = 0; col < grid[row].length; col++) {
                    ctx.drawImage(Resources.get(window.gameConstants.level[grid[row][col]]), col * 101, row * 83);
                }
            }
        }
    };
})();
