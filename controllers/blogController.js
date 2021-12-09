const express = require('express');
const blogRouter = express.Router();
const Blog = require('../mongo/schemas/blog');
const User = require('../mongo/schemas/user');




blogRouter.get('/', async(req, res) => {
   const allBlogs = await Blog.find().populate('author');
   res.json(allBlogs);
  
})


blogRouter.post("/", async(req, res) => {
   
   const body = req.body; //recogemos el body de la request

   const newBlog = new Blog(body); //creamos una nueva instancia de blog

   await newBlog.save()  //lo guardamos en mongo

   const userId = body.author; //extrae el ID del author en el body y lo guarda en userId

   const user = await User.findById(userId); //la variable user guarda el ID del esquema User

   user.blog.push(newBlog); //el usuario al crear un blog nuevo lo añade al array de objetos 'blog'

   await user.save ();// se guarda en el usuario

   //devolvemos respuesta del blog creado
   res.json({Message: "Your new Blog was created Succesfully", newBlog});
});

blogRouter.delete("/", async(req, res) => {
   const id = await Blog.findByIdAndDelete({ _id: id });
 
   console.log(`user with id ${id} has been deleted`);
   
   res.send();
 
 })


 blogRouter.put("/", async(req, res) => {
   const id = await Blog.findByIdAndDUpdate({ _id: id });
 
   const upDatedBlog = {
      title: body.title,
      body: body.body,
      author: body.author,
   };
 
   res.json({message: "Your user has been updated Succesfully", upDatedBlog})
 })

 blogRouter.patch("/", async(req, res) => {
   const id = await Comment.findByIdAndDUpdate({ _id: id });
 
   const patchedBlog = {
      title: body.title,
      body: body.body,
      author: body.author,
   };
 
   res.json({message: "Your user has been updated Succesfully", patchedBlog})
 })


module.exports = blogRouter;