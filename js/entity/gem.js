/*
 * Gem
 *
 * The Gem object represents the main objectives in the game
 * They are collision enabled and contact with the main player
 * will cause the gems to be removed from the screen.
 */
var Gem = function (type) {
    // Specify render dimensions
    this.w = 70.4;
    this.h = 98.4;

    // Choose a random start column
    var col = Math.floor((Math.random() * 4) + 1);
    this.x = (gameConstants.gem.width * col) + gameConstants.gem.xOffSet;

    // Choose a random start row
    var row = Math.floor((Math.random() * 3) + 1);
    this.y = (gameConstants.tileHeight * row)  + gameConstants.gem.yOffSet;

    // We choose a gem color based on the type
    switch(type) {
        case 1:
            this.sprite = 'images/Gem Blue.png';
            break;
        case 2:
            this.sprite = 'images/Gem Green.png';
            break;
        default:
            this.sprite = 'images/Gem Orange.png';
            break;
    }

    // Define the bounding box for the Gem
    this.boundingBox = {
        w: 65,
        h: 60,
        xOff: 4,
        yOff: 35
    };
};

/*
 * Make the Gem a subclass of the Entity object
 * and set the prototype for the object accordingly
 */
Gem.prototype = Object.create(Entity.prototype);
Gem.prototype.constructor = Gem;

/**
 * Update the Gem's position, required method for game
 * Parameter: dt, a time delta between ticks
 */
Gem.prototype.update = function (dt) {
    //noop()
};
