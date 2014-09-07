/*global describe, beforeEach, it */
'use strict';
var path = require('path');
var fs = require('fs-extra');

var shortStackReport = require('../test-util');

var helpers = require('yeoman-generator').test;
var assert = require('yeoman-generator').assert;
var chai = require('chai');
var expect = chai.expect;


describe('phaserjs:state generator', function () {
    
    var defaultOptions = {
    };

    var defaultArgs = ['TestState'];

    beforeEach(function() {
        this.timeout(10000);
        this.app_state = helpers
            .run(path.join(__dirname, '../generators/state'))
            .inDir(path.join(__dirname, '.tmp'));
    });

    describe('with --skip-inject option', function() {
        it('should generate expected files', function(done) {
            this.app_state.withPrompt(defaultOptions).
                withOptions({'skip-inject':true}).
                withArguments(defaultArgs)
                .on('end', function() {

                    assert.file(['app/scripts/states/teststate.js']);

                    assert.fileContent('app/scripts/states/teststate.js', / function Teststate\(\) \{\}/);

                    done();
                });
        });
    });
    
    describe('with default options', function() {
        describe('when app.js file is not present', function() {

            it('should generate expected files', function(done) {
                this.app_state
                    .withArguments(defaultArgs)
                    .withPrompt({appFile: true})
                    .on('end', function() {

                        assert.file(['app/scripts/states/teststate.js']);

                        assert.fileContent('app/scripts/states/teststate.js', / function Teststate\(\) \{\}/);

                        assert.fileContent('app/scripts/app.js', /\n {12}game\.state\.add\(\'teststate\'\, Teststate\)\;\n {8}\}/);
                        
                        done();
                    });
            });
        });
        
        describe('when app.js file present', function() {
            beforeEach(function() {
                this.app_state.inDir(path.join(__dirname, '.tmp'), function(dir) {
                    fs.copySync(path.join(__dirname, 'fixtures/app.js'), path.join(dir, 'app/scripts/app.js'));
                    
                });
            });
            
            it('should generate expected files', function(done) {
                this.app_state.withPrompt(defaultOptions)
                    .withArguments(defaultArgs)
                    .on('end', function() {

                        assert.fileContent('app/scripts/states/teststate.js', / function Teststate\(\) \{\}/);
                        
                        assert.fileContent('app/scripts/app.js', /\n {12}game\.state\.add\(\'teststate\'\, Teststate\)\;\n {8}\}/);
     
                        done();
                    });
            });
        });
    });
});
