const express = require("express");
const path = require("path");
const router = express.Router();

function _home(req, res){
    res.render("index");
}

router.get("/", _home);
module.exports = router;