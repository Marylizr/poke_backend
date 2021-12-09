const express = require('express');
const commentRouter = express.Router();
const Comment = require('../mongo/schemas/comment');
const User = require('../mongo/schemas/user');



commentRouter.get('/', async(req, res) => {
   const oneUser = await Comment.findOne().populate('author');
   res.json(oneUser);
})


commentRouter.get('/', async(req, res) => {
   const allComments = await Comment.find().populate('author');
   res.json(allComments);
  
})

commentRouter.post("/", async(req, res) => {
   //recogemos el body de la request
   const body = req.body;

   //creamos una nueva instancia del comment,
   const newComment = new Comment(body);

   //lo guardamos en mongo
   await newComment.save()

   const userId = body.author; //extrae el ID del author en el body y lo guarda en userId

   const user = await User.findById(userId); //la variable user guarda el ID del esquema Comment

   user.comment.push(newComment); //el usuario al crear un comment nuevo lo añade al array de objetos 'comment'

   await user.save (); // se guarda en el usuario

   //devolvemos respuesta del blog creado
   res.json({Message: "Your Comment was created Succesfully", newComment});
});

commentRouter.delete("/", async(req, res) => {
   const id = await Comment.findByIdAndDelete({ _id: id });
 
   console.log(`comment with id ${id} has been deleted`);
   
   res.send();
 
 })


 commentRouter.put("/", async(req, res) => {
   const id = await Comment.findByIdAndDUpdate({ _id: id });
   const data = req.body;
 
   const upDatedComment = {
      id: id,
      title: data.title,
      comment_body: data.comment_body,
   };
 
   res.json({message: "Your comment has been updated Succesfully", upDatedComment})
 })




module.exports = commentRouter;