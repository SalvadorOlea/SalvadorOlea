const express = require('express');
const app = express();

app.set('port', process.env.PORT || 3000);
app.get('/', (req, res) =>{
    res.send('Hola mundo');
});
app.listen(app.get('port'), ()=>{
    console.log(`Server listening on ${app.get('port')}`);
});