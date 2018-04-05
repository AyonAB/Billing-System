const express = require('express');
const PORT = process.env.PORT || 3000

var app = express();

app.set('view engine', 'ejs');
app.get('/', function(req,res){
    res.render("indextest");
});

app.listen(PORT,
  function(){
    console.log("Server listening on port " + PORT);
});