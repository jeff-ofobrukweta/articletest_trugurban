/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

'use strict';
var bcryptjs = require('bcryptjs');
var greeting = require('./inheritance/classes'); 
module.exports = {
  create(req, res) {
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
  All(req, res) { 
    // view all users and their transactions for all individual users
      User.find().populate('languageTransactions').then((users) => {
     sails.log(users)
      // console.log(sails.hooks.http.app);    
      return res.json(users);
    })
  },
  singleUser(req, res) {
    const id = req.params.id;
    User.findOne(id).then((foundUser) => {
      if (!foundUser) {
        return res.notFound('Could not find user having same id credentials, sorry.')
      }
      return res.json(foundUser);
    }).catch((err) => {
      res.badRequest(err);
    });
  },
  findonethroughEmail(req, res) {
    greeting.sayHello();
    greeting.sayHellospanish();
    // let firstname = req.body.firstname;
    let email = req.body.email;
    // console.log(firstname);
    console.log(email);
    User.findOne({
      or: [
        { email: email }
      ]
    }).exec((err, user)=> {
      console.log(user);
      res.json(user);
      if (err) {   
        return res.json({ err });
      } else if (!user) {
        var err = new Error('User not found.');
        err.status = 401;
        return res.json({ err });
      }
    });
  },
  destroyUser(req, res) {
    const id = req.params.id;
    // const username = req.body.firstname;
    User.destroy(id).then(function (err) {
      if (err) {
        return res.negotiate(err);
      }
      sails.log(`The user(s) have now been deleted, if there were any.`);
      return res.ok();
    });
  },
  updateUser(req, res) {
    const id = req.params.id;
    // const firstname = req.body.firstname;
    // const secondname = req.body.secondname;
    // const phone_number = req.body.phone_number;
    // const email = req.body.email;
    const password = req.body.password;
    // const email_validated = req.body.email_validated;
    // const validation_token = req.body.validation_token;
    User.update({ id: id },
      {
        password: password
      }
    ).then((updated) => {
      res.json(updated[0])
    }).catch((err) => {
      res.badRequest(err);
      console.log(`sorry the user cannot be updated due to the errors encountered`)
    });

  },
  updateUserwithname(req, res) {
    const id = req.params.id;
    const firstname = req.body.firstname;
    const secondname = req.body.secondname;
    const phone_number = req.body.phone_number;
    const email = req.body.email;
    const password = req.body.password;
    // const email_validated = req.body.email_validated;
    // const validation_token = req.body.validation_token;
    User.update({ email: email },
      {
        password: password
      }
    ).then((updated) => {
      console.log(`This is the new password ::::::${password}`)
      res.json(updated[0])
    }).catch((err) => {
      res.badRequest(err);
      console.log(`sorry the user cannot be updated due to the errors encountered`)
    });
  },

  forgotpassword(req,res){
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
  updatenew(req,res){
    const cookiesID = req.cookies.rememberme;
    console.log('::::::::' + JSON.stringify(cookiesID,null, 2))
    console.log(JSON.stringify(req.session, null, 2))
    //var validation_tokenR = req.query.validation_token;
    var password = req.body.password;
    User.update({ id: cookiesID },
      {
        password: password
      }
    ).then((updated) => {
      res.json(updated[0])
    }).catch((err) => {
      const resp = Object.keys((err.invalidAttributes)).join(',');
     res.json({"message":"the field"+" "+resp+" "+"is unclear or the field is empty!!","message2":"error"});
      // res.badRequest(err);
      // console.log(`sorry the user cannot be updated due to the errors encountered`)
    });
  },
  view(req,res){
    var validation_tokenR = req.query.validation_id;
    console.log('::::::===>>>'+validation_tokenR);
    User.findOne({
      id: validation_tokenR
    }).exec(function (err, user) {
      if (err) {
        return res.serverError(err);
      }
      if (!user) {
        return res.notFound('Could not find user, sorry.');
      }
      //insatantiate a cookie to be stored inside the users browser in other to be of used 
      res.cookie('rememberme', validation_tokenR , { expires: new Date(Date.now() + 900000), httpOnly: true });
      sails.log('Found "%s"', user);
      //this renders a view for the user to change his/her passwords on the browser
      return res.view('changepassword')
    });
    
  }
};
