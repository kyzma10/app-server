const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Purchase = require('./purchase');

const bcrypt = require('bcrypt');
const SALT_I = 10;
const jwt = require('jsonwebtoken');

const userSchema = Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },

  password: {
    type: String,
    required: true,
    trim: true
  },

  token: String,

  isVerify: {
    type: Boolean,
    default: false
  },

  buyList: [Purchase]

});

userSchema.pre('save', function(next){

  if(this.isModified('password')){
    bcrypt.genSalt(SALT_I, (err, salt) => {
      if(err) next(err);

      bcrypt.hash(this.password, salt, (err, hash) => {
        if(err) next(err);

        this.password = hash;
        next()
      })
    })
  } else next();

});

userSchema.methods.comparePassword = function(checkPassword, cb){
  bcrypt.compare(checkPassword, this.password, function(err, isMatch) {
    if(err) return cb(err);

    cb(null, isMatch)
  })
};

userSchema.methods.generateToken = function(cb){

  var token = jwt.sign(this._id.toHexString(), 'secret');
  this.token = token;
  this.save( function(err, user){
    if(err) return cb(err);

    cb(null, user)
  })
};


module.exports = mongoose.model('User', userSchema);