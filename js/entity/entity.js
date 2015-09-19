/* globals ctx, gameConstants, Resources */

/**
 * Enenmy / Player / Game Object base class
 */
var Entity = function() {
    this.x = 0;
    this.y = 0;
    this.sprite = '';
};

/**
 * Render method is the default method
 * for drawing the game object on the screen
 */
Entity.prototype.render = function() {
    // if the entity psuedo-class specifies h/w, use those params
    if(this.w && this.h) {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y, this.w, this.h);
    } else {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    if(gameConstants.debug && this.boundingBox) {

        ctx.beginPath();
        ctx.rect(this.x + this.boundingBox.xOff,
                 this.y + this.boundingBox.yOff,
                 this.boundingBox.w, this.boundingBox.h);

        ctx.strokeStyle = '#ff0000';
        ctx.stroke();
        ctx.closePath();
    }
};

/**
 * Convenience method to access the bounding box for an entity
 */
Entity.prototype.getBoundingBox = function() {
    // Default bounding box dimensions
    var box = {
        x: 0,
        y: 0,
        h: 0,
        w: 0
    };
    if(this.boundingBox) {
        box.x = this.x + this.boundingBox.xOff;
        box.y = this.y + this.boundingBox.yOff;
        box.w = this.boundingBox.w;
        box.h = this.boundingBox.h;
    }
    return box;
};
