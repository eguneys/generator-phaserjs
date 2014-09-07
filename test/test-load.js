/* global describe, beforeEach, it */
'use strict';
var assert = require('assert');

describe('phaserjs generator', function() {
    it('can be imported', function() {
        var app = require('../generators/app');
        assert(app !== undefined);
    });
});
