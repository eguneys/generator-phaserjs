'use strict';

define(['phaser'], function(Phaser) {
    function <%= _.classify(name) %>() {}

    <%= _.classify(name) %>.prototype = {
        preload: function() {

        },

        create: function() {
            
        }
    };

    return <%= _.classify(name) %>;
});
