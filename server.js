const express = require("express");
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const passport = require("passport");
const LocalStrategy = require("passport-local");
const passportLocalMongoose = require("passport-local-mongoose");
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