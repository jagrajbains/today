const express = require('express');

//requiring mongoose file to initiate the db connection
require('./db/mongoose');

const app = express()
//specifying the port to connect to the one provided by heroku or use 3000 as default
const PORT = process.env.PORT || 3000;

//importing the User and Task router
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');

//json() method used to parse the body which is in json format and convert it to an object
app.use(express.json())

app.use(userRouter)
app.use(taskRouter)

app.listen(PORT, () => {
  console.log(`Server is up on port: ${PORT}`);
})