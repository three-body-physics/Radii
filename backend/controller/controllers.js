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

module.exports.authenticate = function(req, res, next) {

    passport.authenticate("local", {failureFlash: true }, function(err, user, info){
        if(err) {
            console.log("one");
            return res.render("login", {error: err, loggedIn: false});
            
        }
        if(!user) {
            console.log("two");
            return res.render("login", {error: "Incorrect username/password.", loggedIn: false});
        }

        req.logIn(user, function(err){
            if(err) {
                console.log("three");
                return next(err);
            }            
            return next();
        });
    })(req, res, next);
}

module.exports.checkAuth = function(req, res, next) {

    if (req.isAuthenticated()) {
        return next();
    }

    res.redirect("/home/login");
}

module.exports.redir = function(req, res) {

    res.redirect("/home");

}


module.exports.home = function(req, res) {
    
 
    Product.find({}, function(err, prods){
        if(err) {
            console.log(err);
        } else {           

            res.render("heights", {products: prods, loggedIn: req.user});
        }
    });
       
}

module.exports.loginPage = function(req, res) {
    
    if (req.isAuthenticated()) {
        return res.redirect("/home");
    }

    res.render("login", {error: false, loggedIn: false});
}

module.exports.registerPage = function(req, res) {

    if(req.isAuthenticated()) {
        return res.redirect("/home");
    }

    res.render("register", {error: false, loggedIn: false});
}

module.exports.loginUser = function(req, res) {

    res.redirect("/home");
    
}

module.exports.registerUser = function(req, res) {

    if(req.body.username.length < 8 || req.body.password.length <8) {
        var error = {message: "Username and password have to be at least 8 characters in length."}
        return res.render("register", {error: error, loggedIn: false});
    }

 
    User.register(new User({email: req.body.email, username: req.body.username}), req.body.password, function(err, user){
        if (err) {

            var errObject = {
                success: false,
                message: "Registration failed: User or email already exists."
            };

            return res.render("register", {error: errObject, loggedIn: false});            
        }

        passport.authenticate("local")(req, res, function(){
            res.redirect("/home");
        }); 
    });
}

module.exports.logoutUser = function(req, res) {
    req.logOut();
    res.redirect("/home");
}

module.exports.userProfile = function(req, res) {

    res.send(req.user)
}

module.exports.productPage = function(req, res) {

    var prodID = req.params.productid;

    Product.findById(prodID, function(err, product){

        if(err) {
            return res.redirect("/home");
        }

        console.log(product);

        res.render("product", {product: product, loggedIn: req.user})
    });
    
}