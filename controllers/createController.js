const express = require('express');
const createPokeWikiRouter = express.Router();
const CreatePokeWiki = require('../mongo/schemas/create');



createPokeWikiRouter.get('/', async(req, res) => {
   const allcreated = await CreatePokeWiki.find();
   res.json(allcreated);
})

createPokeWikiRouter.get('/:id', async(req, res) => {
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

createPokeWikiRouter.post("/", async(req, res) => {

    const {name, title, description, url, thumbnailUrl, largeImg } = req.body;
    const data = {
     name,
     title,
     description,
     url,
     thumbnailUrl,
     largeImg,
    }
    
   const newPokeWiki = new CreatePokeWiki(body);

   await newPokeWiki.save()

   console.log('Creating PokeWiki');

   res.json({Message: "Your new PokeWiki was created Succesfully", newPokeWiki});
});


createPokeWikiRouter.delete('/:id', (req, res) => {
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

 
createPokeWikiRouter.patch ('/:id', async(req, res) => {
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

module.exports = createPokeWikiRouter;