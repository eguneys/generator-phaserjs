/*global describe, beforeEach, it */
'use strict';
var path = require('path');
var fs = require('fs-extra');

var helpers = require('yeoman-generator').test;
var assert = require('yeoman-generator').assert;
var chai = require('chai');
var expect = chai.expect;


describe('phaserjs:prefab generator', function () {
    
    var defaultOptions = {
    };

    var defaultArgs = ['TestPrefab'];

    beforeEach(function() {
        this.timeout(10000);
        this.app_prefab = helpers
            .run(path.join(__dirname, '../generators/prefab'))
            .inDir(path.join(__dirname, '.tmp'));
    });

    describe('with default options', function() {
        it('should generate expected files', function(done) {
            this.app_prefab
                .withArguments(defaultArgs)
                .withPrompt({appFile: true})
                .on('end', function() {

                    assert.file(['app/scripts/prefabs/testprefab.js']);

                    assert.fileContent('app/scripts/prefabs/testprefab.js', / function Testprefab\(game, x, y\) \{\n[\s\S]+Phaser\.Sprite\.call\(this, game, x, y, \'atlasname\', 0/);

                    assert.fileContent('app/scripts/prefabs/testprefab.js', /Testprefab\.prototype = Object\.create\(Phaser\.Sprite\.prototype\)\;\n/);
                    assert.fileContent('app/scripts/prefabs/testprefab.js', /Testprefab\.prototype.constructor = Testprefab;\n/);

                    done();
                });
        });
    });

    describe('with --group option', function() {
        it('should generate expected files', function(done) {
            this.app_prefab.withPrompt(defaultOptions).
                withOptions({'group':true}).
                withArguments(defaultArgs)
                .on('end', function() {

                    assert.fileContent('app/scripts/prefabs/testprefab.js', / function Testprefab\(game, parent\) \{\n[\s\S]+Phaser\.Group\.call\(this, game, parent\)\;\n/);

                    assert.fileContent('app/scripts/prefabs/testprefab.js', /Testprefab\.prototype.constructor = Testprefab;\n/);

                    done();
                });
        });
    });
    

});
