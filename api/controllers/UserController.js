/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  create(req, res) {
    const body = req.body;
    User.create(body).then((user) => {
      res.json(user);
    }).catch((err) => {
      res.badRequest(err.invalidAttributes);
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
    const username = req.body.username;
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

  }


};

