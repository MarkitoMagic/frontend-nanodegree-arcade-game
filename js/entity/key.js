/* globals Entity */

/* Key
 *
 * The KEY entity game object is the end-goal for the players for a given level.
 */

 var Key = function() {
     this.x = 0;
     this.y = -10;
     this.sprite = 'images/Key.png';

     // Define the bounding box for the Key
     this.boundingBox = {
         w: 55,
         h: 80,
         xOff: 20,
         yOff: 60
     };
 };
 
 Key.prototype = Object.create(Entity.prototype);
 Key.prototype.constructor = Key;
