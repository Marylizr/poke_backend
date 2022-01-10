const { Schema, model } = require('mongoose');


const createPokeWikiSchema = new Schema({ 
   name: String,
   description: String,
   url:String,
   thumbnailUrl:String,
   largeImg:String,
});

const CreatePokeWiki = model ('createPokeWiki', createPokeWikiSchema);

module.exports = CreatePokeWiki;