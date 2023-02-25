const express = require("express");
const app = express();
require("dotenv").config();
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const session = require('express-session')

const homeController = require("./controllers/HomeController");
const userController = require("./controllers/UserController");

mongoose.set("strictQuery", false);
mongoose.connect(process.env.DBSTR, (err) => {
    if(!err) console.log("Veritabanı bağlantısı yapıldı.");
    else console.log(err);
});

// set the view engine to ejs
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.use("/public", express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
    secret: process.env.SECRET,
    saveUninitialized: true,
    resave: false,
    cookie: { }
}));

app.use(function(req, res, next) {
    res.locals.user = {
        id: req.session.id,
        username: req.session.username,
        name: req.session.name,
        lastname: req.session.lastname,
    }
    next();
});

app.use("/", homeController);
app.use("/users", userController);

app.listen(process.env.PORT, () => {
    console.log(`SelfCheck, ${process.env.PORT} numapalı portta çalışıyor.`);
});
