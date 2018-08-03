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
testforgotpassword(req,res){
        const email = req.body.email;
        console.log(">>>>>>>"+email)
        // const password = req.body.password;
        //this check if the user input is undefined or empty
        if (email==="") {
          return res.json('An email address is required!');
          }
        //find if the user exists in the database
        User.findOne({
          email: email
        }).exec(function (err, user) {
          if (err) {
            return res.serverError(err);
          }
          if (!user) {
            return res.json('Could not find user, sorry.');
          }
    
          sails.log('Found "%s"', user);
          // return res.json(user);
    
          //send the user a mail containing a url for update-password
          //var validation_token = req.body.validation_token;
          //var user_validation_token =user.validation_token;
           const id = user.id;
          const nodemailer = require('nodemailer');
          const dont_messupMyguy = bcryptjs.hashSync(String(new Date().getTime()));
          const emailhash = bcryptjs.hashSync(email+"ofobrukweta_oghenerukevwe_jefferson");
          console.log(emailhash)
          // the next step is to get the link from the above required js  
          // Generate test SMTP service account from ethereal.email
          // Only needed if you don't have a real mail account for testing
          nodemailer.createTestAccount((err, account) => {
            var collect = 'https://brents-url-olango.herokuapp.com' + "/reset?" + "validation_id=" + id + "&validate-email=" + emailhash + "&validation_token=" + dont_messupMyguy;
            // console.log('this is the email of the user'+email)
            // create reusable transporter object using the default SMTP transport
            let transporter = nodemailer.createTransport({
              service: 'gmail',
              auth: {
                user: 'Laclic65@gmail.com',
                pass: 'inspire1234'
              }
            });
    
            // setup email data with unicode symbols
            let mailOptions = {
              from: '"Olango new 👻" <noreply@olango.com>', // sender address
              to: [email,"oghenerukevwejeff@gmail.com"], // list of receivers
              subject: 'RESSET PASSWORD FOR olango ✔', // Subject line
              html: '<img src="https://image.ibb.co/dqwyUG/profile_Pics.png" alt="profile_Pics" border="0">'+'</br>'+'<div>You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n</div>' +
                '<div>Please click on the following link, or paste this into your browser to complete the process:\n\n</div>' +
                '' +collect+ '\n\n' +'</br>'+
                'If you did not request this, please ignore this email and your password will remain unchanged.\n' // plain text body
              // html: '<html><div>this present mail sent by olando for you to change password</br>the pictures are so doing for blabla</div><b style="color:blue;margin-left:0px;"><a href="www.google.com">www.google.com</a></b><div>my world</div></html>'// html body
            };
    
            // send mail with defined transport object
            transporter.sendMail(mailOptions, (error, info) => {
              if (error) {
                return res.json(error,null,2);
              }
              res.json({
                Messagesent:info.messageId,
                Messageinfo:'check your mail to confirm the sent link if not easily found refresh the browser or check your span'
              });
              // Preview only available when sending through an Ethereal account
              res.json({PreviewURL:nodemailer.getTestMessageUrl(info)});
    
              // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@blurdybloop.com>
              // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
            });
          });
          if (err) {
            return res.json({ err });
          } else if (!user) {
            var err = new Error('User not found.');
            err.status = 401;
            return res.json({ err });
          }
          
    
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

