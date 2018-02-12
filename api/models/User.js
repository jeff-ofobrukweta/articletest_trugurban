/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */
var os = require('os'); 
os.tmpDir = os.tmpdir;
var bcryptjs = require('bcryptjs');
//var _= require('lodash');
// var _super= require('sails-permissions/api/models/User');
//var usermail = require('usermail');
module.exports = {
  schema: true,
  attributes: {
    email: {
      type: 'string',
      required: true,
      unique: true
    },
    lastname: {
      type: 'string',
      required: true
    },
    firstname: {
      type: 'string',
      required: true,
      unique: true
    },
    sex: {
      type: 'string',
      required: true
    },
    language: {
      type: 'string',
      required: true
    },
    password: {
      type: 'string',
      required: true,
      minLength: 6,
      unique: true
    },
    email_validated: {
      type: 'boolean',
      required: false
    },
    validation_token: {
      type: 'string',
      required: false,
      unique: true
    },
    download_url: {
      type: 'string',
      required: false,
      unique: false
    },
    requiredpaystacktoken: {
      type: 'boolean',
      defaultTo: false
    },
    toJSON: function () {
      var obj = this.toObject();
      delete obj.password;
      return obj;
    }
  },
  //Update the user password if it was passed in
  afterValidate: function (values, next) {
    //update the passport-password if it was passed in
    if (values.password && this.user && this.user.id) {
      Passport.update({ user: values.id, protocol: 'local' }, { password: values.password })
        .exec(function (err, passport) {
          // delete values.password;
          console.log(`the password is being updated by password here`);
          next(err);
        });
    }
    else {
      next();
    }
  },
  beforeCreate: function (user, cb,res) {
    // if(user.password || user.email|| user.firstname|| user.lastname|| user.sex|| user.language ==='' ){
    //   res.json({message:'one field is void please fill'})
    // }
    bcryptjs.genSalt(10, function (err, salt) {
      bcryptjs.hash(user.password, salt, function (err, hash) {
        if (err) {
          console.log(err);
          cb(err);
        } else {
          user.password = hash;
          console.log(hash)
          cb();
        }
      });
    });
  },

  beforeUpdate: function (user, cb,res) {
    bcryptjs.genSalt(10, function (err, salt) {
      bcryptjs.hash(user.password, salt, function (err, hash) {
        if (err) {
          console.log(err);
          cb(err);
        } else {
          user.password = hash;
          console.log(hash)
          cb();
        }
      });
    });
  },
  afterCreate: function (user, next) {
    //Email the user the validation link after creation
    if (user.email != "admin@example.com") {
      // usermail(user,{
      user_validation_token = bcryptjs.hashSync(String(new Date().getTime()));
      // console.log(String(new Date().getTime()))
      var collect = sails.getBaseUrl() + "/user/" + user.id + "&validation_id" + "/validate-email?email=" + user.email + "&validation_token=" + user_validation_token;
      // subject:"Validate Email on "+sails.config.appName,
      // template:'validate_email'
      // });
    }
    next();
  }

};

