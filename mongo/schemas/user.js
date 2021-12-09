
const { Schema, model } = require('mongoose');


const userSchema = new Schema({
   name: String,
   lastName: String,
   email: String,
   bio: { type: String, match:/[a-z]/ },
   blog: [{
      type: Schema.Types.ObjectId,
      ref: 'blog',
    }],
   comment: [{ 
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
   }],
});

const User = model ('user', userSchema);

module.exports = User;