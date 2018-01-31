// config/email.js
var nodemailer = require('nodemailer');

module.exports.email = {
  service: "Mailgun",
  auth: {
    user: "postmaster@sandbox1dfeb5e2670d426dab73efb63e695acb.mailgun.org", 
    pass: "october3119931"
  },
  templateDir: "views/emailTemplates",
  from: "oghenerukevwejeff@gmail.com",
  testMode: false,
  ssl: true
}