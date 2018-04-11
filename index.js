// Imports
const express = require('express');
var bodyParser = require('body-parser');
const mongoose = require('mongoose');
var passport = require('passport');
var User = require('./app/models/User');
const PORT = process.env.PORT || 3000;

// Setting up express
var app = express();

// Database Connection
mongoose.connect('mongodb://AyonAB:Ayan1996@ds241489.mlab.com:41489/billing-system');

// Template Engine
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

//Passport
passport.use(User.localStrategy);
passport.serializeUser(User.serializeUser);
passport.deserializeUser(User.deserializeUser);

// Default session handling. Won't explain it as there are a lot of resources out there
app.use(express.session({
    secret: "mylittlesecret",
    cookie: {maxAge: new Date(Date.now() + 3600000)}, // 1 hour
    maxAge: new Date(Date.now() + 3600000), // 1 hour
    store: new RedisStore(config.database.redis), // You can not use Redis 
}));

// The important part. Must go AFTER the express session is initialized
app.use(passport.initialize());
app.use(passport.session());

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