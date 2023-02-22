const express = require("express");
const app = express();
var expressLayouts = require('express-ejs-layouts');
const homeController = require("./controllers/HomeController");
const userController = require("./controllers/UserController");

// set the view engine to ejs
app.set('view engine', 'ejs');

app.use(expressLayouts);

app.use("/public", express.static(__dirname + "/public"));

app.use(function(req, res, next){
    req.body = "Erdoğan Bülbül";
    next();
})

app.use("/", homeController);
app.use("/user", userController);

app.listen(process.env.PORT || 80, () => {
    console.log(`SelfCheck çalışıyor.`);
});
