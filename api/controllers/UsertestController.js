/**
 * UsertestController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
'use strict';
var bcryptjs = require('bcryptjs');
var greeting = require('./inheritance/classes'); 
var passport = require('passport');
var http = require('../../config/passport');
module.exports = {
testcreate(req, res) {
        const body = req.body;
        // this is the end of the declearation of variables
        User.create(body).then((user) => {
            res.json(200, {user: user});
            Mailer.sendWelcomeMail(user);
        }).catch((err) => {
         const resp = Object.keys((err.invalidAttributes)).join(',');
         res.json({"message":"the field"+" "+resp+" "+"is unclear or the field exist already!!","message2":"error"}); 
        });
      },
      testall(req, res) { 
        // view all users and their transactions for all individual users
          User.find().populate('languageTransactions').then((users) => {
         sails.log(users)
          // console.log(sails.hooks.http.app);    
          return res.json(users);
        })
      },



    testlogin: function (req, res) {
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
            // console.log("this is the req.session part"+JSON.stringify(req.session.passport,null,2));

        })(req, res);
    },


    testlogout: function (req, res) {
        delete req.logout();
        delete req.session;
        res.json({sucess:true});
    },
    
};

