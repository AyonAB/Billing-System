const express = require('express');
const PORT = process.env.PORT || 5000

var app = express();

app.set('view engine', 'ejs');
app.get('/', function(req,res){
    res.sendFile(__dirname + "/page-login.html");
});

app.listen(PORT,
  function(){
    console.log("Server listening on port " + PORT);
});