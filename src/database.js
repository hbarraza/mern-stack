const mongoose = require('mongoose');

const URI = 'mongodb://localhost/mern-items';
const opts = { autoIndex: false, useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify:false };

mongoose.connect(URI, opts)
    .then( db => console.log('base de datos conectada'))
    .catch(err => console.log(err))

module.exports = mongoose;