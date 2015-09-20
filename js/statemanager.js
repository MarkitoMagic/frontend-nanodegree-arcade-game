/* globals gameState */

/* StateManager
 *
 * The state manager object will is a globally exposed utility object that will
 * manage the state of the application and provide features to make transitioning
 * from state to state simple as well as state management as a whole simple for the
 * application
 */

(function() {
    // Private object properties
    var stateCache = {};
    var currentState = gameState.MAIN_MENU; // default state

    /* This object defines the publicly accessible functions available to
     * developers by creating a global StateManager object.
     *
     * Note: The object definition is moved to the top to make viewing the API
     * simpler at first glance. Due to hoisting rules, this does not affect the
     * application and interpretation time or runtime and is considered a best
     * practice when defining an object with an API. Example: https://github.com/johnpapa/angular-styleguide#style-y033
     */
    window.StateManager = {
        clearRegistration: clearRegistration,
        getCurrentState: getCurrentState,
        registerState: registerState,
        resetState: resetState,
        setCurrentState: setCurrentState
    };

    function setCurrentState(id) {
        //Does the state exist?
        if (stateCache[id]) {
            currentState = id;
        } else {
            throw new Error('Unable to set current state. Current state must be set to a registered state. ['+ id +']');
        }
    }
    /* Returns the current state of the application as set
     * by the user.
     */
    function getCurrentState() {
        var state = stateCache[currentState];

        if (state) {
            return stateCache[currentState];
        } else {
            throw new Error('No current state is set or state is not registered. ['+ currentState +']');
        }
    }

    /* Registers a state with the StateManager by the given
     * id. This will make the state available across the application
     * via the StateManager. Duplicates will be overwritten.
     */
    function registerState(id, stateObj) {
        stateCache[id] = stateObj;
    }

    /* Invokes the reset() method on a given state (represented by the id)
     * if the state does not exist, an error is thrown in an attempt
     * to help the developer identify issue with the registration cache
     */
    function resetState(id) {
        var state = stateCache[id];

        if (state) {
            state.reset();
        } else {
            throw new Error('State is not registered, cannot reset. ['+ currentState +']');
        }
    }

    /* Removes all of the registered states from the state cache
     */
    function clearRegistration() {
        stateCache = {};
    }
})();
