const jwt = require('jwt-simple');
const User = require('../models/user');
const config = require('../config');

function tokenForUser(user) {
  console.log(user.role);
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp, role: user.role }, config.secret);
}

exports.signin = async function(req, res, next) {
  const email = req.body.email;
  const password = req.body.password;

  const users = await User.findAll({
    where: {
      email: email,
      password: password
    }
  });

  if(users.length > 0){
    return res.send({ token: tokenForUser(users[0].toJSON()) });
  }else{
    return res.status(422).send({ error: 'User not registered'});
  }
}

exports.signup = async function(req, res, next) {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    return res.status(422).send({ error: 'You must provide email and password'});
  }

  const users = await User.findOne({
    where: {
      email: email
    }
  }).then((user) => {
    res.json({ token: tokenForUser(user.get()) });
  });
  
  
  // See if a user with the given email exists
}

exports.admin_activation = function(req, res, next) {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    return res.status(422).send({ error: 'You must provide email and password'});
  }

  // See if an user with the given email exists
  User.findOne({ email: email }, function(err, existingUser) {
    if (err) { return next(err); }

    // If an user with email does exist, return an error
    if (existingUser) {
      return res.status(422).send({ error: 'Email is in use' });
    }

    // If a user with email does NOT exist, create and save record for admin
    const user = new User({
      email: email,
      password: password,
      role: 'admin'
    });

    user.save(function(err) {
      if (err) { return next(err); }

      // Repond to request indicating the admin was created
      res.json({});
    });
  });
}
