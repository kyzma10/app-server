const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const md5 = require('md5');

const id = 1000;
const secret = 'supersecret';

const confirm = md5('test2@com.ua');
if(confirm === '97d3723787b96f4804a076d9d009dfdf'){
  console.log('YES')
} else console.log('NO');

/*
const user = new User();
console.log(user);
*/


// const token = jwt.sign(id, secret);
// console.log(token);

/*const backToken = 'eyJhbGciOiJIUzI1NiJ9.MTAwMA.L9PmEqLlZjettygguzj25agunJu6NkvVtG9RFRBnK2Y';
const decodeToken = jwt.decode(backToken, secret);
console.log(decodeToken);*/
/*
bcrypt.genSalt(10, (err, salt) => {
  if(err) next(err);

  bcrypt.hash('password', salt, (err, hash) => {
    if(err) next(err);

    console.log(hash);
  })
});*/
