const express = require("express");
const app = express();
const path = require('path');
app.set('view engine', 'ejs');
const ejsLayout = require('express-ejs-layouts');
const bodyParser = require('body-parser');

app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(ejsLayout);
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get("/", function(req, res){
	res.send("Merhaba Dünya");
});

const PORT = 80;
app.listen(PORT, function(){
    console.log("Api listening on port: " + PORT)
});