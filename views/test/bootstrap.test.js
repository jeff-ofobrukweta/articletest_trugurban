/**
 * Created by @cpmproto
 */
 
"use strict";

var Sails = require('sails');
var config = require('../config/env/test');
var sails;
describe("a simple test suite for delay timeout",()=>{
    before(function (done) {
        setTimeout(done, 2500);
        Sails.lift(config, function (err, server) {
            sails = server;
            if (err) return done(err);
            done(err, sails);
        });
    });

    after(function (done) {
        Sails.lower(done);
    });
});
