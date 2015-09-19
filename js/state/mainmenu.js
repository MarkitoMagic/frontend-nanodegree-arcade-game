/* globals State, Resources, gameState, game */

/* MainMenu
 *
 * The main screen that will great the user and handleInput.
 */
var MainMenu = function(stateIndex) {
    this.titleLogo = 'bug-crossing';
    this.enterText = 'press-enter';
    this.alphaValue = 1;
    this.alphaDirection = 1;
    this.index = stateIndex;
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
MainMenu.prototype = Object.create(State.prototype);
MainMenu.prototype.constructor = MainMenu;


/* Render the main menu (and title screen)
 */
MainMenu.prototype.render = function(ctx) {
    if(ctx) {
        // Display the background for this state
        game.renderGrid(this.backgroundTiles, ctx);
        ctx.drawImage(Resources.get(this.titleLogo), 15, 159, 475, 61);
        ctx.save();
        ctx.globalAlpha = this.alphaValue;
        ctx.drawImage(Resources.get(this.enterText), 155, 259);
        ctx.restore();
    } else {
        throw new Error('2D ctx not available or undefined.');
    }
};

/* Make updates to this game state based on the time delta
 * received in the state
 */
MainMenu.prototype.update = function(dt) {
    if(this.alphaValue <= 0) {
        this.alphaDirection = 1;
    } else if(this.alphaValue >= 1){
        this.alphaDirection = -1;
    }

    // Prevent too far negative values for the alpha channel actually going opaque
    var futureAlpha = this.alphaValue + (this.alphaDirection * dt);

    if(futureAlpha < 0) {
        this.alphaValue = 0;
    } else {
        this.alphaValue+=(this.alphaDirection * dt);
    }
};
/* Handles user input which in this case will navigate the user
 * to the next state of the application.
 */
MainMenu.prototype.handleInput = function(key) {
    if(key === 13) {
        Resources.play('main-menu-select');
        game.stateIndex = gameState.AVATAR_SELECT;
    }
};
