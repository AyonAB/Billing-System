const express = require('express');
const PORT = process.env.PORT || 3000

var app = express();

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', function(req,res){
    res.render("login");
});

app.listen(PORT,
  function(){
    console.log("Server listening on port " + PORT);
});