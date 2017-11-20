var express = require("express");
var router = express.Router();

var mainCtrl = require("./../controller/controllers");
var passport = require("passport");

router.get("/", mainCtrl.redir);
router.get("/home", mainCtrl.home);

router.get("/home/login", mainCtrl.loginPage);
router.get("/home/register", mainCtrl.registerPage);

router.post("/home/register", mainCtrl.registerUser);
router.post("/home/login", mainCtrl.authCheck, mainCtrl.loginUser);

module.exports = router;