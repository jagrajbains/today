const mongoose = require('mongoose');


const uri = 'mongodb://127.0.0.1:27017/today-api';

mongoose.connect(uri, (err) => {
  if(err) return console.log(err);
  console.log('Mongoose Connected!');
});