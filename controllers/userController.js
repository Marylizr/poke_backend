const express = require('express');
const userRouter = express.Router();
const User = require('../mongo/schemas/user');



userRouter.get('/', async(req, res) => {
   const allUsers = await User.find().populate('blog');
   res.json(allUsers);
})

userRouter.get('/:id', async(req, res) => {
  const id = req.params.id; 
  User.findById(id, {}, {} , (error, user) => {

     if(error){
         res.status(500).json({error: error.message});
     }else if(!user){
         res.status(404).send();
     }else {
         res.json(user);
     }
 }); 
});

userRouter.post("/", async(req, res) => {

   const body = req.body;

   // const data = {
   //  firstName: body.firstName,
   //  lastName: body.lastName,
   //  email: body.email
   // }

   const newUser = new User(body);

   await newUser.save()

   console.log('Creating user');

   res.json({Message: "Your new User was created Succesfully", newUser});
});


userRouter.delete('/:id', async(req, res) => {
   const id = req.params.id;
   User.findByIdAndDelete(id, {}, (error, result) =>{
    if(error){
        res.status(500).json({error: error.message});
    }else if(!result){
        res.status(404);
    }else{
        res.status(204).send();
    }
    
})

})

 
 userRouter.patch ('/:id', async(req, res) => {
   const id = req.params.id;
   const data = req.body;
 
   const updatedUser = {
     id: id,
     email: data.email,
     name: data.name,
     description: data.description,
   };
 
   res.json({message: "Your user has been updated Succesfully", updatedUser})
 })

module.exports = userRouter;