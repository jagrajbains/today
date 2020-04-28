const MongoClient = require('mongodb').MongoClient

const uri = 'mongodb://127.0.0.1:27017';
const dbName = 'today';

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect((err, client) => {
  if(err) {
    return console.log('Unable to connect to the database')
  }
  console.log('Connected successfully')
  const db = client.db(dbName);
  // db.collection('users').insertOne({
  //   'name': 'Jagraj Bains',
  //   'age': 26
  // }, (error, result) => {
  //   if(error) {
  //     return console.log('Unable to insert document', error);
  //   }
  //   console.log(result.ops)
  // })

  // db.collection('users')
  // .insertMany([
  //   {'name': 'Ravinder Bains', 'age': 47},
  //   {'name': 'Garima Negi', 'age': 26}
  // ],(error, result) => {
  //   if(error) {
  //     console.log("Unable to insert documents", error)
  //   }
  //   console.log(result.ops)
  // })

  db.collection('tasks').insertMany([
    {'description': 'Create an Email list', 'completed': false},
    {'description': 'Meeting with team members', 'completed': false},
    {'description': 'Learn Node.js', 'completed': true}
  ], (error, result) => {
    if(error) return console.log('Unable to insert document', error)
    console.log(result.insertedIds)
  })
})

