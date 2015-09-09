/*
 * Enemy
 *
 * The enemy object represents the main obstacles in the game
 * They are collision enabled and contact with the main player
 * will cause he game to reset to the starting position.
 */
var Enemy = function() {
    // Default coordinates for the enemy
    this.x = -gameConstants.enemy.width;

    // Choose a random start row
    var row = Math.floor((Math.random() * 3) + 1);
    this.y = (gameConstants.tileHeight * row)  - gameConstants.yOffSet;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    // Define the bounding box for the enemy
    this.boundingBox = {
        w: 95,
        h: 60,
        xOff: 4,
        yOff: 80
    };
    // Generate a random speed for the enemy
    this.speed = Math.floor((Math.random() * 500) + 100);
};

/*
 * Make the enemy a subclass of the Character object
 * and set the prototype for the object accordingly
 */
Enemy.prototype = Object.create(Entity.prototype);
Enemy.prototype.constructor = Enemy;

/**
 * Update the enemy's position, required method for game
 * Parameter: dt, a time delta between ticks
 */
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
};
