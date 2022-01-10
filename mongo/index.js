const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/pokewiki');


const mongo = mongoose.connection;
mongo.on('error', (error) => console.error(error));
mongo.once('open', () => {
    console.log('connected to database');
});

module.exports = mongo;