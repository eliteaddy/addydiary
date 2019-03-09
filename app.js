/**
 * @author: Adesile Isaiah Ayomide
 * aka: MasterAddy
 * Portfolio: https://eliteaddy.github.io
 */


const express = require("express");
const bodyParser = require("body-parser");
const expressLayouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
const flash = require("connect-flash");
const session = require("express-session");
const passport = require("passport");
const path = require("path");

const userRoutes = require("./routes/user/users");
const noteRoutes = require("./routes/note/notes");

const app = express();

//Passport config
require("./config/passport")(passport);

//DB
const db = require("./config/key").MongoURI;

//Connect to mongo
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("MongoDb is Connected..."))
  .catch(err => console.log(err));

//View Engine Set
app.use(expressLayouts);
app.set("view engine", "ejs");
//app.set("views", path.join(__dirname, "views");

//BodyParser MiddleWare
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Express Session
app.use(
  session({
    key: "user_id",
    secret: "secret",
    resave: true,
    saveUninitialized: false,
    cookie: {
      expires: 500000000
    }
  })
);

//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

//Connect Flash
app.use(flash());

//Global Vars
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});

//Static Path
app.use(express.static(path.join(__dirname, "public")));

// Handle Routes
app.use("/", noteRoutes);
app.use("/user", userRoutes);

const PORT = process.env.PORT || 9000;
app.listen(PORT, () => console.log("Server Running On Port " + PORT));
