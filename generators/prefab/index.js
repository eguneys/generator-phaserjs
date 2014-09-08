'use strict';
var util = require('util');
var path = require('path');

var genUtils = require('../../util.js');

var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');


var PhaserJsStateGenerator = yeoman.generators.NamedBase.extend({
    init: function () {
        this.option('group', {
            desc: 'extend Phaser.Group',
            type: Boolean,
            defaults: false
        });
    },

    generate: function() {
        var slugName = this._.slugify(this.name),
            templateFile = 'prefab.js';
        
        if (this.options['group']) {
            templateFile = 'prefab_group.js';
        }
        this.template(templateFile, 'app/scripts/prefabs/' + slugName + '.js');
    }
    
});

module.exports = PhaserJsStateGenerator;
