/*
 * State
 *
 * State represents the display presented to the user. Provides a basic
 * api/prototype for screens.
 */

var State = function() {};
State.prototype.render = function() {};
State.prototype.update = function(dt) {};
State.prototype.handleInput = function(key) {
    throw new Error('Method not implemented');
};
