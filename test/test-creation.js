/*global describe, beforeEach, it, xit */
'use strict';
var path = require('path');
var fs = require('fs-extra');
var exec = require('child_process').exec;

var helpers = require('yeoman-generator').test;
var assert = require('yeoman-generator').assert;
var chai = require('chai');
var expect = chai.expect;


describe('phaserjs generator', function () {
    
    var defaultOptions = {
    };
    
    beforeEach(function(done) {
        this.timeout(4800000);
        this.app = helpers
            .run(path.join(__dirname, '../generators/app'))
            .inDir(path.join(__dirname, '.tmp'), function(dir) {
                
                fs.symlinkSync(path.join(__dirname, 'fixtures/node_modules'),
                               path.join(dir, 'node_modules'), 'dir');


                fs.mkdirpSync(path.join(dir, 'app/'));

                // bower_components
                fs.symlinkSync(path.join(__dirname, 'fixtures/bower_components'),
                               path.join(dir, 'app/bower_components'), 'dir');

                done();
            });
    });

    describe('running app', function() {

        describe('with default options', function() {

            it('should pass jshint', function(done) {
                this.timeout(24000);
                console.log('jshint start');
                this.app.withPrompt(defaultOptions)
                    .on('end', function() {
                        console.log('running jshint');
                        exec('gulp jshint', function(error, stdout, stderr) {
                            if (error) { console.log('Error: ' + error); }
                            expect(stdout).to.contain('Finished \'jshint\'');
                            expect(stdout).to.not.contain('problems');
                            done();
                            console.log('jshint done');
                        });
                    });
            });
        });
    });

});
