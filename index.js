const express = require('express')
const app = express()
const port = 3001
const blogController = require('./controllers/blogController');
const userController = require('./controllers/userController');

app.use(express.json());
const mongo = require('./mongo');


app.listen(3001, () => {
  console.log(`app listening at http://localhost:${port}`)
})

app.use('/blogs', blogController);
app.use('/users', userController);