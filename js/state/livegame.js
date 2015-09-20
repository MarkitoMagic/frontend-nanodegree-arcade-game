/* globals Enemy, Player, Key, Gem, Resources, State, StateManager, gameConstants, gameState, game */

/* LiveGame
 *
 * The game state that will house the primary objectives of the game and handle
 * the user and handleInput.
 */
var LiveGame = function() {
    liveGameUtils.init.call(this);
};

// Utils object to no polute the namespace with another function named init
var liveGameUtils = {
    init: function() {
        this.gameClock = 60;
        this.gameOver = false;
        this.allGems = [];
        this.paused = false;

        /*
         * All of the enemies for the game will be stored in this array
         */
        this.allEnemies = [];

        /*
         * The main player object
         */
        this.player = new Player();
        this.player.score = 0;
        this.player.x = gameConstants.player.startX;
        this.player.y = gameConstants.player.startY;

        // Create gem objects
        createGem(1, this.allGems);
        createGem(2, this.allGems);
        createGem(3, this.allGems);

        this.numGems = this.allGems.length;
        this.key = new Key();

        //This helper function aides in preventing gems from generating in the same place
        function createGem(type, gemArray) {
            var tmp = new Gem(type);
            var conflict;
            var i;

            do {
                conflict = false;

                // Check to see if any other gems have the same coords
                for (i = 0; i < gemArray.length; i++) {
                    if(tmp.x === gemArray[i].x && tmp.y === gemArray[i].y) {
                        conflict = true;
                        break;
                    }
                }
                if(conflict) {
                    tmp = new Gem(type);
                } else {
                    gemArray.push(tmp);
                    break;
                }
            } while (conflict);
        }
    }
};

/* Assign the constructor and prototype for this psuedo-class */
LiveGame.prototype = Object.create(State.prototype);
LiveGame.prototype.constructor = LiveGame;

/* For this state, the update method handles the updating of the
 * componenets for an actual gameplay level. These updates include
 * updating the game clock, enemy management and collision detection.
 */
LiveGame.prototype.update = function(dt) {
    var that = this;

    if(!that.gameOver && !that.paused) {
        sendWaveOfEnemies();
        updateEntities(dt);
        checkCollisions();
        pruneEnemies();
    }

    // If the game is paused, we want to handle timelapse differently
    if(!that.paused && !that.gameOver) {
        updateGameClock(dt);
    } else {
        updateGameClock(0);
    }

    if(that.gameOver) {
        // Stop all currently playing sounds
        Resources.stopAll();

        // If they won the game then set the winner status
        // for the game state
        if(that.gameClock > 0 && that.player.lives > 0) {
        Resources.play('success');
            game.winner = true;
        } else {
            Resources.play('failure');
            game.winner = false;
        }
        //transition the game over state
        this.reset();
        StateManager.setCurrentState(gameState.GAME_OVER);
    }

    /* This function updates the game clock for the
     * level
     */
    function updateGameClock(dt) {
        if(that.gameClock > 0) {
            that.gameClock = that.gameClock - dt;
        } else {
            that.gameOver = true;
        }
    }

    /* This function determines whether or not to send
     * more enemies to attack the user
     */
    function sendWaveOfEnemies() {
        var enemy;
        var boost = that.numGems - that.allGems.length;

        if(boost === 0) {
            boost = 1;
        }

        if(that.allEnemies.length < 3) {
            enemy = new Enemy();
            enemy.speed = enemy.speed * boost;
            that.allEnemies.push(enemy);
            Resources.play('bug-crawl');
        }
    }

    /* This is called by the update function  and loops through all of the
     * objects within your allEnemies array as defined in app.js and calls
     * their update() methods. It will then call the update function for your
     * player object.
     */
    function updateEntities(dt) {
        that.allEnemies.forEach(function(enemy) {
            enemy.update(dt);
        });
        that.player.update();
    }

    /* This function will remove any enemies that have
     * already moved across the screen. Since they are
     * out of view of the screen, we no longer need a
     * reference to them, thus freeing up some memory
     * when the garbage collector is called.
     */
    function pruneEnemies() {
        that.allEnemies.forEach(function(enemy, index) {
            if(enemy.x > gameConstants.canvasWidth) {
                that.allEnemies.splice(index, 1);
            }
        });
    }

    /* Iterates through the list of enemies and checks to see
     * if the player object collides with any of the enemies.
     * In this case, if the collision happens, we'll reset the
     * player to the starting position
     */
    function checkCollisions() {
        var playerBB = that.player.getBoundingBox();

        that.allEnemies.forEach(function(enemy) {
            if(isCollision(playerBB, enemy.getBoundingBox())) {
                that.player.x = gameConstants.player.startX;
                that.player.y = gameConstants.player.startY;
                that.player.lives--;
                Resources.play('enemy-hit');

                if(that.player.lives <= 0) {
                    that.gameOver = true;
                }
            }
        });

        that.allGems.forEach(function(gem, index) {
            if(isCollision(playerBB, gem.getBoundingBox())) {
                that.allGems.splice(index, 1);
                that.player.score+=1000;
                Resources.play('collect-coin');
            }
        });

        if(isCollision(playerBB, that.key.getBoundingBox())) {
            that.player.score+=10000;
            that.gameOver = true;
            that.key = null;
        }
    }

    /* Utility method to take two entities and check to see if
     * a collision occured.
     */
    function isCollision(entityOneBox, entityTwoBox) {
        var collision = false;

        if(entityOneBox.x < (entityTwoBox.x + entityTwoBox.w) &&
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
    var that = this;

    /* clear the canvas before drawing again
     */
    ctx.clearRect(0, 0, gameConstants.canvasWidth, gameConstants.canvasHeight);
    /* This array holds the relative URL to the image used
     * for that particular row of the game level.
     */
    var row, col;

    var levelGrid = [
        ['w', 'w', 'w', 'w', 'w'],
        ['s', 's', 's', 's', 's'],
        ['s', 's', 's', 's', 's'],
        ['s', 's', 's', 's', 's'],
        ['g', 'g', 'g', 'g', 'g'],
        ['g', 'g', 'g', 'g', 'g']
    ];

    // Loop through the levelGrid for the current level - we now have
    // dynamic levels.
    for (row = 0; row < levelGrid.length; row++) {
        for (col = 0; col < levelGrid[row].length; col++) {
            ctx.drawImage(Resources.get(gameConstants.level[levelGrid[row][col]]), col * 101, row * 83);
        }
    }

    var textY = 44;
    ctx.font = '50px impact';
    // Display the current game clock
    var displayTime = that.gameClock > 0 ? Math.abs(Math.floor(that.gameClock)) : 0;
    ctx.fillText(displayTime, 0, textY);

    // Display the current player score
    that.maxScore = 999999;
    var displayScore = that.player.score > that.maxScore ? that.maxScore : getDisplayScore(that.player.score);
    ctx.fillText(displayScore, 345, textY);

    // Display the player number of lives (with a heart!)
    ctx.drawImage(Resources.get('heart'), 210, -15, 40.4, 68.4);
    ctx.fillText(that.player.lives, 250, textY);

    // Render all of the entities objects for this screen
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
        // Render the enemies
        that.allEnemies.forEach(function(enemy) {
            enemy.render();
        });

        // Render the gems
        that.allGems.forEach(function(gem) {
            gem.render();
        });

        // Render the player
        that.player.render();

        // Only render the key if they have collected all the gems
        if(that.allGems.length === 0 && that.key) {
            that.key.render();
        }
    }
};

/* This function will take the key input and help
 * control the state
 */
LiveGame.prototype.handleInput = function(key) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        80: 'pause',
        81: 'quit',
        82: 'reset'
    };
    var selection = allowedKeys[key];

    if(selection === 'pause') { //pause
        this.paused = !this.paused;
    } else if(selection === 'quit') {
        this.reset();
        StateManager.resetState(gameState.MAIN_MENU);
        StateManager.setCurrentState(gameState.MAIN_MENU);
    }
    else if(selection === 'reset') {
        this.reset();
    } else {
        // If the game is over or paused, don't delegate input processing
        if(!this.gameOver && !this.paused) {
            this.player.handleInput(selection);
        }
    }
};

/* Resets this game state back to the starting values
 */
LiveGame.prototype.reset = function() {
    liveGameUtils.init.call(this);
};
