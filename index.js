// Imports
const express = require('express');
var bodyParser = require('body-parser');
const mongoose = require('mongoose');
var passport = require('passport');
const logger = require('morgan');
var config = require('./config/main');
const PORT = process.env.PORT || 5000;

// Setting up express
var app = express();

// Setting up basic middleware for all Express requests
app.use(logger('dev')); // Log requests to API using morgan

// Enable CORS from client-side
app.use(function(req, res, next) {  
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

// Database Connection
mongoose.connect(config.database);

// Template Engine
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');


//urlencoded
var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })

// Middlewares for Static files
app.use('/assets', express.static('assets'));
app.use('/images', express.static('images'));

// Routes
app.get('/', function(req,res){
    res.render("index");
});

app.post('/', urlencodedParser, function(req, res) {
    email = req.body.email;
    pass = req.body.password;
    res.render('login', {
      email: email, 
      password: pass
    });
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