const { Schema, model } = require('mongoose');


const FavsWikisSchema = new Schema({ 
   name: String,
   description: String,
   url:String,
   thumbnailUrl:String,
   largeImg:String,
});

const FavsWikis = model ('favsWikis', FavsWikisSchema);

module.exports = FavsWikis;