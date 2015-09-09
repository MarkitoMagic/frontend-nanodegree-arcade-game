/*
 * GameOver
 *
 * State to be invoked when the game is over for the player by whichever conditions that
 * are specified in the main game loop. This state will display the player information
 * such as score and an option to start over.
 */
 var GameOver = function () {};
 GameOver.prototype = Object.create(State.prototype);
 GameOver.prototype.constructor = GameOver;
