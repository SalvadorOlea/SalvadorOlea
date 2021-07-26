const express = require('express');
const path = require('path');
const morgan = require('morgan');
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb://localhost/crud-mongo')
    .then(db => { console.log('Se conectó a la base de datos'); })
    .catch(er => {console.log(er)})

const _dir = require('./helpers/directory');

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'template'));
app.set('view engine', 'ejs');

app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use('/', _dir);

app.listen(app.get('port'), ()=>{
    console.log(`Servidor en escucha en puerto ${app.get('port')}`);
});