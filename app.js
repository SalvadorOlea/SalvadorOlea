const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const morgan = require('morgan');
const ShortUrl = require('./task')
const app = express();

mongoose.connect('mongodb+srv://salvadoro:Sabanillas@cluster0.ir9ne.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
    useNewUrlParser: true, useUnifiedTopology: true
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: false}));
app.set('port', process.env.PORT || 3000);

/* Pages */
app.get('/', (req, res) =>{
    res.render('index');
});

app.get('/links', async (req, res) =>{
    const shortUrls = await ShortUrl.find()
    res.render('links', { shortUrls: shortUrls })
});

app.post('/add', async (req, res) =>{
    await ShortUrl.create({description: req.body.description, full: req.body.fullUrl});
    console.log(req.body);
    res.redirect('/links');
});

app.listen(app.get('port'), ()=>{
    console.log(`Server listening on ${app.get('port')}`);
});

module.exports = app;