const express = require("express");
const app = express();
const port = 3000;

app.set('view engine', 'pug');

app.use(express.static('public'));


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



app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});












