/*
 * AvatarSelect
 *
 * This state displays the avatar (character) select menu option.
 */
var AvatarSelect = function() {
    // the cast of selectable characters
    this.cast = [
        'images/char-cat-girl.png',
        'images/char-horn-girl.png',
        'images/char-pink-girl.png',
        'images/char-princess-girl.png',
        'images/char-boy.png'
    ];

    // image used for the selection process
    this.selector = 'images/Selector.png';
    // background image
    this.background = 'images/title-background.png';
    // title image
    this.title = 'images/player-select.png';
    this.subTitle = 'images/Press-Enter.png';
    this.choice = 0; // default selection
};

/* Assign the constructor and prototype for this psuedo-class */
AvatarSelect.prototype = Object.create(State.prototype);
AvatarSelect.prototype.constructor = AvatarSelect;

/* Renders the avatar (character) selection screen for the users
 */
AvatarSelect.prototype.render = function (ctx) {
    var row = 100;
    var col = 101;

    //Clear the canvas
    ctx.clearRect(0, 0, gameConstants.canvasWidth, gameConstants.canvasHeight);
    ctx.drawImage(Resources.get(this.background), 0, 0);
    ctx.drawImage(Resources.get(this.title), 55, 20);
    ctx.drawImage(Resources.get(this.subTitle), 155, 70);
    ctx.drawImage(Resources.get(this.selector), this.choice * col, row);

    for (var i = 0; i < this.cast.length; i++) {
        ctx.drawImage(Resources.get(this.cast[i]), i * col, row);
    }
};

AvatarSelect.prototype.update = function (dt) {
    // noop
}
AvatarSelect.prototype.handleInput = function (key) {
    var allowedKeys = {
        37: 'left',
        39: 'right',
        13: 'enter'
    };
    var selection = allowedKeys[key];

    if (selection === 'left' && this.choice > 0) {
        this.choice--;
    } else if (selection === 'right' && this.choice < this.cast.length - 1) {
        this.choice++;
    } else if (selection === 'enter') {
        game.spriteSelection = this.cast[this.choice];
        game.stateIndex = gameState.LIVE_GAME;
    }
}
