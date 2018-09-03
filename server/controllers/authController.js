const User = require('../models/user');
const md5 = require('md5');

exports.register = (req, res) => {
  const { email, password, confirm_password } = req.body;

  if(!req.body) return res.send(400, {message: 'Wrong, your data incorrect'});

  if(!email) {

    return res.status(400).send({message: 'Your email incorrect'});
  } else if(!password) {

    return res.status(400).send({message: 'Enter password incorrect'})
  } else {

    if(password !== confirm_password) return res.status(400).send({message: 'Smth wrong'});

    const confirm = md5(email);
    const user = new User({
      email: email,
      password: password,
      confirmCode: confirm
    });

    user.save((err, doc) => {
      if(err) res.status(400).send(err);
      res.status(200).send({confirm_code: doc.confirmCode})
    })
  }

};

exports.verifyEmail = (req, res) => {
  const { email, confirm_code } = req.body;

  User.findOne({email: email}, (err, user) => {

    if(err) return res.status(400).send({message: 'User with this e-mail not found'});

    if(user.confirmCode !== confirm_code) res.status(400).send({message: 'Invalid verify code'});

    user.update({_id: user._id}, {$set: {auth: true}})
      .then(doc => {
        if(doc) res.status(200).send({isVerify: user.isVerify});
        else res.status(400).send({message: 'Not verify'})
      })
      .catch(err => res.status(400).send(err))
  })
};

exports.login = (req, res) => {
  const {email, password} = req.body;

  User.findOne({email: email}, (err, user) => {
    if(!user) res.status(400).send({message: 'Auth failed, this email not found'});

    user.comparePassword(password, (err, isMatch) => {
      if(err) throw(err);

      if(!isMatch) res.status(400).send({message: 'Invalid password'});

      user.generateToken((err, user) => {
        if(err) return res.status(400).send(err);

        res.cookie('auth', user.token).send('OK')
      })
    })
  })
};
