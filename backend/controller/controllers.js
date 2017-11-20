var mongoose = require("mongoose");

// require passport packages

var passport = require("passport");
var LocalStrategy = require('passport-local').Strategy;
//mongdb and schema configs

var productSchema = require("./../model/product.js");
var orderSchema = require("./../model/order.js");
var UserSchema = require("./../model/user.js");
var secret = require("./secret.js");

mongoose.connect(secret.mongolabURL);

var Product = mongoose.model("Product", productSchema);
var Order = mongoose.model("Order", orderSchema);
var User = mongoose.model("User", UserSchema);

// passport strategy config

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//middelware for checking if User logged in or not, token from header is decoded and verified to see if it belongs to Admin

module.exports.authCheck = function(req, res, next) {
    passport.authenticate("local", function(err, user, info){
        if(err) {
            return res.render("login", {error: err});
        }
        if(!user) {
            return res.render("login", {error: "User not found."});
        }

        req.logIn(user, function(err){
            if(err) {
                return next(err);
            }            
            return res.redirect("/home");
        });
    })(req, res, next);
}

module.exports.redir = function(req, res) {

    res.redirect("/home");

}


module.exports.home = function(req, res) {
    console.log("home" + req.user);
    Product.find({}, function(err, prods){
        if(err) {
            console.log(err);
        } else {            
            res.render("heights", {products: prods});
        }
    });
       
}

module.exports.loginPage = function(req, res) {
    console.log("login" + req.user);
    if (req.user) {
        return res.redirect("/home");
    }

    res.render("login", {error: false});
}

module.exports.registerPage = function(req, res) {

    if(req.user) {
        return res.redirect("/home");
    }

    res.render("register", {error: false});
}

module.exports.loginUser = function(req, res) {

    if (err) {    
    return res.redirect("/login");
    }

    res.redirect("/home");

    
}

module.exports.registerUser = function(req, res) {

 
    User.register(new User({email: req.body.email, username: req.body.username}), req.body.password, function(err, user){
        if (err) {

            var errObject = {
                success: false,
                message: "Registration failed: User or email already exists."
            };

            res.render("register", {error: errObject});            
        }

        passport.authenticate("local")(req, res, function(){
            res.redirect("/home");
        }); 
    });
}
