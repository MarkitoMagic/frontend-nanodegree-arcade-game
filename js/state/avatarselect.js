/* globals Resources, State, gameConstants, gameState, game */

/* AvatarSelect
 *
 * This state displays the avatar (character) select menu option.
 */
var AvatarSelect = function() {
    // the cast of selectable characters
    this.cast = [
        'char-cat-girl',
        'char-horn-girl',
        'char-pink-girl',
        'char-princess-girl',
        'char-boy'
    ];

    // image used for the selection process
    this.selector = 'selector';
    // title image
    this.title = 'player-select';
    this.subTitle = 'press-enter';
    this.choice = 0; // default selection
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
AvatarSelect.prototype = Object.create(State.prototype);
AvatarSelect.prototype.constructor = AvatarSelect;

/* Renders the avatar (character) selection screen for the users
 */
AvatarSelect.prototype.render = function(ctx) {
    var avRow = 300;
    var avCol = 101;

    if(ctx) {
        //Clear the canvas
        ctx.clearRect(0, 0, gameConstants.canvasWidth, gameConstants.canvasHeight);

        // Display the background for this state
        game.renderGrid(this.backgroundTiles, ctx);
        //ctx.drawImage(Resources.get(this.title), 55, 20);
        ctx.drawImage(Resources.get(this.title), 60, 159);
        ctx.drawImage(Resources.get(this.subTitle),  155, 259);
        ctx.drawImage(Resources.get(this.selector), this.choice * avCol, avRow);

        for (var i = 0; i < this.cast.length; i++) {
            ctx.drawImage(Resources.get(this.cast[i]), i * avCol, avRow);
        }
    }
};

AvatarSelect.prototype.update = function() {
    // noop
};
AvatarSelect.prototype.handleInput = function(key) {
    var allowedKeys = {
        37: 'left',
        39: 'right',
        13: 'enter'
    };

    var selection = allowedKeys[key];

    if(selection === 'left' && this.choice > 0) {
        this.choice--;
        Resources.play('click');
    } else if(selection === 'right' && this.choice < this.cast.length - 1) {
        this.choice++;
        Resources.play('click');
    } else if(selection === 'enter') {
        game.spriteSelection = this.cast[this.choice];
        game.stateIndex = gameState.LIVE_GAME;
        Resources.play('menu-select');
    }
};
