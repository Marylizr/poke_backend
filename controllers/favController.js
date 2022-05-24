const express = require('express');
const favRouter = express.Router();
const FavsWikis = require('../mongo/schemas/favs');


favRouter.get('/', async(req, res) => {
   const allfavs = await FavsWikis.find();
   res.json(allfavs);
})

favRouter.get('/:id', async(req, res) => {
  const id = req.params.id; 
  FavsWikis.findById(id, {}, {} , (error, favsWikis) => {

     if(error){
         res.status(500).json({error: error.message});
     }else if(!createPokeWiki){
         res.status(404).send();
     }else {
         res.json(favsWikis);
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

   const favPokeWiki = new FavsWikis(body);

   await favPokeWiki.save()

   console.log('Saving in PokeWiki favs');

   res.status(201).json(favPokeWiki);
});


favRouter.delete('/:id', (req, res) => {
   const id = req.params.id;
   FavsWikis.findByIdAndDelete(id, {}, (error, result) =>{
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