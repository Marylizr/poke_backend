const express = require('express')
const app = express()
const port = 3001
const mongo = require('./mongo');

const blogRouter = require('./controllers/blogController');
const userRouter = require('./controllers/userController');
const commentRouter = require('./controllers/commentController');


app.use(express.json());


app.listen(3001, () => {
  console.log(`app listening at http://localhost:${port}`)
})

app.use("/blogs", blogRouter);
app.use("/users", userRouter);
app.use("/comments", commentRouter);

