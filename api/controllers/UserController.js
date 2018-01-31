/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var bcryptjs = require('bcryptjs');
module.exports = {
  create(req, res) {
    const body = req.body;
    User.create(body).then((user) => {
        Mailer.sendWelcomeMail(user);
        res.json(200, {user: user});
    }).catch((err) => {
      res.json(("message :"+err.invalidAttributes.password[0].rule+" "+"details :"+" "+"please check the input form for valid credencials"));
      
    });
  },
  All(req, res) {
    const body = req.body;
    User.find(body).then((users) => {
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
    var firstname = req.body.firstname;
    var email = req.body.email;
    User.findOne({
      or: [
        { firstname: firstname },
        { email: email }
      ]
    }).exec(function (err, user) {
      console.log(user);
      res.json(user)
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
    const username = req.body.usUserControllerername;
    User.destroy(id).then(function (err) {
      if (err) {
        return res.negotiate(err);
      }
      sails.log(`The user(s) named ${username} have now been deleted, if there were any.`);
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
    const password = req.body.password;
    //find if the user exists in the database
    User.findOne({
      email: email
    }).exec(function (err, user) {
      if (err) {
        return res.serverError(err);
      }
      if (!user) {
        return res.notFound('Could not find user, sorry.');
      }

      sails.log('Found "%s"', user);
      // return res.json(user);

      //send the user a mail containing a url for update-password
      //var validation_token = req.body.validation_token;
      //var user_validation_token =user.validation_token;
       const id = user.id;
      'use strict';
      const nodemailer = require('nodemailer');
      const dont_messupMyguy = bcryptjs.hashSync(String(new Date().getTime()));
      const emailhash = bcryptjs.hashSync(email+"ofobrukweta_oghenerukevwe_jefferson");
      console.log(emailhash)
      // the next step is to get the link from the above required js  
      // Generate test SMTP service account from ethereal.email
      // Only needed if you don't have a real mail account for testing
      nodemailer.createTestAccount((err, account) => {
        var collect = sails.getBaseUrl() + "/reset?" + "validation_id=" + id + "&validate-email=" + emailhash + "&validation_token=" + dont_messupMyguy;
        // console.log('this is the email of the user'+email)
        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: 'oghenerukevwejeff@gmail.com',
            pass: 'october3119931'
          }
        });

        // setup email data with unicode symbols
        let mailOptions = {
          from: '"Olango new 👻" <olango@olango.com>', // sender address
          to: email, // list of receivers
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
            return console.log(error);
          }
          res.json({Messagesent:info.messageId});
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
      res.badRequest(err);
      console.log(`sorry the user cannot be updated due to the errors encountered`)
    });


    // User.findOne({
    //   id: cookiesID
    // }).exec(function (err, user) {
    //   if (err) {
    //     return res.serverError(err);
    //   }
    //   if (!user) {
    //     return res.notFound('Could not find user, sorry.');
    //   }

    //   if (password==='') {
    //     res.view('changepassword')
    //   }
    //   else{
    //     bcryptjs.genSalt(10, function (err, salt) {
    //       bcryptjs.hash(password, salt, function (err, hash) {
    //         if (err) {
    //           console.log(err);
    //           cb(err);
    //         } else {
    //           req.body.password = hash;
    //           console.log("this the new hashed password"+hash)
    //           console.log("this is the password inside the user schema"+req.body.password)
    //         }
    //       });
    //     });
    //     console.log("this is the missing shit:::"+password)
    //   }
    //  // console.log("hey this is user"+JSON.stringify(User,null,2))
    //   console.log(password)
    //   // sails.log('Found "%s"', user);
    //   return console.log('--------------------' + JSON.stringify(user.password,null,2))
      
    //   // User.update({ id: cookiesID },
    //   //   {
    //   //     password: hash
    //   //   }
    //   // ).then((updated) => {
    //   //   console.log(`This is the new password ::::::${password}`)
    //   //   console.log(`This is the new password ::::::${JSON.stringify(updated, null, 2)}`)
    //   //   console.log("this is the changed password inside the user schema"+req.body.password)
    //   //   // delete updated[0].validation_token;
    //   //   res.json(updated[0])
    //   //   console.log(':::::::' + updated[0])
    //   //   delete cookiesID
    //   // }).catch((err) => {
    //   //   res.badRequest(err);
    //   //   console.log(`sorry the user cannot be updated due to the errors encountered`)
    //   // });
    // });

  },
  view(req,res){
    var validation_tokenR = req.query.validation_id;
    //var validation_tokenbody = req.body.validation_token;
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
      res.cookie('rememberme', validation_tokenR , { expires: new Date(Date.now() + 900000), httpOnly: true });
      sails.log('Found "%s"', user);
      return res.view('changepassword')
    });
    
  }
};
