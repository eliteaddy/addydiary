/**
 * @author: Adesile Isaiah Ayomide
 * aka: MasterAddy
 * Portfolio: https://eliteaddy.github.io
 */

const express = require("express");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const router = express.Router();
const { ensureAuthenticated } = require("./../../config/confirmer");

//Import Note Schema
const Note = require("./../../model/Notes");

//Import User Schema
const User = require("./../../model/User");

//Load Home Page
router.get("/", ensureAuthenticated, (req, res) => {
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
  //find the one with tag general
  Note.find({ type: "public" })
    .sort({ date: -1 })
    .exec((err, notes) => {
      if (err) throw err;
      res.render("index", {
        title: "Home",
        user: {
          id: req.user._id,
          name: req.user.names,
          email: req.user.email
        },
        data: notes,
        links: links
      });
      //console.log(links)
    });
});

//DashBoard Loading
router.get("/dashboard", ensureAuthenticated, (req, res) => {
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
  //display all contents
  Note.find({ user_email: req.user.email })
    .sort({ date: -1 })
    .exec((err, notes) => {
      if (err) throw err;
      res.render("dashboard", {
        title: "Dashboard",
        data: notes,
        user: {
          id: req.user._id,
          name: req.user.names,
          email: req.user.email
        },
        links: links
      });
    });
  //console.log(links.login.name)
});

//Load A page with single Note
router.get("/profile/:id", ensureAuthenticated, (req, res) => {
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
  //console.log(req.params.url);
  User.findOne({ _id: ObjectId(req.params.id) }).exec((err, user) => {
    if (err) throw err;
    res.render("profile", {
      title: "Profile Page",
      user: user,
      links: links
    });
    //console.log(user);
  });
});

//Add Note Page
router.get("/addnote", ensureAuthenticated, (req, res) => {
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
  res.render("add-note", {
    title: "Add Note",
    user: {
      id: req.user._id,
      name: req.user.names,
      email: req.user.email
    },
    links: links
  });
});

//Submit the note to database
router.post("/addnote", (req, res) => {
  const submit = new Note({
    title: req.body.title,
    content: req.body.contents,
    type: req.body.type,
    user_email: req.body.user_email,
    user_name: req.body.user_name,
    url: req.body.url
  });

  //Save Note
  submit
    .save()
    .then(note => {
      //req.flash('success_msg', 'You are now registered and can login');
      res.redirect("/dashboard");
    })
    .catch(err => console.log(err));
  //console.log(submit);
});

//Delete Note from database
router.post("/dashboard/deletenote/:id", (req, res) => {
  //console.log(req.params.id);
  Note.deleteOne({ _id: ObjectId(req.params.id) }, (err, result) => {
    if (err) {
      console.log(err);
    }
    res.redirect("/dashboard");
  });
});

module.exports = router;