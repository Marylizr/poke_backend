const express = require('express');
const blogController = express.Router();
const Blog = require('../mongo/schemas/blog');




blogController.get('/', async(req, res) => {
   const allBlogs = await Blog.find();
   res.json(allBlogs);
  
})


blogController.post("/", async(req, res) => {
   //recogemos el body de la request
   const body = req.body;

   //creamos una nueva instancia de blog,
   const newBlog = new Blog(body);

   //lo guardamos en mongo
   await newBlog.save()

   //devolvemos respuesta
   res.json({Message: "Your new Blog was created Succesfully", newBlog});
});


module.exports = blogController;