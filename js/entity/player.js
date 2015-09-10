/**
 * Player class that represents the main character
 * of the game.
 */
var Player = function () {
    // Default player Representation
    this.sprite = 'images/char-boy.png';
    // Default player coordinates
    // (x => middle tile, y => base of the tile)
    this.x = gameConstants.player.startX;
    this.y = gameConstants.player.startY;
    this.lives = 3;
    this.boundingBox = {
        w: 70,
        h: 80,
        xOff: 12,
        yOff: 62.5
    };
    this.score = 0;
};

/*
 * Make the player a subclass of the Entity object
 * and set the prototype for the object accordingly
 */
Player.prototype = Object.create(Entity.prototype);
Player.prototype.constructor = Player;

/**
 * Define the player prototype (although, in THIS version it's a one player game)
 */
Player.prototype.update = function( dt) {
    //noop()
};


/**
 * handles user's input for the game
 * to allow the player to control the
 * character
 */
 Player.prototype.handleInput = function (key) {
     // Get a reference to the sprite for the character image
     var heroSprite = Resources.get(this.sprite);
     var heroWidth = heroSprite.height;
     var heroHeigt = heroSprite.width;

     // Calculate the distance for each character move
     var xMoveDistance = gameConstants.tileWidth;
     var yMoveDistance = gameConstants.tileHeight;

     var heroFutureX = this.x;
     var heroFutureY = this.y;

     // Process the user key input
     if (key === gameConstants.keys.LEFT) {
         heroFutureX = this.x - xMoveDistance;
     } else if (key === gameConstants.keys.RIGHT) {
         heroFutureX = this.x + xMoveDistance;
     } else if (key === gameConstants.keys.UP) {
         heroFutureY = this.y - yMoveDistance;
     } else if (key === gameConstants.keys.DOWN) {
         heroFutureY = this.y + yMoveDistance;
     }

     // Protect from going out of bounds on the left and right edges
     var isSafeX = heroFutureX >= 0 && heroFutureX <= (gameConstants.gridWidth - 1) * gameConstants.tileWidth;

     // Protect from going out of bounds on the top and bottom edges
     var isSafeY = heroFutureY > -1 * (gameConstants.tileHeight- gameConstants.yOffSet) &&
                   heroFutureY < gameConstants.gridHeight * (gameConstants.tileHeight - gameConstants.yOffSet);
     if (isSafeX && isSafeY) {
         this.x = heroFutureX;
         this.y = heroFutureY;
     }

     logCoords(this);
 };
