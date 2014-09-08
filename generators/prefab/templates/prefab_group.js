'use strict';

define(['phaser'], function(Phaser) {
    function <%= _.classify(name) %>(game, parent) {
        Phaser.Group.call(this, game, parent);
    }

    <%= _.classify(name) %>.prototype = Object.create(Phaser.Group.prototype);
    <%= _.classify(name) %>.prototype.constructor = <%= _.classify(name) %>;
});
