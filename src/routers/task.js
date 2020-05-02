const express = require('express');
const router = express.Router();
const Task = require('../models/task');

// /tasks route to create a new Task
router.post('/tasks', (req, res) => {
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

// /tasks to get all the tasks in the db
router.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).send({tasks, success: true})
    console.log('Sent all Tasks!')
  } catch (error) {
      res.status(400)
      .send({
        error,
        message: 'Cannot fetch Tasks!'
      })
    console.log(error)
  }
})

// /tasks/:id to get a single task using it's id
router.get('/tasks/:id', async (req, res) => {
  try {
    const _id = req.params.id;
    const task = await User.findById(_id);
    if (!task) {
      res.status(400).send('Task was not found!');
      return console.log('Task was not found!');
    }
    res.status(200).send({ task, success: true })
  } catch (error) {
    res.status(500).send('Error while fetching task!', error);
    console.log(error)
  }
})

// /tasks/:id to update a single user using it's id
router.patch('/tasks/:id', async (req, res) => {
  const validUpdates = ['description', 'completed'];
  const updates = Object.keys(req.body);
  const isValid = updates.every((update) => validUpdates.includes(update));
  console.log(updates, isValid)
  if (!isValid || updates.length === 0) {
    return res.status(400).send('Invalid Updates!')
  }
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    if (!task) {
      res.status(400).send('No task was found and could not update!');
      return console.log('Could not find the task!')
    }
    res.status(202).send(task)
    console.log('Task was updated!')
  } catch (error) {
    res.status(500).send('Error while updating the task!', error);
    console.log('Error while updating the task!', error);
  }
})

// /tasks/:id to delete a single task using the id
router.delete('/tasks/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id, {useFindAndModify: false});
    if (!task) {
      return res.status(404).send()
    }
    res.status(200).send(task)
    console.log('Task was deleted: ', task)
  } catch (error) {
    res.status(400).send('Error while processing!')
    console.log(error)
  }
})

module.exports = router;