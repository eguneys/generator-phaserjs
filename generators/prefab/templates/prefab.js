'use strict';

define(['phaser'], function(Phaser) {
    function <%= _.classify(name) %>(game, x, y) {
        Phaser.Sprite.call(this, game, x, y, 'atlasname', 0);
    }

    <%= _.classify(name) %>.prototype = Object.create(Phaser.Sprite.prototype);
    <%= _.classify(name) %>.prototype.constructor = <%= _.classify(name) %>;
});
