const User = require('../models/user');

exports.register = (req, res) => {
  const { email, password } = req.body;

  const user = new User({
    email: email,
    password: password
  });

  user.save((err, doc) => {
    if(err) res.status(400).send(err);
    res.status(200).send(doc)
  })
};

exports.login = (req, res) => {
  const {email, password} = req.body;

  User.findOne({email: email}, (err, user) => {
    if(!user) res.send(400, {message: 'Auth failed, this email not found'});

    user.comparePassword(password, (err, isMatch) => {
      if(err) throw(err);

      if(!isMatch) res.send(400, {message: 'Invalid password'});

      user.generateToken((err, user) => {
        if(err) return res.send(400, err);

        res.cookie('auth', user.token).send('OK')
      })
    })
  })
};
