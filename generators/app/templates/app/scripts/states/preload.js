'use strict';

define(['phaser', 'app/config'], function(Phaser, Config) {
    function Preload() {}

    Preload.prototype = {
        preload: function() {

            this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.game.scale.setScreenSize(true);

            //var paths = Config.options.paths;
        },

        create: function() {
            
        },

        loadUpdate: function() {
            Config.options.onLoadUpdate.call(Config, this.load.progress);
        },

        shutdown: function() {
            Config.options.onLoadComplete.call(Config);
        }
    };

    return Preload;
});
