/*
 * MainMenu
 *
 * The main screen that will great the user and handleInput.
 */
var MainMenu = function (stateIndex) {
    console.log('Main Menu State');
    this.background = 'images/title-background.png';
    this.titleLogo = 'images/Bug-Crossing.png';
    this.enterText = 'images/Press-Enter.png';
    this.alphaValue = 1;
    this.alphaDirection = 1;
    this.index = stateIndex;
};

/* Assign the constructor and prototype for this psuedo-class */
MainMenu.prototype = Object.create(State.prototype);
MainMenu.prototype.constructor = MainMenu;

/*
 * Render the main menu (and title screen)
 */
MainMenu.prototype.render = function(ctx) {
    if (ctx) {
        ctx.drawImage(Resources.get(this.background), -20, 0);
        ctx.drawImage(Resources.get(this.titleLogo), 15, 159, 475, 61);
        ctx.save();
        ctx.globalAlpha = this.alphaValue;
        ctx.drawImage(Resources.get(this.enterText), 155, 259);
        ctx.restore();
    } else {
        throw new Expection('2D ctx not available or undefined.');
    }
};

/*
 * Make updates to this game state based on the time delta
 * received in the state
 */
MainMenu.prototype.update = function (dt) {
    if (this.alphaValue <= 0) {
        this.alphaDirection = 1;
    } else if (this.alphaValue >= 1){
        this.alphaDirection = -1;
    }

    // Prevent too far negative values for the alpha channel actually going opaque
    var futureAlpha = this.alphaValue + (this.alphaDirection * dt);

    if (futureAlpha < 0) {
        this.alphaValue = 0;
    } else {
        this.alphaValue+=(this.alphaDirection * dt);
    }
};

MainMenu.prototype.handleInput = function (key) {
    console.log('I got the key broooo: ' + key);
    if (key === 13) {
        game.stateIndex = gameState.LIVE_GAME;
    }
};
