const express = require('express');
const PORT = process.env.PORT || 3000

var app = express();

app.set('view engine', 'ejs');
app.use('/assets', express.static('assets'));
app.use('/images', express.static('images'));
app.get('/', function(req,res){
    res.render("index");
});

app.listen(PORT,
  function(){
    console.log("Server listening on port " + PORT);
});