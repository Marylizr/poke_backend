
const { Schema, model } = require('mongoose');


const userSchema = new Schema({
   name: String,
   lastName: String,
   email: String,
});

const User = model ('user', userSchema);

module.exports = User;