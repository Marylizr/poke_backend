const express = require('express');
const userController = express.Router();
const User = require('../mongo/schemas/user');




userController.get('/', async(req, res) => {
   const allUsers = await User.find();
   res.json(allUsers);
})


userController.post("/", async(req, res) => {
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

userController.delete("/", async(req, res) => {
   const deleteUser = await User.findByIdAndDelete(req.params.id);
 
   console.log(`user with id ${id} has been deleted`);
   
   res.json(deleteUser);
 
 })


module.exports = userController;