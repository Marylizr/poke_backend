const { Schema, model } = require('mongoose');


const blogSchema = new Schema({
   title: String,
   author: String,
   body: String,
});

const Blog = model ('blog', blogSchema);

module.exports = Blog;