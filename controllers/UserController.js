const express = require("express");
const path = require("path");
const router = express.Router();

function _user(req, res){
    //res.sendFile(path.join(__dirname, "..", "user.html"));
    res.render("user");
}

function _signup(req, res){
    //res.sendFile(path.join(__dirname, "..", "signup.html"));
    res.render("signup");
}

function _signin(req, res){
    //res.sendFile(path.join(__dirname, "..", "signin.html"));
    res.render("signin");
}

function _signout(req, res){
    //res.sendFile(path.join(__dirname, "..", "signout.html"));
    res.render("signout");
}

router.get("/", _user);
router.get("/signin", _signin);
router.get("/signout", _signout);
router.get("/signup", _signup);

module.exports = router;
