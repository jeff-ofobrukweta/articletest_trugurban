// config/email.js
// var nodemailer = require('nodemailer');

module.exports.email = {
  service: "Mailgun",
  auth: {
    user: "postmaster@trial.fabricsbyijay.com", 
    pass: "8288d82b32219704fd7215d3efc9a027"
  },
  templateDir: "views/emailTemplates",
  from: "oghenerukevwejeff@gmail.com",
  testMode: false,
  ssl: true
};