'use strict';
var util = require('util');
var path = require('path');

var genUtils = require('../../util.js');

var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');


var PhaserGenerator = yeoman.generators.Base.extend({
    init: function () {
        //this.argument('name', { type: String, required: false });
        //this.appname = this.name || this.appname;
        
        this.pkg = require('../../package.json');
    },

    info: function() {
        this.log(this.yeoman);
        this.log(chalk.yellow(
            'Out of the box I create a Phaser app with RequireJS,\n' +
                'and gulp to build your app.\n'
        ));
    },

    appPrompts: function() {
        if (this.skipConfig) return;
        var done = this.async();
        
        var prompts = [
        ];

        this.prompt(prompts, function(props) {
            
            done();
        }.bind(this));
    },

    generateBasic: function() {
        
        this.template('gitignore', '.gitignore');
        this.copy('jshintrc', '.jshintrc');
        this.copy('bowerrc', '.bowerrc');
        this.template('_package.json', 'package.json');
        this.copy('_bower.json', 'bower.json');
        this.template('_gulpfile.js', 'gulpfile.js');
    },

    generateClient: function() {
        this.sourceRoot(path.join(__dirname, 'templates'));
        
        genUtils.processDirectory(this, 'app', 'app');
        genUtils.processDirectory(this, 'build', 'build');
    },
    
    end: function() {
        this.installDependencies({
            skipInstall: this.options['skip-install']
        });
    }
});

module.exports = PhaserGenerator;
