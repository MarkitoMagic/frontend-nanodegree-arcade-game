/* State
 *
 * State represents the display presented to the user. Provides a basic
 * api/prototype for states in interface style. If a particular prototype function
 * is not implemented by the sub-psuedo class it will cause an error to be thrown
 * therefore forcing the class to implement the function in question
 */

var State = function() {};

State.prototype.render = function() {
    throw new Error('Method [render] not implemented');
};

State.prototype.update = function() {
    throw new Error('Method [update] not implemented');
};

State.prototype.handleInput = function() {
    throw new Error('Method [handleInput] not implemented');
};

/* In this case, a state may or may not require a reset
 * function, so we'll provide a default no op reset method
 * on the State prototype.
 */
State.prototype.reset = function() {
    //no op
};
