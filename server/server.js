const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const indexRouter = require('./routes/index');

const app = express();

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://admin:12345s@ds141942.mlab.com:41942/app_users_db');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('WE ARE CONNECTED!')
});

app.use(bodyParser.json());
app.use('/', indexRouter);

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`App running on port: ${port}`);
});