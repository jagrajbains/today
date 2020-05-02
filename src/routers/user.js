const express = require('express');
const router = express.Router();
const User = require('../models/user');

// /users route to create a new User
router.post('/users', (req, res) => {
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

// /users to get all the users in the db
router.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).send({users, success: true})
    console.log('Sent all Users!')
  } catch (error) {
    console.log(error)
  }
})

// /users/:id to get a single user using it's id
router.get('/users/:id', async (req, res) => {
  try {
    const _id = req.params.id;
    const user = await User.findById(_id);
    if (!user) {
      res.status(400).send('User was not found!');
      return console.log('User was not found!');
    }
    res.status(200).send({ user, success: true })
  } catch (error) {
    res.status(500).send('Error while fetching user!', error);
    console.log(error)
  }
})

// /users/:id to update a single user using it's id
router.patch('/users/:id', async (req, res) => {
  const validUpdates = ['name', 'age', 'email'];
  const updates = Object.keys(req.body);
  const isValid = updates.every((update) => validUpdates.includes(update));
  console.log(updates, isValid)
  if (!isValid || updates.length === 0) {
    return res.status(400).send('Invalid Updates!')
  }
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    if (!user) {
      res.status(400).send('No user was found and could not update!');
      return console.log('Could not find the user!')
    }
    res.status(202).send(user)
    console.log('User was updated!')
  } catch (error) {
    res.status(500).send('Error while updating the user!', error);
    console.log('Error while updating the user!', error);
  }
})

// /users/:id to delete a single user using the id
router.delete('/users/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id, {useFindAndModify: false});
    if (!user) {
      return res.status(404).send()
    }
    res.status(200).send(user)
    console.log('User was deleted: ', user)
  } catch (error) {
    res.status(400).send('Error while processing!')
    console.log(error)
  }
})

module.exports = router;