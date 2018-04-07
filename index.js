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
    res.render("dashboard");
});

app.get('/addbill', function(req,res){
    res.render("addbill");
});

app.get('/addemp', function(req,res){
    res.render("addemp");
});

app.get('/addproduct', function(req,res){
    res.render("addproduct");
});

app.get('/manage-bill', function(req,res){
    res.render("manage-bill");
});

app.get('/manage-emp', function(req,res){
    res.render("manage-emp");
});

app.get('/manage-product', function(req,res){
    res.render("manage-product");
});

app.get('/pages-forget', function(req,res){
    res.render("pages-forget");
});
// Port deploy & debug
app.listen(PORT,
  function(){
    console.log("Server listening on port " + PORT);
});