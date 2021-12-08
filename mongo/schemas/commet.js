const { Schema, model } = require('mongoose');


const commentSchema = new Schema({
   title: String,
   author: String,
   body: String,
});

const Comment = model ('blog', commentSchema);

module.exports = Comment;