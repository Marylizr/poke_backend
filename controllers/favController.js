const express = require('express');
const favRouter = express.Router();
const CreatePokeWiki = require('../mongo/schemas/create');


favRouter.get('/', async(req, res) => {
   const allcreated = await CreatePokeWiki.find();
   res.json(allcreated);
})

favRouter.get('/:id', async(req, res) => {
  const id = req.params.id; 
  CreatePokeWiki.findById(id, {}, {} , (error, createPokeWiki) => {

     if(error){
         res.status(500).json({error: error.message});
     }else if(!createPokeWiki){
         res.status(404).send();
     }else {
         res.json(createPokeWiki);
     }
 }); 
});

favRouter.post("/", async(req, res) => {

   const body = req.body;
   const data = {
    name: body.name,
    title: body.title,
    description: body.description,
    url:body.url,
    thumbnailUrl:body.thumbnail,
    largeImg:body.largeImg,
   }

   const newPokeWiki = new CreatePokeWiki(body);

   await newPokeWiki.save()

   console.log('Creating PokeWiki');

   res.json({Message: "Your new PokeWiki was created Succesfully", newPokeWiki});
});


favRouter.delete('/:id', (req, res) => {
   const id = req.params.id;
   CreatePokeWiki.findByIdAndDelete(id, {}, (error, result) =>{
      if(error){
         res.status(500).json({error: error.message});
      }else if(!result){
         res.status(404);
      }else{
         res.status(204).send();
      }
   })
})

 
favRouter.patch ('/:id', async(req, res) => {
   const id = req.params.id;
   const data = req.body;
 
   const updatedPokeWiki = {
     id: id,
     email: data.email,
     name: data.name,
     description: data.description,
   };
 
   res.json({message: "Your PokeWiki has been updated Succesfully", updatedPokeWiki})
 })

module.exports = favRouter;