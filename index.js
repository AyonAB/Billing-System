// Imports
const express = require('express');
const PORT = process.env.PORT || 3000;

// Setting up express
var app = express();

// Template Engine
app.set('view engine', 'ejs');

// Middlewares for Static files
app.use('/assets', express.static('assets'));
app.use('/images', express.static('images'));

// Routes
app.get('/', function(req,res){
    res.render("page-login");
});

app.get('/dashboard', function(req,res){
    res.render("index");
});

// Port deploy & debug
app.listen(PORT,
  function(){
    console.log("Server listening on port " + PORT);
});