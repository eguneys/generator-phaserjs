/*global describe, beforeEach, it */
'use strict';
var path = require('path');

var helpers = require('yeoman-generator').test;
var assert = require('yeoman-generator').assert;
var chai = require('chai');
var expect = chai.expect;


describe('phaserjs:state generator', function () {
    
    var defaultOptions = {
    };

    var defaultArguments = 'TestState';

    beforeEach(function() {
        this.timeout(10000);
        this.app_state = helpers
            .run(path.join(__dirname, '../generators/state'))
            .inDir(path.join(__dirname, '.tmp'));
    });

    describe('with default options', function() {
        it('should generate expected files', function(done) {
            this.app_state.withPrompt(defaultOptions)
                .on('end', function() {

                    assert.file([]);

                    assert.fileContent('app/scripts/states/teststate.js', / function TestState\(\) \{\}/);

                    assert.fileContent('app/scripts/app.js', /game.state.add\(\'teststate\', TestState\)\;\n/);

                    done();
                });
        });
    });

    describe('with --skip-inject option', function() {
        it('should generate expected files', function(done) {
            this.app_test.withPrompt(defaultOptions)
                .withOptions({'skip-inject':true})
                .withArguments(defaultArgs)
                .on('end', function() {

                    assert.noFileContent('app/scripts/app.js', /game.state.add\(\'teststate\', TestState\)\;\n/);
                    
                    done();
                });
        });
    });
});
