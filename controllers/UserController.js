const express = require("express");
const router = express.Router();
const User = require("../models/User");
const crypto = require('crypto');
const mailsender = require("./MailSender")

function _user(req, res){
    if(req.session.username) res.render("users/user");
    else(res.send("oopppss!"))
}

function _signup(req, res){
    res.render("users/signup", {
        user: "",
        error: ""
    });
}

function _postSignup(req, res){
    let user = new User({
        username: req.body.username,
        name: req.body.name,
        lastname: req.body.lastname,
        password: crypt(req.body.password)
    })

    user.save((err, result) => {
        if(err) {
            console.log(err);
            res.render("users/signup", {
                user: req.body,
                error: err.code
            });
        }
        else {
            req.session.username = result.username;
            req.session.name = result.name;
            req.session.lastname = result.lastname;
            res.redirect("/");
        }
    })
}

function _sign(req, res){
    res.render("users/sign", {
        error: null
    });
}

function _postSign(req, res){
    User.findOne({username: req.body.username, password: crypt(req.body.password)})
    .then(result => {
        if(result == null){
            res.render("users/sign", {
                error: "not found"
            });
        }
        else{
            req.session.username = result.username;
            req.session.name = result.name;
            req.session.lastname = result.lastname;
            res.redirect("/");
        }
    })
    .catch(err => { console.log(err)});
}

function _signout(req, res){
    req.session.destroy();
    res.redirect("/");
}

function _contact(req, res){
    res.render("users/contact");
}

function _postMail(req, res){
    mailsender.sendmail(req, res);
}

router.get("/", _user);
router.get("/sign", _sign);
router.post("/sign", _postSign);
router.get("/signout", _signout);
router.get("/signup", _signup);
router.post("/signup", _postSignup);
router.get("/contact", _contact);
router.post("/sendmail", _postMail);

module.exports = router;


function crypt(data){
    hash = crypto.getHashes();
    const hashPwd = crypto.createHash('sha1').update(data).digest('hex');
    return hashPwd;
}
