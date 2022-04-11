const express = require("express");
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const passport = require("passport");
const LocalStrategy = require("passport-local");
const passportLocalMongoose = require("passport-local-mongoose");
const cookieParser = require('cookie-parser')
const app = express();
const port = 3000;

app.set('view engine', 'pug');

app.use(express.static('public'));

// //Connecting Mongodb database
dotenv.config()
mongoose.connect(process.env.MONGO_URI,{useNewUrlParser: true, useUnifiedTopology: true})
.then(console.log('Mongodb Database connected'))
.catch((err) => console.log(err));


//Listening to port 3000
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

//Routes
const routes = require('./routes/routes')

app.use(express.json())
app.use('/signup', routes)


//=======================
//      R O U T E S
//=======================


//Rendering localhost:3000/
app.get("/", (req, res) => {
  res.render("index", {});
});
  
//Rendering Index.pug
app.get("/index", (req, res) => {
  res.render("index", {});
});
  
//Rendering about.pug
app.get("/about", (req, res) => {
  res.render("about", {});
});
  
//Rendering contact.pug
app.get("/contact", (req, res) => {
  res.render("contact", {});
});
  
//Rendering properties.pug
app.get("/properties", (req, res) => {
  res.render("properties", {});
});
  
//Rendering signup.pug
app.get("/signup", (req, res) => {
  res.render("signup", {});
});

//Rendering signup.pug
app.get("/signup", (req, res) => {
  res.render("register", {});
});

//cookie-parser
app.use(cookieParser());