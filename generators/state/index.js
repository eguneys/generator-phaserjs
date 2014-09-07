'use strict';
var util = require('util');
var path = require('path');

var genUtils = require('../../util.js');

var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');


var PhaserJsStateGenerator = yeoman.generators.NamedBase.extend({
    init: function () {
        this.option('skip-inject', {
            desc: 'Skip state inject to app.js',
            type: Boolean,
            defaults: false
        });
    },

    generate: function() {
        var slugName = this._.slugify(this.name);

        this.template('state.js', 'app/scripts/states/' + slugName + '.js');
    },
    
    injectState: function() {
        if (this.options['skip-inject']) { return; }

        var slugName = this._.slugify(this.name),
            className = this._.classify(this.name),
            appFile,
            inAppText = "game.state.add('" + slugName + "', " + className + ");";

        try {

            appFile = this.readFileAsString('app/scripts/app.js');
        } catch(e) {

            var done = this.async();
            
            this.prompt({
                type: 'confirm',
                name: 'appFile',
                message: "You don't have an app.js file, would you like to create one?",
                default: false
            }, function(answer) {
                this.includeAppFile = answer.appFile;
                done();
            }.bind(this));
            
            return;
        }
        
        appFile = appFile.replace(
                /start\: function\(\) {([\s\S]+?)\n {8}\}/,
            "$1\n            " + inAppText + "\n        \}");

        this.writeFileFromString(appFile, 'app/scripts/app.js');
    },

    generateRouterFile: function() {
        
        if (this.includeAppFile) {
            
            this.template('base_app.js',
                          'app/scripts/app.js');
            
        }
    }
    
});

module.exports = PhaserJsStateGenerator;
