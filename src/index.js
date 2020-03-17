const express = require('express');
const morgan = require('morgan');
const path = require('path');
const app = express();

const { mongoose } = require('./database');

//Settings
app.set('port', process.env.PORT || 3000);

//Mid
app.use(morgan('dev'));     //detalla req 
app.use(express.json());    //acepta json

//Rutas
app.use('/api/items/', require('./routes/items.routes'));

//Statics
app.use(express.static(path.join(__dirname, 'public')));

app.listen(app.get('port'), () => {
    console.log(`corriendo en puerto ${app.get('port')}`);
});