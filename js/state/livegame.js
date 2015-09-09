/* LiveGame
 *
 * The game state that will house the primary objectives of the game and handle
 * the user and handleInput.
 */

var LiveGame = function () {
    this.gameClock = 60;
    this.gameOver = false;
};
/* Assign the constructor and prototype for this psuedo-class */
LiveGame.prototype = Object.create(State.prototype);
LiveGame.prototype.constructor = LiveGame;

/* For this state, the update method handles the updating of the
 * componenets for an actual gameplay level. These updates include
 * updating the game clock, enemy management and collision detection.
 */
LiveGame.prototype.update = function(dt) {
    if (!this.gameOver) {
        updateGameClock(dt);
        sendWaveOfEnemies();
        updateEntities(dt);
        checkCollisions();
        pruneEnemies();
    }

    /* This function updates the game clock for the
     * level
     */
    function updateGameClock(dt) {
        var clock = game.currentState.gameClock;

        if (clock > 0) {
            clock = clock - dt;
        } else {
            // GAME OVER
            this.isGameOver = true;
        }
        game.currentState.gameClock = clock;
    }

    /* This function determines whether or not to send
     * more enemies to attack the user
     */
    function sendWaveOfEnemies() {
        if (allEnemies.length < 3) {
            allEnemies.push(new Enemy());
        }
    }

    /* This is called by the update function  and loops through all of the
     * objects within your allEnemies array as defined in app.js and calls
     * their update() methods. It will then call the update function for your
     * player object.
     */
    function updateEntities(dt) {
        allEnemies.forEach(function(enemy) {
            enemy.update(dt);
        });
        player.update();
    }
    /* This function will remove any enemies that have
     * already moved across the screen. Since they are
     * out of view of the screen, we no longer need a
     * reference to them, thus freeing up some memory
     * when the garbage collector is called.
     */
    function pruneEnemies() {
        allEnemies.forEach(function(enemy, index) {
            if (enemy.x > gameConstants.canvasWidth) {
                allEnemies.splice(index, 1);
            }
        });
    }
    /* Iterates through the list of enemies and checks to see
     * if the player object collides with any of the enemies.
     * In this case, if the collision happens, we'll reset the
     * player to the starting position
     */
    function checkCollisions() {
        allEnemies.forEach(function (enemy) {
            if (isCollision(player.getBoundingBox(), enemy.getBoundingBox())) {
                player.x = gameConstants.player.startX;
                player.y = gameConstants.player.startY;
            };
        });
    }

    /* Utility method to take two entities and check to see if
     * a collision occured.
     */
    function isCollision(entityOneBox, entityTwoBox) {
        var collision = false;

        if (entityOneBox.x < (entityTwoBox.x + entityTwoBox.w) &&
            entityTwoBox.x < (entityOneBox.x + entityOneBox.w) &&
            entityOneBox.y < (entityTwoBox.y + entityTwoBox.h) &&
            entityTwoBox.y < (entityOneBox.y + entityOneBox.h)) {
            collision = true;
        }
        return collision;
    }
};
/* State specific render logic which draws the backgrounds, characters,
 * score, game clock etc.
 */
LiveGame.prototype.render = function(ctx) {
    /*
     * clear the canvas before drawing again
     */
    ctx.clearRect(0, 0, gameConstants.canvasWidth, gameConstants.canvasHeight);
    /* This array holds the relative URL to the image used
     * for that particular row of the game level.
     */
    var rowImages = [
            'images/water-block.png',   // Top row is water
            'images/stone-block.png',   // Row 1 of 3 of stone
            'images/stone-block.png',   // Row 2 of 3 of stone
            'images/stone-block.png',   // Row 3 of 3 of stone
            'images/grass-block.png',   // Row 1 of 2 of grass
            'images/grass-block.png'    // Row 2 of 2 of grass
        ],
        numRows = 6,
        numCols = 5,
        row, col;

    /* Loop through the number of rows and columns we've defined above
     * and, using the rowImages array, draw the correct image for that
     * portion of the "grid"
     */
    for (row = 0; row < numRows; row++) {
        for (col = 0; col < numCols; col++) {
            /* The drawImage function of the canvas' context element
             * requires 3 parameters: the image to draw, the x coordinate
             * to start drawing and the y coordinate to start drawing.
             * We're using our Resources helpers to refer to our images
             * so that we get the benefits of caching these images, since
             * we're using them over and over.
             */
            ctx.drawImage(Resources.get(rowImages[row]), col * 101, row * 83);
        }
    }

    ctx.font = '50px impact';
    // Display the current game clock
    var clock = game.currentState.gameClock;
    var displayTime = clock > 0 ? Math.abs(Math.floor(clock)) : 0;
    ctx.fillText(displayTime, 0, 40);

    // Display the current player score
    ctx.fillText(getDisplayScore(player.score), 345, 40);
    renderEntities();

    /* Helper function to get the score in a format suitable for
     * display on the screen by the renderer. It converts the number
     * to a string and replaces and of the digits less than the place
     * holder with zeroes. This is a throw-back to old school gaming :)
     */
    function getDisplayScore(score) {
        var numDigits = 6;
        var tmpScore = score + '';
        var numZeroes = numDigits - tmpScore.length;
        for (var i = 0; i < numZeroes; i++) {
            tmpScore = '0' + tmpScore;
        }
        return tmpScore;
    }

    /* This function is called by the render function and is called on each game
     * tick. It's purpose is to then call the render functions you have defined
     * on your enemy and player entities within app.js
     */
    function renderEntities() {
        /* Loop through all of the objects within the allEnemies array and call
         * the render function you have defined.
         */
        allEnemies.forEach(function(enemy) {
            enemy.render();
        });

        player.render();
    }
};
