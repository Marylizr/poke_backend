const express = require('express');
const app = express();
const port = 3010;
const mongo = require('./mongo/index');
const cors = require('cors');
const blogRouter = require('./controllers/blogController');
const userRouter = require('./controllers/userController');
const commentRouter = require('./controllers/commentController');
const createRouter = require('./controllers/createController');
const favRouter = require('./controllers/favController');
const loginRouter = require('./controllers/loginController');

app.use(express.json());

app.use(cors({
  origin: '*',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}))

app.listen(3010, () => {
  console.log(`app listening at http://localhost:${port}`)
})

app.use("/blogs", blogRouter);
app.use("/users", userRouter);
app.use("/comments", commentRouter);
app.use("/createPokeWiki", createRouter);
app.use("/favs", favRouter);
app.use("/login", loginRouter);



