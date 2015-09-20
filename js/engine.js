/* globals StateManager, MainMenu, LiveGame, GameOver, AvatarSelect, Resources, gameState */

/* Engine.js
 * This file provides the game loop functionality (update entities and render),
 * draws the initial game board on the screen, and then calls the update and
 * render methods on your player and enemy objects (defined in your app.js).
 *
 * A game engine works by drawing the entire game screen over and over, kind of
 * like a flipbook you may have created as a kid. When your player moves across
 * the screen, it may look like just that image/character is moving or being
 * drawn but that is not the case. What's really happening is the entire "scene"
 * is being drawn over and over, presenting the illusion of animation.
 *
 * This engine is available globally via the Engine variable and it also makes
 * the canvas' context (ctx) object globally available to make writing app.js
 * a little simpler to work with.
 */
var Engine;

Engine = (function(global) {
    /* Predefine the variables we'll be using within this scope,
     * create the canvas element, grab the 2D context for that canvas
     * set the canvas elements height/width and add it to the DOM.
     */
    var doc = global.document,
        win = global.window,
        canvas = doc.createElement('canvas'),
        ctx = canvas.getContext('2d'),
        lastTime;

    // Define the states of the application;
    StateManager.registerState(gameState.MAIN_MENU, new MainMenu());
    StateManager.registerState(gameState.LIVE_GAME, new LiveGame());
    StateManager.registerState(gameState.GAME_OVER, new GameOver());
    StateManager.registerState(gameState.AVATAR_SELECT, new AvatarSelect());


    // Define the canvas dimensions and add it to the DOM
    canvas.width = 505;
    canvas.height = 606;
    doc.body.appendChild(canvas);

    // This listens for key presses and sends the keys to your
    // Player.handleInput() method. You don't need to modify this.
    doc.addEventListener('keyup', function(e) {
        StateManager.getCurrentState().handleInput(e.keyCode);
    });

    /* This function serves as the kickoff point for the game loop itself
     * and handles properly calling the update and render methods.
     */
    function main() {
        /* Get our time delta information which is required if your game
         * requires smooth animation. Because everyone's computer processes
         * instructions at different speeds we need a constant value that
         * would be the same for everyone (regardless of how fast their
         * computer is) - hurray time!
         */
        var now = Date.now(),
            dt = (now - lastTime) / 1000.0;

         /* Call our update/render functions, pass along the time delta to
          * our update function since it may be used for smooth animation.
          */
         var currentState = StateManager.getCurrentState();

         currentState.update(dt);
         currentState.render(ctx);

        /* Set our lastTime variable which is used to determine the time delta
         * for the next time this function is called.
         */
        lastTime = now;

        /* Use the browser's requestAnimationFrame function to call this
         * function again as soon as the browser is able to draw another frame.
         */
        win.requestAnimationFrame(main);
    }

    /* This function does some initial setup that should only occur once,
     * particularly setting the lastTime variable that is required for the
     * game loop.
     */
    function init() {
        reset();
        lastTime = Date.now();
        main();
    }

    /* This function does nothing but it could have been a good place to
     * handle game reset states - maybe a new game menu or a game over screen
     * those sorts of things. It's only called once by the init() method.
     */
    function reset() {
        //no op
    }

    Resources.onReady(init);

    Resources.load([
        {id: 'stone-block', src: 'images/stone-block.png'},
        {id: 'water-block', src: 'images/water-block.png'},
        {id: 'grass-block', src: 'images/grass-block.png'},
        {id: 'enemy-bug', src: 'images/enemy-bug.png'},
        {id: 'char-boy', src: 'images/char-boy.png'},
        {id: 'title-background', src: 'images/title-background.png'},
        {id: 'press-enter', src: 'images/Press-Enter.png'},
        {id: 'bug-crossing', src: 'images/Bug-Crossing.png'},
        {id: 'blue-gem', src: 'images/Gem Blue.png'},
        {id: 'green-gem', src: 'images/Gem Green.png'},
        {id: 'orange-gem', src: 'images/Gem Orange.png'},
        {id: 'heart', src: 'images/Heart.png'},
        {id: 'key', src: 'images/Key.png'},
        {id: 'char-cat-girl', src: 'images/char-cat-girl.png'},
        {id: 'char-horn-girl', src: 'images/char-horn-girl.png'},
        {id: 'char-pink-girl', src: 'images/char-pink-girl.png'},
        {id: 'char-princess-girl', src: 'images/char-princess-girl.png'},
        {id: 'selector', src: 'images/Selector.png'},
        {id: 'player-select', src: 'images/player-select.png'},
        {id: 'are-you-sure', src: 'images/are-you-sure.png'},
        {id: 'you-win', src: 'images/you-win.png'},
        {id: 'game-over', src: 'images/game-over.png'},
        {id: 'try-again', src: 'images/try-again.png'},
        {id: 'collect-coin', src: 'audio/135936__bradwesson__collectcoin.wav'},
        {id: 'click', src: 'audio/164642__adam-n__pen-click-2.wav'},
        {id: 'menu-select', src: 'audio/150222__killkhan__menu-select.mp3'},
        {id: 'enemy-hit', src: 'audio/220000__b-lamerichs__43.wav'},
        {id: 'main-menu-select', src: 'audio/140507__blackstalian__click-sfx4a.wav'},
        {id: 'success', src: 'audio/320652__rhodesmas__success-02.wav'},
        {id: 'failure', src: 'audio/177123__rdholder__2dogsound-player-death1-4s-2013jan31-cc-by-30-us.wav'},
        {id: 'game-intro', src: 'audio/244005__mickleness__arcade-game-loop-intro.mp3'},
        {id: 'bug-crawl', src: 'audio/266014__dasrealized__fast-crawling-bu.wav'}
    ]);

    /* Assign the canvas' context object to the global variable (the window
     * object when run in a browser) so that developer's can use it more easily
     * from within their app.js files.
     */
    global.ctx = ctx;
})(this);
