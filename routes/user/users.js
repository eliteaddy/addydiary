/**
 * @author: Adesile Isaiah Ayomide
 * aka: MasterAddy
 * Portfolio: https://eliteaddy.github.io
 */

const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const ObjectId = mongoose.Types.ObjectId;
const { sessionChecker } = require("./../../config/confirmer");

//Import User Schema
const User = require("./../../model/User");

//Register Page
router.get("/register", sessionChecker, (req, res) => {
  if (req.isAuthenticated()) {
    var links = {
      login: {
        name: "Logout",
        link: "/user/logout"
      }
    };
  } else {
    var links = {
      login: {
        name: "Login",
        link: "/user/login"
      }
    };
  }
  res.render("register", {
    title: "Register",
    links: links
  });
});

//Register Handle
router.post("/register", (req, res) => {
  if (req.isAuthenticated()) {
    var links = {
      login: {
        name: "Logout",
        link: "/user/logout"
      }
    };
  } else {
    var links = {
      login: {
        name: "Login",
        link: "/user/login"
      }
    };
  }
  const title = "Register";
  const { names, email, password, confirm_password } = req.body;
  let errors = [];

  //Check required fields
  if (!names || !email || !password) {
    errors.push({ msg: "Please fill in the fields" });
  }

  //Check passwords match
  if (password !== confirm_password) {
    errors.push({ msg: "Passwords do not match" });
  }

  //Check password length
  if (password.length < 6) {
    errors.push({ msg: "Password should be at least 6 characters" });
  }

  //Validation
  if (errors.length > 0) {
    res.render("register", {
      title,
      links,
      errors,
      names,
      email,
      password,
      confirm_password
    });
  } else {
    // Validation Passed
    User.findOne({ email: email }).then(user => {
      if (user) {
        //user exists
        errors.push({ msg: "Email is already registered" });
        res.render("register", {
          title,
          links,
          errors,
          names,
          email,
          password,
          confirm_password
        });
      } else {
        const newUser = new User({
          names: names,
          email: email,
          password: password
        });

        //Hash Password
        bcrypt.genSalt(10, (err, salt) =>
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            //Set password to hashed
            newUser.password = hash;
            //console.log(newUser)
            //Save user
            newUser
              .save()
              .then(user => {
                req.flash(
                  "success_msg",
                  "You are now registered and can login"
                );
                res.redirect("/user/login");
              })
              .catch(err => console.log(err));
          })
        );
      }
    });
  }
});

//Login Page
router.get("/login", sessionChecker, (req, res) => {
  if (req.isAuthenticated()) {
    var links = {
      login: {
        name: "Logout",
        link: "/user/logout"
      }
    };
  } else {
    var links = {
      login: {
        name: "Login",
        link: "/user/login"
      }
    };
  }
  res.render("login", {
    title: "Login",
    links: links
  });
});

//Login Handle
router.post("/login", (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/user/login",
    failureFlash: true
  })(req, res, next);
});

//Logout Handle
router.get("/logout", (req, res) => {
  req.logout();
  req.flash("success_msg", "You are logged out successfully");
  res.redirect("/user/login");
});

module.exports = router;
