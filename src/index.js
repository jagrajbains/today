const express = require('express');

//requiring mongoose file to initiate the db connection
require('./db/mongoose');

//import the models
const User = require('./models/user');
const Task = require('./models/task');

const app = express()
//specifying the port to connect to the one provided by heroku or use 3000 as default
const PORT = process.env.PORT || 3000;

//json() method used to parse the body which is in json format and convert it to an object
app.use(express.json())

// /users route to create a new User
app.post('/users', (req, res) => {
  const user = new User(req.body);
  user.save()
  .then((result) => {
    res.status(201).send(result);
    console.log(result);
  })
  .catch((error) => {
    res.status(400).send(error);
  })
})

// /tasks route to create a new Task
app.post('/tasks', (req, res) => {
  const task = new Task(req.body);
  task.save()
  .then((task) => {
    res.status(201).send({
      task, 
      success: true,
      message: "Task was created successfully!"
    });
    console.log('Task created!', task);
  })
  .catch((error) => {
    res.status(400).send(error);
    console.log('Task was not created!', error);
  })
});

// /users to get all the users in the db
app.get('/users', (req, res) => {
  User.find()
  .then((users) => {
    res.status(200).send({
      users,
      success: true
    })
    console.log('Sent all Users!')
  })
  .catch((error) => {
    res.status(400)
    .send({
      error,
      message: 'Cannot fetch users!'
    })
  })
})

// /users/:id to get a single user using it's id
app.get('/users/:id', (req, res) => {
  const _id = req.params.id;
  User.findById(_id)
  .then((user) => {
    if(!user) {
      res.status(400).send('User was not found!')
      return console.log("User not found!")
    }
    res.status(200).send({
      user
    })
    console.log('User was found!', user)
  })
  .catch(error => {
    res.status(500).send(error)
  })
})

// /tasks to get all the tasks in the db
app.get('/tasks', (req, res) => {
  Task.find()
  .then((tasks) => {
    res.status(200).send({
      tasks,
      success: true
    })
    console.log('Sent all Tasks!')
  })
  .catch((error) => {
    res.status(400)
    .send({
      error,
      message: 'Cannot fetch Tasks!'
    })
  })
})

// /tasks/:id to get a single task using it's id
app.get('/tasks/:id', (req, res) => {
  const _id = req.params.id;
  Task.findById(_id)
  .then((task) => {
    if(!task) {
      res.status(400).send('Task was not found!')
      return console.log("Task not found!")
    }
    res.status(200).send({
      task
    })
    console.log('Task was found!', task)
  })
  .catch(error => {
    res.status(500).send(error)
  })
})


app.listen(PORT, () => {
  console.log(`Server is up on port: ${PORT}`);
})