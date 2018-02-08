/**
 * Created by @cpmproto
 */
 
"use strict";

var Sails = require('sails');
var config = require('../config/env/test');

global.sails = Sails;
var sails;
before(function (done) {
    // setTimeout(done, 2500);
    Sails.lift(config, function (err, server) {
        sails = server;
        if (err) return done(err);
        done(err, sails);
    });
});

after(function (done) {
    Sails.lower(done);
});
