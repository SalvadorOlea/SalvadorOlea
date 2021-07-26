const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Task = require('./task');

router.get('/', async (req, res) =>{ 
    res.render('index');
});

router.get('/links', async (req, res) => {
    const tasks = await Task.find();
    res.render('link', { tasks });
});
router.get('/:shortUrl', async (req, res)=>{
    const shorturl = await Task.findOne({short: req.params.shortUrl});
    shorturl.clicks++;
    shorturl.save();
    console.log(shorturl);
    res.render('index', { url: shorturl.full });
    //res.redirect(shorturl.full);
});
router.post('/add', async (req, res) =>{
    const _req = await Task.create({full: req.body.long});
    console.log(_req);
    res.redirect('/links');
});
module.exports = router;