const express = require("express"); // Gets Express
const path = require("path"); // Sorts out filepath names
const exphbs = require("express-handlebars"); // Installs Handlebars for JS templating
const app = express(); // Invokes Express
const mongoose = require("mongoose"); // Installs mongoose
const uuid = require("uuid"); // creates unique ids
const router = express.Router(); // allows us to set up routes
// const Schema = mongoose.Schema;
const Member = require('../models/members');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MONGOOSE

mongoose
  .connect(
    "mongodb+srv://chrisjcastle:dougal22@cluster0.l8tnt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then((x) =>
    console.log(`Connected to Mongo"`)
    // console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  )
  .catch((err) => console.error("Error connecting to mongo", err));

// MOONGOOSE MODEL - MOVED TO MODELS FOLDER
// USER CREATION - now doing through form
// SAVE TO DATABASE - use as function - moved to models
// GET MEMBERS - use as function - moved to models

// API ROUTES - uses routes from routes folder

app.use("/api/members", require("../routes/api/members.js"));

// CLIENT ROUTES

app.get("/", (req, res) => {
  Member.find().lean().exec(function (err, members) {
    res.render("index", { title: "Member App", members });
  });
});

// Handlebars Middleware.
app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

// PORT SETUP
const PORT = process.env.PORT || 5006;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
