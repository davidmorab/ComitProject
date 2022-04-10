const User = require('../models/users')
const express = require('express')
const app = express();


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


//router
const router = require('express').Router();

const {register, login, deleteUser, updateUser} = require('../controllers/user')

router.post('/register', register);
router.post('/login', login);
router.patch('/update/:id', updateUser);
router.delete('/delete/:id', deleteUser);

module.exports = router;