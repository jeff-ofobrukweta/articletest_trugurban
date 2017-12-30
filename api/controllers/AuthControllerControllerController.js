/**
 * AuthControllerControllerController
 *
 * @description :: Server-side logic for managing Authcontrollercontrollers
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var passport = require('passport');
var http = require('../../config/passport');

module.exports = {
    login: function (req, res) {
        passport.authenticate('local', function (err, user, info) {
            if ((err) || (!user)) {
                //this part displays all the users in the storage
                return res.send({
                    message: info.message,
                    user: user
                });
            }
            req.logIn(user, function (err) {
                if (err) res.send(err);
                return res.send({
                    message: info.message,
                    user: user
                });
            });

        })(req, res);
    },

    logout: function (req, res) {
        req.logout();
        res.send('you have been sucessfully signed out');
        console.log(req.session);
        console.log(`this is the logout  action`)
    },
    // Here is were we specify our facebook strategy.
    // https://developers.facebook.com/docs/
    // https://developers.facebook.com/docs/reference/login/

    facebookAuth: function (req, res, next) {
        passport.authenticate('facebook', { scope: ['email'] })(req, res, next);
    },

    facebookCallback: function (req, res, next) {
        passport.authenticate('facebook', function (err, user) {
            res.json(user);
        })(req, res, next);
    },

    authenticate: function (req, res) {
        passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/userinfo.profile'] })(req, res);
    },

    authcallback: function (req, res) {
        passport.authenticate('google', { failureRedirect: 'login', successRedirect: '/' })(req, res);
    },

    _config: {}
};



