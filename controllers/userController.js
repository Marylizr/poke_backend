const express = require('express');
const userRouter = express.Router();
const User = require('../mongo/schemas/user');


userRouter.get('/', async(req, res) => {
   const oneUser = await User.findOne().populate('blog');
   res.json(oneUser);
})

userRouter.get('/', async(req, res) => {
   const allUsers = await User.find().populate('blog');
   res.json(allUsers);
})


userRouter.post("/", async(req, res) => {
   //recogemos el body de la request
   const body = req.body;

   //creamos una nueva instancia de user,
   const newUser = new User(body);

   //lo guardamos en mongo
   await newUser.save()

   console.log('Creating user');

   //devolvemos respuesta
   res.json({Message: "Your new User was created Succesfully", newUser});
});


userRouter.delete("/", async(req, res) => {
   const id = await User.findByIdAndDelete({ _id: id });
 
   console.log(`user with id ${id} has been deleted`);
   
   res.send();
 
 })


 userRouter.put ("/", async(req, res) => {
   const id = req.params.id;
   const data = req.body;
 
   const newUser = {
     id: id,
     email: data.email,
     name: data.name,
     bio: data.bio,
   };
 
   res.json({message: "Your user has been updated Succesfully", newUser})
 })
 
 userRouter.patch ("/", async(req, res) => {
   const id = req.params.id;
   const data = req.body;
 
   const newUser = {
     id: id,
     email: data.email,
     name: data.name,
     description: data.description,
   };
 
   res.json({message: "Your user has been updated Succesfully", newUser})
 })

module.exports = userRouter;