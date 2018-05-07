// Imports
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cookie = require('cookie-parser');
const session = require('express-session');
const passport = require('./config/passport');
const PORT = process.env.PORT || 3000;

// Setting up express
var app = express();

//Routes
var routes = require('./routes/route');

// Database Connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://AyonAB:Ayan1996@ds241489.mlab.com:41489/billing-system');

// Middlewares for Static files
app.use('/assets', express.static('assets'));
app.use('/images', express.static('images'));
//app.use(express.static(__dirname + '/assets'));
//app.use(express.static(__dirname + '/images'));

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
    cookie: { secure: false, maxAge : 900000 }
}));
passport(app);

// call the routes
app.use(routes);

// Port deploy & debug
app.listen(PORT,
  function(){
    console.log("Server listening on port " + PORT);
});