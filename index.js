// Imports
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cookie = require('cookie-parser');
const session = require('express-session');
const passport = require('./config/passport');
const PORT = process.env.PORT || 5000;

// Setting up express
var app = express();

//Routes
var routes = require('./routes/route');

// Database Connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://AyonAB:Ayan1996@ds241489.mlab.com:41489/billing-system');

// Middlewares for Static files
//app.use('/assets', express.static('assets'));
//app.use('/images', express.static('images'));
app.use(express.static(__dirname + '/assets'));
app.use(express.static(__dirname + '/images'));

// Template Engine
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');


//urlencoded
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

//Cookie
app.use(cookie());

//Session
app.use(session({
    secret: 'Site visit',
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false, maxAge : 6000000 }
}));
passport(app);

// call the routes
app.use(routes);

// Routes
app.get('/', function(req,res){
    res.render("index");
});

// call middleware after all routes
app.use(function (request, response) {
    response.send("Oops Nothing found");
 });
 // error handler middleware
 app.use(function (err,request, response, next) {
     response.send("Error Occured : " + err);
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