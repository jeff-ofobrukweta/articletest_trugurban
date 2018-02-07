// api/services/Mailer.js

// api/services/Mailer.js
module.exports.sendWelcomeMail = function(obj) {
    sails.hooks.email.send(
        "welcomeEmail", 
        {
          firstname: obj.firstname
        },
        {
          to: obj.email,
          subject: "Welcome Email"
        },
        function(err) {console.log(err || "Mail Sent!");}
      )
  }